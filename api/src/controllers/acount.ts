import express, {Request,Response, NextFunction } from 'express'; 
import jwt from 'jwt-simple';
import bcrypt from 'bcryptjs';
import moment from 'moment';
import config from '../config';
import db from './db';

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
        return res.status(200).send({nombre:payload.name});
    }
    else res.status(500).send("Not Authenticated");
})

app.post('/login',async (req:Request, res:Response)=> 
{ 
    console.log(req.body.email)
    let acount:acountUser[] = await db.query(`SELECT * FROM acountUser WHERE email = ${db.escape(req.body.email)}`);

    if(acount[0] && compareHash(req.body.contrasenia+"", acount[0].contrasenia))
    {
        let token = createToken(acount[0]);
        return res.send({
            token:token
        });
    }
    else return res.status(403).send("no autorizado");
})

app.post('/registro', async (req:Request, res:Response)=>
{
    let user:acountUser[] = await db.query(`SELECT * FROM acountUser WHERE email = ${db.escape(req.body.email)}`);
    if(user.length == 0 && req.body.email.includes("@"))
    {
        let data = {
            razonSocial: req.body.razonSocial,
            email: req.body.email,
            contrasenia: genHash(req.body.pass+""),
            fechaAlta: new Date(),
            fechaBaja: '29990101',
            fechaCreacion: new Date(),
            rol: 0
        }; 
        let user = await db.query(`
            INSERT INTO acountUser (${Object.keys(data).join(",")}) 
                        values ${db.escape(Object.values(data))}
        `);
        return res.send(user);
    }
    else res.status(402).send("El email está en uso");
})



function createToken(user:acountUser)
{
    const payload = {
        sub: user.id,
        role: user.rol,
        name:user.email,
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