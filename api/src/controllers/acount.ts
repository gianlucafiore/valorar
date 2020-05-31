import express, {Request,Response, NextFunction } from 'express'; 
import jwt from 'jwt-simple';
import bcrypt from 'bcryptjs';
import moment from 'moment';
import config from '../config';
import db from './db';
import fs from 'fs'; 
import multer from 'multer';
import path from 'path';  
import {imageSize} from 'image-size';
import gm0 from 'gm';
import sendMail from './emails';
import validator from 'validator'
const gm = gm0.subClass({imageMagick: true});

const upload = multer()

const app = express.Router();

const saltRounds = 10;

class IsAuth {
    simple(req:Request,res:Response,next:NextFunction)
    {
        if(!req.headers.authorization)
        {
            return res.status(403).send({message:"No estás autorizado"});
        }    
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.decode(token, config.apiKey);

        if(payload.exp <= moment().unix())
        {
            return res.status(401).send({message:"El token ha expirado"});
        } 
        next();
    }
    admin(req:Request,res:Response,next:NextFunction)
    {
        if(!req.headers.authorization)
        {
            return res.status(403).send({message:"No estás autorizado"});
        }    
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.decode(token, config.apiKey);

        if(payload.exp <= moment().unix())
        {
            return res.status(401).send({message:"El token ha expirado"});
        }
        if(payload.role != 'admin')
        {
            return res.status(403).send({message:"Se requiere rol administrador"});
        } 
        next();
    }
    moderador(req:Request,res:Response,next:NextFunction)
    {
        if(!req.headers.authorization)
        {
            return res.status(403).send({message:"No estás autorizado"});
        }    
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.decode(token, config.apiKey);

        if(payload.exp <= moment().unix())
        {
            return res.status(401).send({message:"El token ha expirado"});
        }
        if(payload.role != 'moderador' || payload.role != 'admin')
        {
            return res.status(403).send({message:"Se requiere rol mínimo moderador"});
        }  
        next();
    }
    premium(req:Request,res:Response,next:NextFunction)
    {
        if(!req.headers.authorization)
        {
            return res.status(403).send({message:"No estás autorizado"});
        }    
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt.decode(token, config.apiKey);

        if(payload.exp <= moment().unix())
        {
            return res.status(401).send({message:"El token ha expirado"});
        }
        if(payload.role != 'premium' && payload.role != 'moderador' && payload.role != 'admin')
        {
            return res.status(403).send({message:"Se requiere rol mínimo moderador"});
        }  
        next();
    }
}
export let isAuth = new IsAuth();

interface acountUser
{
    id : number
    razonSocial:string
    slogan:string
    titulo:string
    telefono:string
    email:string
    sitioWeb:string
    descripcion:string
    reputacion:number
    visitas:number
    imagenPortada:string
    imagenPerfil:string
    estrellas:number
    contrasenia:string
    fechaCreacion:Date
    fechaAlta:Date
    fechaBaja:Date
    rol:number
    role:string
}  

 
app.get('/', isAuth.simple,(req:Request,res:Response)=> { 
    const token = req.headers.authorization;
    let tokenString:string;
    if(token){
        tokenString= token.split(' ')[1];
        const payload = jwt.decode(tokenString, config.apiKey);
        return res.status(200).send({
            id:payload.sub,
            nombre:payload.name,
            rol:payload.rol
        });
    }
    else res.status(500).send("Not Authenticated");
})
app.get('/profile/:id',async (req:Request,res:Response)=> {  
    const token = req.headers.authorization;
    let tokenString:string;
    let user = await db.query(`SELECT * FROM acountUser WHERE id = ${Number(req.params.id)}`);
    interface AcountSeguidor{acountSeguidor:number}
    const vinculos:AcountSeguidor[] = await db.query(`
                                    SELECT acountSeguidor
                                    FROM carteraProveedores
                                    WHERE acountSeguido = ${db.escape(req.params.id)}`)
    user[0].vinculos = vinculos.length
    const insertVisita = await db.query(`
        INSERT INTO visitasPerfil(ip, perfil)
        SELECT ${db.escape(req.ip)},${db.escape(req.params.id)}
        FROM dual
        WHERE NOT EXISTS (
            SELECT * 
            FROM visitasPerfil 
            WHERE ip = ${db.escape(req.ip)}
                && perfil = ${db.escape(req.params.id)}    
                && (fecha + INTERVAL 1 DAY) > NOW() 
        )
    `)
    interface v{total:number}
    const visitas:v[] =await db.query(`
        SELECT COUNT(id) as total 
        FROM visitasPerfil 
        WHERE perfil = ${db.escape(req.params.id)}`)
    user[0].visitas = visitas[0].total
    

    if(token != undefined && token.includes("Bearer ")){
        tokenString= token.split(' ')[1];
        const payload = jwt.decode(tokenString, config.apiKey);
        
        let userSeguido = await db.query(`
            SELECT * 
            FROM carteraProveedores 
            WHERE acountSeguido = ${db.escape(req.params.id)}
            && acountSeguidor = ${db.escape(payload.sub)}`
        )
        if((payload.sub == req.params.id || payload.role == 3) && new Date(new Date().getTime() + payload.iat) > new Date())
        {   // SI EL USUARIO SOLICITANTE ES EL PROPIETARIO DE ESTE PERFIL O SI ES ADMINISTRADOR
            // PUEDE EDITAR
               user[0].canEdit = true;
        }
        if(new Date(new Date().getTime() + payload.iat) > new Date())
            user[0].canFollow = true
        if(payload.sub == req.params.id)
            user[0].propietario = true;
        if(vinculos.filter(v => v.acountSeguidor == Number(payload.sub)).length == 1)
            user[0].seguido = true
    } 
    return res.status(200).send(user[0]);    
})
app.post("/seguir/:id", isAuth.simple, async(req,res)=>{
    const token = req.headers.authorization;
    let tokenString:string;
    if(token){
        tokenString= token.split(' ')[1];
        const payload = jwt.decode(tokenString, config.apiKey);
        if(payload.sub != req.params.id )
        {   // SI EL USUARIO SOLICITANTE NO ES EL PROPIETARIO DE ESTE PERFIL
            // PUEDE SEGUIR
            let query = await db.query(`
                INSERT INTO carteraProveedores (acountSeguido, acountSeguidor)
                            VALUES(${db.escape(req.params.id)}, ${payload.sub})
            `) 
            return res.send(200)
        }        
    }
    else res.status(500).send("Not Authenticated");
})
app.delete("/seguir/:id",isAuth.simple, async(req,res)=>{
    const token = req.headers.authorization;
    let tokenString:string;
    if(token){
        tokenString= token.split(' ')[1];
        const payload = jwt.decode(tokenString, config.apiKey);
        if(payload.sub != req.params.id )
        {   // SI EL USUARIO SOLICITANTE NO ES EL PROPIETARIO DE ESTE PERFIL
            // PUEDE DEJAR DE SEGUIR
            let query = await db.query(`
                DELETE FROM carteraProveedores WHERE 
                    acountSeguido = ${db.escape(req.params.id)} &&
                    acountSeguidor = ${payload.sub}
            `) 
            return res.send(200)
        }        
    }
    else res.status(500).send("Not Authenticated");
})

app.put('/profile/:id', isAuth.simple,async (req:Request,res:Response)=> {  
    const token = req.headers.authorization;
    let tokenString:string;
    if(token){
        tokenString= token.split(' ')[1];
        const payload = jwt.decode(tokenString, config.apiKey);
        if(payload.sub == req.params.id || payload.role == 3)
        {   // SI EL USUARIO SOLICITANTE ES EL PROPIETARIO DE ESTE PERFIL O SI ES ADMINISTRADOR
            // PUEDE EDITAR
            let query = await db.query(`
                UPDATE acountUser SET
                    razonSocial = ${db.escape(req.body.razonSocial)},
                    slogan = ${db.escape(req.body.slogan)},
                    titulo = ${db.escape(req.body.titulo)},
                    telefono = ${db.escape(req.body.telefono)},
                    email = ${db.escape(req.body.email)},
                    sitioWeb = ${db.escape(req.body.sitioWeb)},
                    descripcion = ${db.escape(req.body.descripcion)},
                    direccionLocalidad = ${db.escape(req.body.direccion)},
                    tags = ${db.escape(req.body.tags)},
                    profesion = ${db.escape(req.body.profesion)}
                WHERE id = ${Number(req.params.id)}
            `)
               console.log(req.body)
               return res.send(200)
        }
        
    }
    else res.status(500).send("Not Authenticated");
})

app.post('/profilephoto/:id',[upload.array("temp",1), isAuth.simple],async (req:Request,res:Response)=> {
    const token = req.headers.authorization;
    let tokenString:string; 

    if(token && req.files.length == 1 &&  req.files instanceof Array){
        tokenString= token.split(' ')[1];
        const payload = jwt.decode(tokenString, config.apiKey);
        if(payload.sub == req.params.id || payload.role == 3)
        {   // SI EL USUARIO SOLICITANTE ES EL PROPIETARIO DE ESTE PERFIL O SI ES ADMINISTRADOR
            // PUEDE EDITAR
            let extension = req.files[0].originalname.split(".");
            let strExtension = extension[extension.length-1]
            let pathFormed = path.join(__dirname,`../public/uploads/images/cp_${req.params.id}_profile.`+strExtension)
            fs.writeFileSync(pathFormed, req.files[0].buffer);
            return res.send({
                path:`/uploads/images/cp_${req.params.id}_profile.`+strExtension,
                originalName: `${req.params.id}_profile.`+ strExtension
            })
        }        
    }
    else res.status(500).send("Not Authenticated");
})
app.post('/portadaphoto/:id',[upload.array("temp",1), isAuth.simple],async (req:Request,res:Response)=> {
    const token = req.headers.authorization;
    let tokenString:string; 

    if(token && req.files.length == 1 && req.files instanceof Array){
        tokenString= token.split(' ')[1];
        const payload = jwt.decode(tokenString, config.apiKey);
        if(payload.sub == req.params.id || payload.role == 3)
        {   // SI EL USUARIO SOLICITANTE ES EL PROPIETARIO DE ESTE PERFIL O SI ES ADMINISTRADOR
            // PUEDE EDITAR
            let extension = req.files[0].originalname.split(".")
            let strExtension = extension[extension.length-1]
            let pathFormed = path.join(__dirname,`../public/uploads/images/cp_${req.params.id}_portada.`+strExtension)
            fs.writeFileSync(pathFormed, req.files[0].buffer);
            return res.send({
                path:`/uploads/images/cp_${req.params.id}_portada.`+strExtension,
                originalName: `${req.params.id}_portada.`+ strExtension
            })
        }        
    }
    else res.status(500).send("Not Authenticated");
})

app.post('/resizephotoperfil/:id',isAuth.simple,async (req:Request,res:Response)=> {
    const token = req.headers.authorization;
    let tokenString:string; 

    if(token){
        tokenString= token.split(' ')[1];
        const payload = jwt.decode(tokenString, config.apiKey);
        if(payload.sub == req.params.id || payload.role == 3)
        {   // SI EL USUARIO SOLICITANTE ES EL PROPIETARIO DE ESTE PERFIL O SI ES ADMINISTRADOR
            // PUEDE EDITAR
            resizeFoto(req,async()=>{                
                let user =  await db.query(`
                    SELECT * 
                    FROM acountUser
                    WHERE id = ${db.escape(req.params.id)}
                `);
                if(user[0].imagenPerfil){
                    try{
                        fs.unlinkSync(path.join(__dirname,`../public/${user[0].imagenPerfil}`))
                    }catch(err){}
                }
                await db.query(`
                    UPDATE acountUser 
                    SET imagenPerfil = "/uploads/images/${req.body.originalName}"
                            WHERE id = ${Number(req.params.id)}
                `)
                .then(()=> res.send(200))
            })
        }        
    }
    else res.status(500).send("Not Authenticated");
})
app.post('/resizephotoportada/:id',isAuth.simple,async (req:Request,res:Response)=> {
    const token = req.headers.authorization;
    let tokenString:string; 

    if(token){
        tokenString= token.split(' ')[1];
        const payload = jwt.decode(tokenString, config.apiKey);
        if(payload.sub == req.params.id || payload.role == 3)
        {   // SI EL USUARIO SOLICITANTE ES EL PROPIETARIO DE ESTE PERFIL O SI ES ADMINISTRADOR
            // PUEDE EDITAR 
            resizeFoto(req, async()=>{
                let user =  await db.query(`
                    SELECT * 
                    FROM acountUser
                    WHERE id = ${db.escape(req.params.id)}
                `);
                if(user[0].imagenPortada){
                    try{
                        fs.unlinkSync(path.join(__dirname,`../public/${user[0].imagenPortada}`))
                    }catch(err){}
                }
                db.query(`UPDATE acountUser SET imagenPortada = "/uploads/images/${req.body.originalName}"
                            WHERE id = ${Number(req.params.id)}
                `)
                .then(()=> res.send(200))
            })
        }        
    }
    else res.status(500).send("Not Authenticated");
})

const resizeFoto = (req:Request, callb:any)=>
{
    let pathFormed = req.body.originalName
    let dimensions = imageSize(path.join(__dirname,`../public/uploads/images/cp_${pathFormed}`));
    let redimentions; 
    let cprutaArchivo = path.join(__dirname,`../public/uploads/images/cp_${pathFormed}`);
    let rutaArchivo = path.join(__dirname,`../public/uploads/images/${pathFormed}`);
    if(dimensions.width && dimensions.height)
    {
        dimensions.width == 0 ? 100 : dimensions.width
        dimensions.height == 0 ? 100 : dimensions.height
        redimentions = {                
            width: ~~(dimensions.width * parseInt(req.body.crop.width) /100),
            height:~~(dimensions.height * parseInt(req.body.crop.height)/100),
            left:~~(dimensions.width * parseInt(req.body.crop.x) /100),
            top:~~(dimensions.height * parseInt(req.body.crop.y) /100)
        }              
        
        gm(cprutaArchivo)
        .crop(redimentions.width, redimentions.height, redimentions.left, redimentions.top)
        .write(rutaArchivo,(err) => {
            if(err)
                console.error(err)
            fs.unlinkSync(cprutaArchivo);
        });
        return callb();
    }
}


app.post('/login',async (req:Request, res:Response)=> 
{  
    let acount:acountUser[] = await db.query(`
        SELECT * 
        FROM acountUser 
        WHERE userName = ${db.escape(req.body.userName)}
        && fechaAlta < now()
    `);
    enum roles {simple, premium, moderador, admin}
    if(acount.length == 1 && compareHash(req.body.pass+"", acount[0].contrasenia))
    {
        acount[0].role = roles[acount[0].rol]
        let token = createToken(acount[0]);
        
        return res.send({
            id:acount[0].id,
            razonSocial:acount[0].razonSocial,
            token:token,
            role: roles[acount[0].rol],
            rol: acount[0].rol
        });
    }
    else return res.status(403).send("no autorizado");
})

app.post('/registro', async (req:Request, res:Response)=>
{
    let claveValidacion = (Math.floor(Math.random() * (10000000000 - 1000000000)) + 1000000000).toString(36);
    let user:acountUser[] = await db.query(`
        SELECT * 
        FROM acountUser 
        WHERE userName = ${db.escape(req.body.userName)}
        && fechaAlta < now()
    `);
    if(user.length == 0 && validator.isEmail(req.body.email) && req.body.pass.length >= 6 && req.body.userName.length >= 4)
    {
        let data = {
            userName: req.body.userName,
            razonSocial: req.body.razonSocial,
            email: req.body.email,
            contrasenia: genHash(req.body.pass+""),
            fechaAlta: new Date(2999,1,1),
            fechaBaja: new Date(),
            fechaCreacion: new Date(),
            rol: 0,
            claveValidacion: claveValidacion
        }; 
        let user = await db.query(`
            INSERT INTO acountUser (${Object.keys(data).join(",")}) 
                        values ${db.escape(Object.values(data))}
        `);
        sendMail(data.email, "Confirmar cuenta de VALOR-AR",`
            <p>Gracias por formar parte de nuestro equipo!</p>
            <p>Para poder comenzar a usar la cuenta deberás validarla haciendo 
                <a href="${config.host}/api/acount/validar?user=${user.insertId}&clave=${data.claveValidacion}">
                    click acá
                </a>
            </p>
        `)
        return res.send(user);
    }
    else res.status(402).send("El email está en uso");
})
app.get("/validar",async (req,res)=>{
    const user = req.query.user;
    const clave = req.query.clave;

    let userExist =await db.query(`
        SELECT * 
        FROM acountUser 
        WHERE id = ${db.escape(user)} && 
              claveValidacion = ${db.escape(clave)}
              && fechaAlta > now()
    `)
    if(userExist.length == 1)
    {
        await db.query(`
            UPDATE acountUser 
            SET claveValidacion = "",
                fechaAlta = ${db.escape(new Date())}
            WHERE id = ${db.escape(user)}
        `)
        return res.redirect("/#validado")
    }
    else return res.sendStatus(403).send("error");
})

app.post("/solicitarrecupero",async(req,res)=>{
    let userName = req.query.userName;
    let user = await db.query(`
        SELECT * 
        FROM acountUser
        WHERE userName = ${db.escape(userName)}
        && fechaAlta < now()
    `)
    if(user.length)
    {
        const claveValidacion = (Math.floor(Math.random() * (10000000000 - 1000000000)) + 1000000000).toString(36)
        await db.query(`
            UPDATE acountUser 
            SET claveValidacion = ${db.escape(claveValidacion)} 
            WHERE id = ${db.escape(user[0].id)}
        `)
        sendMail(user[0].email,"Has solicitado el recupero de contraseña en VALOR-AR",`
            <h4>Para generar una nueva contraseña ingresá al siguiente 
            <a href="${config.host}/#rescuepass/${user[0].id}/${claveValidacion}">LINK</a>"
            </h4>
        `)
        let emailSplited = user[0].email.split("@");
        let email = emailSplited[0].slice(0,2)+"*****@"+emailSplited[1]
        return res.send({email})
    }
    
})
app.post("/cambiarclaverecupero",async(req,res)=>{
    const userId = req.query.id;
    const claveValidacion = req.query.clave;
    const newPass = req.body.newPass;

    const user = await db.query(`
        SELECT id 
        FROM acountUser
        WHERE id = ${db.escape(userId)}
        && fechaAlta < now()
        && claveValidacion = ${db.escape(claveValidacion)}
    `)
    if(user.length)
    {
        await db.query(`
            UPDATE acountUser 
            SET claveValidacion = "",
            contrasenia = ${db.escape(genHash(newPass))}
            WHERE id = ${db.escape(userId)}
        `)
        return res.send("ok");
    }
    else return res.status(403);    
})
app.post("/cambiarclave/:id",isAuth.simple,async(req,res)=>{
    const token = req.headers.authorization;
    let tokenString:string; 

    if(token && req.body.pass.length >= 6){
        tokenString= token.split(' ')[1];
        const payload = jwt.decode(tokenString, config.apiKey);
        if(payload.sub == req.params.id || payload.role == 3)
        {   // SI EL USUARIO SOLICITANTE ES EL PROPIETARIO DE ESTE PERFIL O SI ES ADMINISTRADOR
            // PUEDE EDITAR
            await db.query(`
                UPDATE acountUser 
                SET contrasenia = ${db.escape(genHash(req.body.pass))}
                WHERE id = ${db.escape(req.params.id)}
            `)
            return res.send("ok")
        }        
    }
    else res.status(500).send("Not Authenticated");
})

app.get("/empresas",async (req,res)=>{
    let empresas = await db.query(`
        SELECT id, razonSocial, titulo, imagenPerfil 
        FROM acountUser        
        WHERE fechaAlta < now() 
        && fechaBaja > now()
        && tipo = 2
    `)
    return res.send(empresas);
})
app.get("/autonomos",async (req,res)=>{
    let autonomos:[] = await db.query(`
        SELECT id, razonSocial, titulo, imagenPerfil 
        FROM acountUser        
        WHERE fechaAlta < now() 
        && fechaBaja > now()
        && tipo = 1
    `)
    return res.send(autonomos);
})


function createToken(user:acountUser)
{
    const payload = {
        sub: user.id,
        role: user.role,
        rol: user.rol,
        name:user.razonSocial,
        iat: moment().unix(),
        exp: moment().add(14,'days').unix()
    };
    return jwt.encode(payload, config.apiKey);
}


function genHash(rndString: string)
{
    let salt =  bcrypt.genSaltSync(saltRounds);
    let hash =  bcrypt.hashSync(rndString, salt);
    return hash;
}

function compareHash(rndString:string, hash:string)
{
    return bcrypt.compareSync(rndString, hash);
}

export default app;