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
            rol:payload.role
        });
    }
    else res.status(500).send("Not Authenticated");
})
app.get('/profile/:id',async (req:Request,res:Response)=> {  
    const token = req.headers.authorization;
    let tokenString:string;
    let user = await db.query(`SELECT * FROM acountUser WHERE id = ${Number(req.params.id)}`)
    if(token != undefined && token.includes("Bearer ")){
        tokenString= token.split(' ')[1];
        const payload = jwt.decode(tokenString, config.apiKey);

        if(payload.sub == req.params.id || payload.role == 3)
        {   // SI EL USUARIO SOLICITANTE ES EL PROPIETARIO DE ESTE PERFIL O SI ES ADMINISTRADOR
            // PUEDE EDITAR
               user[0].canEdit = true;
        }
    }
    return res.status(200).send(user[0]);    
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
                    descripcion = ${db.escape(req.body.descripcion)}
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

    if(token){
        tokenString= token.split(' ')[1];
        const payload = jwt.decode(tokenString, config.apiKey);
        if(payload.sub == req.params.id || payload.role == 3)
        {   // SI EL USUARIO SOLICITANTE ES EL PROPIETARIO DE ESTE PERFIL O SI ES ADMINISTRADOR
            // PUEDE EDITAR
            let extension = req.files[0].originalname.split(".")
            extension = extension[extension.length-1]
            let pathFormed = path.join(__dirname,`../public/uploads/images/cp_${req.params.id}_profile.`+extension)
            fs.writeFileSync(pathFormed, req.files[0].buffer);
            return res.send({
                path:`/uploads/images/cp_${req.params.id}_profile.`+extension,
                originalName: `${req.params.id}_profile.`+ extension
            })
        }        
    }
    else res.status(500).send("Not Authenticated");
})
app.post('/portadaphoto/:id',[upload.array("temp",1), isAuth.simple],async (req:Request,res:Response)=> {
    const token = req.headers.authorization;
    let tokenString:string; 

    if(token){
        tokenString= token.split(' ')[1];
        const payload = jwt.decode(tokenString, config.apiKey);
        if(payload.sub == req.params.id || payload.role == 3)
        {   // SI EL USUARIO SOLICITANTE ES EL PROPIETARIO DE ESTE PERFIL O SI ES ADMINISTRADOR
            // PUEDE EDITAR
            let extension = req.files[0].originalname.split(".")
            extension = extension[extension.length-1]
            let pathFormed = path.join(__dirname,`../public/uploads/images/cp_${req.params.id}_portada.`+extension)
            fs.writeFileSync(pathFormed, req.files[0].buffer);
            return res.send({
                path:`/uploads/images/cp_${req.params.id}_portada.`+extension,
                originalName: `${req.params.id}_portada.`+ extension
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
            console.log("resize")
            resizeFoto(req,()=>
            db.query(`UPDATE acountUser SET imagenPerfil = "/uploads/images/${req.body.originalName}"
                        WHERE id = ${Number(req.params.id)}
            `)
            .then(()=> res.send(200)))
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
            console.log("resize")
            resizeFoto(req,()=>
            db.query(`UPDATE acountUser SET imagenPortada = "/uploads/images/${req.body.originalName}"
                        WHERE id = ${Number(req.params.id)}
            `)
            .then(()=> res.send(200)))
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
        
        gm
        (cprutaArchivo)
        .crop(redimentions.width, redimentions.height, redimentions.left, redimentions.top)
        .write(rutaArchivo,err => console.error(err));

        return callb();
    }
}


app.post('/login',async (req:Request, res:Response)=> 
{ 
    console.log(req.body.email)
    let acount:acountUser[] = await db.query(`SELECT * FROM acountUser WHERE email = ${db.escape(req.body.email)}`);

    if(acount.length == 1 && compareHash(req.body.pass+"", acount[0].contrasenia))
    {
        let token = createToken(acount[0]);
        return res.send({
            id:acount[0].id,
            razonSocial:acount[0].razonSocial,
            token:token
        });
    }
    else return res.status(403).send("no autorizado");
})

app.post('/registro', async (req:Request, res:Response)=>
{
    let claveValidacion = (Math.floor(Math.random() * (10000000000 - 1000000000)) + 1000000000).toString(36);
    let user:acountUser[] = await db.query(`SELECT * FROM acountUser WHERE userName = ${db.escape(req.body.userName)}`);
    if(user.length == 0 && req.body.email.includes("@"))
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
                <a href="${config.host}/api/acount/validar?user=${data.userName}&clave=${data.claveValidacion}>
                    click acá
                </a>
            </p>
        `)
        return res.send(user);
    }
    else res.status(402).send("El email está en uso");
})
app.get("/validar",async (req,res)=>{
    const userName = req.query.userName;
    const clave = req.query.clave;

    let user =await db.query(`
        SELECT * 
        FROM acountUser 
        WHERE userName = ${db.escape(userName)} && 
              claveValidacion = ${db.escape(clave)}
    `)
    if(user.length == 0)
    {
        await db.query(`
            UPDATE acountUser 
            SET claveValidacion = "",
                fechaAlta = ${db.escape(new Date())}
            WHERE acountUser = ${db.escape(userName)}
        `)
        return res.status(200).redirect("/#validado")
    }
    else return res.status(403);
})



function createToken(user:acountUser)
{
    const payload = {
        sub: user.id,
        role: user.rol,
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