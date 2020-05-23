"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default.Router();
const acount_1 = require("./acount");
const db_1 = __importDefault(require("./db"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = __importDefault(require("crypto"));
const emails_1 = __importDefault(require("./emails"));
const config_1 = __importDefault(require("../config"));
const moment_1 = __importDefault(require("moment"));
app.post("/", multer_1.default().array("cv", 1), async (req, res) => {
    let cv;
    let cvBuffer;
    if (req.files instanceof Array) {
        cv = req.files[0];
        cvBuffer = req.files[0].buffer;
    }
    else {
        return res.status(400);
    }
    const userData = JSON.parse(req.body.user);
    const pathId = `${crypto_1.default.randomBytes(20).toString("hex")}_${cv.originalname}`;
    const pathToWrite = path_1.default.join(__dirname, `../private/uploads/cv/${pathId}`);
    let claveSeguridad = (Math.floor(Math.random() * (10000000000 - 1000000000)) + 1000000000).toString(36);
    const consultaEmail = await db_1.default.query(`SELECT * FROM curriculum WHERE email = ${db_1.default.escape(userData.email)}`);
    try {
        if (consultaEmail.length > 0 && consultaEmail[0].claveSeguridad != req.query.key.toString()) {
            return res.status(403).send("no se proporcionó una clave de seguridad o la misma es errónea");
        }
        if (consultaEmail.length > 0 && req.query.key == consultaEmail[0].claveSeguridad) {
            fs_1.default.unlinkSync(path_1.default.join(__dirname, "../private/" + consultaEmail[0].archivo));
            claveSeguridad = req.query.key.toString();
        }
        fs_1.default.writeFileSync(pathToWrite, cvBuffer);
        let insert = await db_1.default.query(`
            INSERT INTO curriculum (nombre, email,telefono,archivo,tags,claveSeguridad, fechaAlta, fechaCarga, fechaBaja)
            VALUES (
                ${db_1.default.escape(userData.nombre)},
                ${db_1.default.escape(userData.email)},
                ${db_1.default.escape(userData.telefono)},
                ${db_1.default.escape("/uploads/cv/" + pathId)},
                ${db_1.default.escape(userData.tags)},
                ${db_1.default.escape(claveSeguridad)},
                ${db_1.default.escape(new Date(2999, 1, 1))},
                ${db_1.default.escape(new Date())},
                ${db_1.default.escape(moment_1.default().add(15, "days").toDate())}
            )
            ON DUPLICATE KEY UPDATE 
                nombre = ${db_1.default.escape(userData.nombre)},
                telefono = ${db_1.default.escape(userData.telefono)},
                archivo = ${db_1.default.escape("/uploads/cv/" + pathId)},
                tags = ${db_1.default.escape(userData.tags)},
                claveSeguridad= ${db_1.default.escape(claveSeguridad)},
                fechaBaja = ${db_1.default.escape(moment_1.default().add(15, "days").toDate())}
        `);
        //enviar email
        emails_1.default(userData.email, `Hemos recibido tu Currículum ${!consultaEmail.length ? "- CONFIRMAR INFO" : ""}`, `
                <p>Gracias por confiar en nuestro equipo, haremos todo lo posible para ayudarte en tu búsqueda
                labroal.</p>
                ${!consultaEmail[0] || consultaEmail[0].fechaAlta > new Date() ? `<p><b>IMPORTANTE: Para dar de alta la información y que sea visible en la plataforma 
                <a href="${config_1.default.host}/api/curriculum/activarcv?email=${userData.email}&clave=${claveSeguridad}">Clickeá acá!</a></b></p>` : ""}
                <p><b>A continuación detallaremos la información que nos enviaste</b></p><br>                
                <p>NOMBRE COMPLETO: ${userData.nombre}</p>
                <p>TELEFONO: ${userData.telefono}</p>
                <p>ARCHIVO ADJUNTO: <a href="${config_1.default.host}/api/curriculum/${pathId}">Previsualizalo acá</a></p>
                <p>PALABRAS CLAVE: ${userData.tags}</p>
                <br>
                <p>Esta información será dada de baja dentro de 15 días, luego tendrás que volver a recargar tu información</p>
                <p>Para editar esta información deberás volver a cargar todo desde el mismo 
                    <a href="${config_1.default.host}/#cargarcv">formulario</a>, ingresando el mismo email y adicionando la clave
                    de seguridad que te propiciamos a continuación: <b>${claveSeguridad}</b>
                </p>
        `);
        return res.send(201);
    }
    catch (err) {
        console.error(err);
        return res.status(500);
    }
});
app.get("/activarcv", async (req, res) => {
    const consultaEmail = await db_1.default.query(`
        SELECT * 
        FROM curriculum 
        WHERE email = ${db_1.default.escape(req.query.email.toString())}
        && claveSeguridad = ${db_1.default.escape(req.query.clave.toString())}
        && fechaAlta > now()
    `);
    if (!consultaEmail.length) {
        res.status(403);
    }
    try {
        await db_1.default.query(`
            UPDATE curriculum 
            SET fechaAlta = ${db_1.default.escape(new Date())} 
            WHERE email = ${db_1.default.escape(req.query.email.toString())}
        `);
        res.status(200).redirect(config_1.default.host);
    }
    catch (err) {
        res.status(500);
    }
});
app.get("/:id", (req, res) => {
    const pathForSend = path_1.default.join(__dirname, `../private/uploads/cv/${req.params.id}`);
    res.sendFile(pathForSend);
});
app.post("/recuperoclave", async (req, res) => {
    const consultaEmail = await db_1.default.query(`SELECT * FROM curriculum WHERE email = ${db_1.default.escape(req.query.email.toString())}`);
    if (!consultaEmail.length) {
        res.status(403);
    }
    let claveSeguridad = (Math.floor(Math.random() * (10000000000 - 1000000000)) + 1000000000).toString(36);
    try {
        await db_1.default.query(`
            UPDATE curriculum 
            SET claveSeguridad = ${db_1.default.escape(claveSeguridad)} 
            WHERE email = ${db_1.default.escape(req.query.email.toString())}
        `);
        emails_1.default(req.query.email.toString(), "Recuperamos tu Clave", `
            <p>Tu nueva clave de segurdad es: <b>${claveSeguridad}</b></p>
        `);
        res.status(200).send("ok");
    }
    catch (err) {
        res.status(500);
    }
});
app.get("/", acount_1.isAuth.premium, async (req, res) => {
    let cvs = db_1.default.query(`
        SELECT nombre, email, telefono, archivo, tags, fechaAlta 
        FROM curriculum
        ORDER BY DESC fechaAlta
        LIMIT 50
    `);
});
exports.default = app;
//# sourceMappingURL=curriculum.js.map