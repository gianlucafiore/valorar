import express, { Request, Response } from 'express';
const app = express.Router();
import { isAuth } from './acount';
import db from './db';
import multer from 'multer';  
import fs from 'fs'; 
import path from 'path';
import crypto from 'crypto';
import sendMail from './emails';
import config from '../config';
import moment from 'moment';

app.post("/", multer().array("cv",1),async (req:Request,res:Response)=>{
    let cv;
    let cvBuffer;
    if(req.files instanceof Array){
        cv = req.files[0];
        cvBuffer = req.files[0].buffer;
    }
    else{
        return res.status(400);
    }
    const userData = JSON.parse(req.body.user);
    const pathId = `${crypto.randomBytes(20).toString("hex")}_${cv.originalname}`;
    const pathToWrite = path.join(__dirname,`../private/uploads/cv/${pathId}`);
    let claveSeguridad = (Math.floor(Math.random() * (10000000000 - 1000000000)) + 1000000000).toString(36);
    
    const consultaEmail = await db.query(`SELECT * FROM curriculum WHERE email = ${db.escape(userData.email)}`);
    
    try{
        if(consultaEmail.length > 0 && consultaEmail[0].claveSeguridad != req.query.key.toString() )
        {
            return res.status(403).send("no se proporcionó una clave de seguridad o la misma es errónea")
        }
        if(consultaEmail.length > 0 && req.query.key == consultaEmail[0].claveSeguridad)
        {
            fs.unlinkSync(path.join(__dirname,"../private/"+consultaEmail[0].archivo))
            claveSeguridad = req.query.key.toString();
        }
        fs.writeFileSync(pathToWrite, cvBuffer);
        let insert = await db.query(`
            INSERT INTO curriculum (nombre, email,telefono,archivo,tags,claveSeguridad, fechaAlta, fechaCarga, fechaBaja)
            VALUES (
                ${db.escape(userData.nombre)},
                ${db.escape(userData.email)},
                ${db.escape(userData.telefono)},
                ${db.escape("/uploads/cv/"+pathId)},
                ${db.escape(userData.tags)},
                ${db.escape(claveSeguridad)},
                ${db.escape(new Date(2999,1,1))},
                ${db.escape(new Date())},
                ${db.escape(moment().add(15,"days").toDate())}
            )
            ON DUPLICATE KEY UPDATE 
                nombre = ${db.escape(userData.nombre)},
                telefono = ${db.escape(userData.telefono)},
                archivo = ${db.escape("/uploads/cv/"+pathId)},
                tags = ${db.escape(userData.tags)},
                claveSeguridad= ${db.escape(claveSeguridad)},
                fechaBaja = ${db.escape(moment().add(15,"days").toDate())}
        `)
        //enviar email
        sendMail(userData.email,`Hemos recibido tu Currículum ${!consultaEmail.length?"- CONFIRMAR INFO" :""}`, `
                <p>Gracias por confiar en nuestro equipo, haremos todo lo posible para ayudarte en tu búsqueda
                labroal.</p>
                ${!consultaEmail[0]||consultaEmail[0].fechaAlta > new Date() ? `<p><b>IMPORTANTE: Para dar de alta la información y que sea visible en la plataforma 
                <a href="${config.host}/api/curriculum/activarcv?email=${userData.email}&clave=${claveSeguridad}">Clickeá acá!</a></b></p>`:""}
                <p><b>A continuación detallaremos la información que nos enviaste</b></p><br>                
                <p>NOMBRE COMPLETO: ${userData.nombre}</p>
                <p>TELEFONO: ${userData.telefono}</p>
                <p>ARCHIVO ADJUNTO: <a href="${config.host}/api/curriculum/${pathId}">Previsualizalo acá</a></p>
                <p>PALABRAS CLAVE: ${userData.tags}</p>
                <br>
                <p>Esta información será dada de baja dentro de 15 días, luego tendrás que volver a recargar tu información</p>
                <p>Para editar esta información deberás volver a cargar todo desde el mismo 
                    <a href="${config.host}/#cargarcv">formulario</a>, ingresando el mismo email y adicionando la clave
                    de seguridad que te propiciamos a continuación: <b>${claveSeguridad}</b>
                </p>
        `)
        return res.send(201);
    }
    catch(err)
    {
        console.error(err)
        return res.status(500);
    }
})

app.get("/activarcv",async (req,res)=>{
    const consultaEmail = await db.query(`
        SELECT * 
        FROM curriculum 
        WHERE email = ${db.escape(req.query.email.toString())}
        && claveSeguridad = ${db.escape(req.query.clave.toString())}
        && fechaAlta > now()
    `);
    if(!consultaEmail.length)
    {
        res.status(403);
    }
    try{
        await db.query(`
            UPDATE curriculum 
            SET fechaAlta = ${db.escape(new Date())} 
            WHERE email = ${db.escape(req.query.email.toString())}
        `)
        res.status(200).redirect(config.host)
    }
    catch(err)
    {
        res.status(500)
    }
})

app.get("/:id",(req,res)=>{
    const pathForSend = path.join(__dirname,`../private/uploads/cv/${req.params.id}`);
    res.sendFile(pathForSend);
})

app.post("/recuperoclave",async (req,res)=>{
    const consultaEmail = await db.query(`SELECT * FROM curriculum WHERE email = ${db.escape(req.query.email.toString())}`);
    if(!consultaEmail.length)
    {
        res.status(403);
    }
    let claveSeguridad = (Math.floor(Math.random() * (10000000000 - 1000000000)) + 1000000000).toString(36);
    try{
        await db.query(`
            UPDATE curriculum 
            SET claveSeguridad = ${db.escape(claveSeguridad)} 
            WHERE email = ${db.escape(req.query.email.toString())}
        `)

        sendMail(req.query.email.toString(), "Recuperamos tu Clave", `
            <p>Tu nueva clave de segurdad es: <b>${claveSeguridad}</b></p>
        `)
        res.status(200).send("ok")
    }
    catch(err)
    {
        res.status(500)
    }
})

app.get("/", isAuth.premium ,async (req,res)=>{
    let cvs = db.query(`
        SELECT nombre, email, telefono, archivo, tags, fechaAlta 
        FROM curriculum
        ORDER BY DESC fechaAlta
        LIMIT 50
    `)
})



export default app;