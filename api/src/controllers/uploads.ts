import express from 'express';
const app = express.Router();

app.post("/portada",(req,res)=>{
    return res.send("http://localhost:3000/logo.png");
})

export default app;