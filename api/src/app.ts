import express from 'express';
import acount from './controllers/acount'
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors())
app.use("/api/acount",acount)


app.listen(5000, ()=>console.log("on port 5000"))