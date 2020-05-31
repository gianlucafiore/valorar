import express from 'express';
import db from "./db";

const app = express.Router()

app.get("/", async(req,res)=>{
    let terminos:string;
    if(typeof req.query.search == "string"){
        terminos = req.query.search.split(",").map(s => {
            return ` tags LIKE ${db.escape("%"+s.trim()+"%")} `
        }).join("||")
        let perfiles = await db.query(`
            SELECT id, razonSocial, titulo, imagenPerfil, tipo
            FROM acountUser
            WHERE fechaAlta < NOW() && fechaBaja > NOW() &&
                ${terminos}
            
        `)
        return res.send(perfiles);
    }
})

export default app;