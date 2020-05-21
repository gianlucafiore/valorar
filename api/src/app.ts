import express from 'express';
import acount from './controllers/acount'
import cors from 'cors';
import upload from './controllers/uploads'
import path from 'path'
import curriculum from './controllers/curriculum'


const app = express();
app.use(express.json());
app.use(cors())
app.use(express.static(path.join(__dirname,"/public")))
app.use("/api/acount",acount)
app.use("/api/upload", upload)
app.use("/api/curriculum", curriculum)


app.listen(5000, ()=>console.log("on port 5000"))