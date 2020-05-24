"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const express_1 = __importDefault(require("express"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const moment_1 = __importDefault(require("moment"));
const config_1 = __importDefault(require("../config"));
const db_1 = __importDefault(require("./db"));
const fs_1 = __importDefault(require("fs"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const image_size_1 = require("image-size");
const gm_1 = __importDefault(require("gm"));
const emails_1 = __importDefault(require("./emails"));
const validator_1 = __importDefault(require("validator"));
const gm = gm_1.default.subClass({ imageMagick: true });
const upload = multer_1.default();
const app = express_1.default.Router();
const saltRounds = 10;
class IsAuth {
    simple(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(403).send({ message: "No estás autorizado" });
        }
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt_simple_1.default.decode(token, config_1.default.apiKey);
        if (payload.exp <= moment_1.default().unix()) {
            return res.status(401).send({ message: "El token ha expirado" });
        }
        next();
    }
    admin(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(403).send({ message: "No estás autorizado" });
        }
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt_simple_1.default.decode(token, config_1.default.apiKey);
        if (payload.exp <= moment_1.default().unix()) {
            return res.status(401).send({ message: "El token ha expirado" });
        }
        if (payload.role != 'admin') {
            return res.status(403).send({ message: "Se requiere rol administrador" });
        }
        next();
    }
    moderador(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(403).send({ message: "No estás autorizado" });
        }
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt_simple_1.default.decode(token, config_1.default.apiKey);
        if (payload.exp <= moment_1.default().unix()) {
            return res.status(401).send({ message: "El token ha expirado" });
        }
        if (payload.role != 'moderador' || payload.role != 'admin') {
            return res.status(403).send({ message: "Se requiere rol mínimo moderador" });
        }
        next();
    }
    premium(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(403).send({ message: "No estás autorizado" });
        }
        const token = req.headers.authorization.split(' ')[1];
        const payload = jwt_simple_1.default.decode(token, config_1.default.apiKey);
        if (payload.exp <= moment_1.default().unix()) {
            return res.status(401).send({ message: "El token ha expirado" });
        }
        if (payload.role != 'premium' || payload.role != 'admin') {
            return res.status(403).send({ message: "Se requiere rol mínimo moderador" });
        }
        next();
    }
}
exports.isAuth = new IsAuth();
app.get('/', exports.isAuth.simple, (req, res) => {
    const token = req.headers.authorization;
    let tokenString;
    if (token) {
        tokenString = token.split(' ')[1];
        const payload = jwt_simple_1.default.decode(tokenString, config_1.default.apiKey);
        return res.status(200).send({
            id: payload.sub,
            nombre: payload.name,
            rol: payload.role
        });
    }
    else
        res.status(500).send("Not Authenticated");
});
app.get('/profile/:id', async (req, res) => {
    const token = req.headers.authorization;
    let tokenString;
    let user = await db_1.default.query(`SELECT * FROM acountUser WHERE id = ${Number(req.params.id)}`);
    if (token != undefined && token.includes("Bearer ")) {
        tokenString = token.split(' ')[1];
        const payload = jwt_simple_1.default.decode(tokenString, config_1.default.apiKey);
        if (payload.sub == req.params.id || payload.role == 3) { // SI EL USUARIO SOLICITANTE ES EL PROPIETARIO DE ESTE PERFIL O SI ES ADMINISTRADOR
            // PUEDE EDITAR
            user[0].canEdit = true;
        }
    }
    return res.status(200).send(user[0]);
});
app.put('/profile/:id', exports.isAuth.simple, async (req, res) => {
    const token = req.headers.authorization;
    let tokenString;
    if (token) {
        tokenString = token.split(' ')[1];
        const payload = jwt_simple_1.default.decode(tokenString, config_1.default.apiKey);
        if (payload.sub == req.params.id || payload.role == 3) { // SI EL USUARIO SOLICITANTE ES EL PROPIETARIO DE ESTE PERFIL O SI ES ADMINISTRADOR
            // PUEDE EDITAR
            let query = await db_1.default.query(`
                UPDATE acountUser SET
                    razonSocial = ${db_1.default.escape(req.body.razonSocial)},
                    slogan = ${db_1.default.escape(req.body.slogan)},
                    titulo = ${db_1.default.escape(req.body.titulo)},
                    telefono = ${db_1.default.escape(req.body.telefono)},
                    email = ${db_1.default.escape(req.body.email)},
                    sitioWeb = ${db_1.default.escape(req.body.sitioWeb)},
                    descripcion = ${db_1.default.escape(req.body.descripcion)}
                WHERE id = ${Number(req.params.id)}
            `);
            console.log(req.body);
            return res.send(200);
        }
    }
    else
        res.status(500).send("Not Authenticated");
});
app.post('/profilephoto/:id', [upload.array("temp", 1), exports.isAuth.simple], async (req, res) => {
    const token = req.headers.authorization;
    let tokenString;
    if (token && req.files.length == 1 && req.files instanceof Array) {
        tokenString = token.split(' ')[1];
        const payload = jwt_simple_1.default.decode(tokenString, config_1.default.apiKey);
        if (payload.sub == req.params.id || payload.role == 3) { // SI EL USUARIO SOLICITANTE ES EL PROPIETARIO DE ESTE PERFIL O SI ES ADMINISTRADOR
            // PUEDE EDITAR
            let extension = req.files[0].originalname.split(".");
            let strExtension = extension[extension.length - 1];
            let pathFormed = path_1.default.join(__dirname, `../public/uploads/images/cp_${req.params.id}_profile.` + strExtension);
            fs_1.default.writeFileSync(pathFormed, req.files[0].buffer);
            return res.send({
                path: `/uploads/images/cp_${req.params.id}_profile.` + strExtension,
                originalName: `${req.params.id}_profile.` + strExtension
            });
        }
    }
    else
        res.status(500).send("Not Authenticated");
});
app.post('/portadaphoto/:id', [upload.array("temp", 1), exports.isAuth.simple], async (req, res) => {
    const token = req.headers.authorization;
    let tokenString;
    if (token && req.files.length == 1 && req.files instanceof Array) {
        tokenString = token.split(' ')[1];
        const payload = jwt_simple_1.default.decode(tokenString, config_1.default.apiKey);
        if (payload.sub == req.params.id || payload.role == 3) { // SI EL USUARIO SOLICITANTE ES EL PROPIETARIO DE ESTE PERFIL O SI ES ADMINISTRADOR
            // PUEDE EDITAR
            let extension = req.files[0].originalname.split(".");
            let strExtension = extension[extension.length - 1];
            let pathFormed = path_1.default.join(__dirname, `../public/uploads/images/cp_${req.params.id}_portada.` + strExtension);
            fs_1.default.writeFileSync(pathFormed, req.files[0].buffer);
            return res.send({
                path: `/uploads/images/cp_${req.params.id}_portada.` + strExtension,
                originalName: `${req.params.id}_portada.` + strExtension
            });
        }
    }
    else
        res.status(500).send("Not Authenticated");
});
app.post('/resizephotoperfil/:id', exports.isAuth.simple, async (req, res) => {
    const token = req.headers.authorization;
    let tokenString;
    if (token) {
        tokenString = token.split(' ')[1];
        const payload = jwt_simple_1.default.decode(tokenString, config_1.default.apiKey);
        if (payload.sub == req.params.id || payload.role == 3) { // SI EL USUARIO SOLICITANTE ES EL PROPIETARIO DE ESTE PERFIL O SI ES ADMINISTRADOR
            // PUEDE EDITAR
            resizeFoto(req, async () => {
                let user = await db_1.default.query(`
                    SELECT * 
                    FROM acountUser
                    WHERE id = ${db_1.default.escape(req.params.id)}
                `);
                //console.log(path.join(__dirname,`../public/${user[0].imagenPerfil}`))
                if (user[0].imagenPerfil) {
                    try {
                        fs_1.default.unlinkSync(path_1.default.join(__dirname, `../public/${user[0].imagenPerfil}`));
                    }
                    catch (err) { }
                }
                await db_1.default.query(`
                    UPDATE acountUser 
                    SET imagenPerfil = "/uploads/images/${req.body.originalName}"
                            WHERE id = ${Number(req.params.id)}
                `)
                    .then(() => res.send(200));
            });
        }
    }
    else
        res.status(500).send("Not Authenticated");
});
app.post('/resizephotoportada/:id', exports.isAuth.simple, async (req, res) => {
    const token = req.headers.authorization;
    let tokenString;
    if (token) {
        tokenString = token.split(' ')[1];
        const payload = jwt_simple_1.default.decode(tokenString, config_1.default.apiKey);
        if (payload.sub == req.params.id || payload.role == 3) { // SI EL USUARIO SOLICITANTE ES EL PROPIETARIO DE ESTE PERFIL O SI ES ADMINISTRADOR
            // PUEDE EDITAR 
            resizeFoto(req, async () => {
                let user = await db_1.default.query(`
                    SELECT * 
                    FROM acountUser
                    WHERE id = ${db_1.default.escape(req.params.id)}
                `);
                if (user[0].imagenPortada) {
                    try {
                        fs_1.default.unlinkSync(path_1.default.join(__dirname, `../public/${user[0].imagenPortada}`));
                    }
                    catch (err) { }
                }
                db_1.default.query(`UPDATE acountUser SET imagenPortada = "/uploads/images/${req.body.originalName}"
                            WHERE id = ${Number(req.params.id)}
                `)
                    .then(() => res.send(200));
            });
        }
    }
    else
        res.status(500).send("Not Authenticated");
});
const resizeFoto = (req, callb) => {
    let pathFormed = req.body.originalName;
    let dimensions = image_size_1.imageSize(path_1.default.join(__dirname, `../public/uploads/images/cp_${pathFormed}`));
    let redimentions;
    let cprutaArchivo = path_1.default.join(__dirname, `../public/uploads/images/cp_${pathFormed}`);
    let rutaArchivo = path_1.default.join(__dirname, `../public/uploads/images/${pathFormed}`);
    if (dimensions.width && dimensions.height) {
        dimensions.width == 0 ? 100 : dimensions.width;
        dimensions.height == 0 ? 100 : dimensions.height;
        redimentions = {
            width: ~~(dimensions.width * parseInt(req.body.crop.width) / 100),
            height: ~~(dimensions.height * parseInt(req.body.crop.height) / 100),
            left: ~~(dimensions.width * parseInt(req.body.crop.x) / 100),
            top: ~~(dimensions.height * parseInt(req.body.crop.y) / 100)
        };
        gm(cprutaArchivo)
            .crop(redimentions.width, redimentions.height, redimentions.left, redimentions.top)
            .write(rutaArchivo, (err) => {
            if (err)
                console.error(err);
            fs_1.default.unlinkSync(cprutaArchivo);
        });
        return callb();
    }
};
app.post('/login', async (req, res) => {
    let acount = await db_1.default.query(`
        SELECT * 
        FROM acountUser 
        WHERE userName = ${db_1.default.escape(req.body.userName)}
        && fechaAlta < now()
    `);
    let roles;
    (function (roles) {
        roles[roles["simple"] = 0] = "simple";
        roles[roles["premium"] = 1] = "premium";
        roles[roles["moderador"] = 2] = "moderador";
        roles[roles["admin"] = 3] = "admin";
    })(roles || (roles = {}));
    if (acount.length == 1 && compareHash(req.body.pass + "", acount[0].contrasenia)) {
        let token = createToken(acount[0]);
        return res.send({
            id: acount[0].id,
            razonSocial: acount[0].razonSocial,
            token: token,
            role: roles[acount[0].rol]
        });
    }
    else
        return res.status(403).send("no autorizado");
});
app.post('/registro', async (req, res) => {
    let claveValidacion = (Math.floor(Math.random() * (10000000000 - 1000000000)) + 1000000000).toString(36);
    let user = await db_1.default.query(`
        SELECT * 
        FROM acountUser 
        WHERE userName = ${db_1.default.escape(req.body.userName)}
        && fechaAlta < now()
    `);
    if (user.length == 0 && validator_1.default.isEmail(req.body.email) && req.body.pass.length >= 6 && req.body.userName.length >= 4) {
        let data = {
            userName: req.body.userName,
            razonSocial: req.body.razonSocial,
            email: req.body.email,
            contrasenia: genHash(req.body.pass + ""),
            fechaAlta: new Date(2999, 1, 1),
            fechaBaja: new Date(),
            fechaCreacion: new Date(),
            rol: 0,
            claveValidacion: claveValidacion
        };
        let user = await db_1.default.query(`
            INSERT INTO acountUser (${Object.keys(data).join(",")}) 
                        values ${db_1.default.escape(Object.values(data))}
        `);
        emails_1.default(data.email, "Confirmar cuenta de VALOR-AR", `
            <p>Gracias por formar parte de nuestro equipo!</p>
            <p>Para poder comenzar a usar la cuenta deberás validarla haciendo 
                <a href="${config_1.default.host}/api/acount/validar?user=${user.insertId}&clave=${data.claveValidacion}">
                    click acá
                </a>
            </p>
        `);
        return res.send(user);
    }
    else
        res.status(402).send("El email está en uso");
});
app.get("/validar", async (req, res) => {
    const user = req.query.user;
    const clave = req.query.clave;
    let userExist = await db_1.default.query(`
        SELECT * 
        FROM acountUser 
        WHERE id = ${db_1.default.escape(user)} && 
              claveValidacion = ${db_1.default.escape(clave)}
              && fechaAlta > now()
    `);
    if (userExist.length == 1) {
        await db_1.default.query(`
            UPDATE acountUser 
            SET claveValidacion = "",
                fechaAlta = ${db_1.default.escape(new Date())}
            WHERE id = ${db_1.default.escape(user)}
        `);
        return res.redirect("/#validado");
    }
    else
        return res.sendStatus(403).send("error");
});
app.post("/solicitarrecupero", async (req, res) => {
    let userName = req.query.userName;
    let user = await db_1.default.query(`
        SELECT * 
        FROM acountUser
        WHERE userName = ${db_1.default.escape(userName)}
        && fechaAlta < now()
    `);
    if (user.length) {
        const claveValidacion = (Math.floor(Math.random() * (10000000000 - 1000000000)) + 1000000000).toString(36);
        await db_1.default.query(`
            UPDATE acountUser 
            SET claveValidacion = ${db_1.default.escape(claveValidacion)} 
            WHERE id = ${db_1.default.escape(user[0].id)}
        `);
        emails_1.default(user[0].email, "Has solicitado el recupero de contraseña en VALOR-AR", `
            <h4>Para generar una nueva contraseña ingresá al siguiente 
            <a href="${config_1.default.host}/#rescuepass/${user[0].id}/${claveValidacion}">LINK</a>"
            </h4>
        `);
        let emailSplited = user[0].email.split("@");
        let email = emailSplited[0].slice(0, 2) + "*****@" + emailSplited[1];
        return res.send({ email });
    }
});
app.post("/cambiarclaverecupero", async (req, res) => {
    const userId = req.query.id;
    const claveValidacion = req.query.clave;
    const newPass = req.body.newPass;
    const user = await db_1.default.query(`
        SELECT id 
        FROM acountUser
        WHERE id = ${db_1.default.escape(userId)}
        && fechaAlta < now()
        && claveValidacion = ${db_1.default.escape(claveValidacion)}
    `);
    if (user.length) {
        await db_1.default.query(`
            UPDATE acountUser 
            SET claveValidacion = "",
            contrasenia = ${db_1.default.escape(genHash(newPass))}
            WHERE id = ${db_1.default.escape(userId)}
        `);
        return res.send("ok");
    }
    else
        return res.status(403);
});
app.post("/cambiarclave/:id", exports.isAuth.simple, async (req, res) => {
    const token = req.headers.authorization;
    let tokenString;
    if (token && req.body.pass.length >= 6) {
        tokenString = token.split(' ')[1];
        const payload = jwt_simple_1.default.decode(tokenString, config_1.default.apiKey);
        if (payload.sub == req.params.id || payload.role == 3) { // SI EL USUARIO SOLICITANTE ES EL PROPIETARIO DE ESTE PERFIL O SI ES ADMINISTRADOR
            // PUEDE EDITAR
            await db_1.default.query(`
                UPDATE acountUser 
                SET contrasenia = ${db_1.default.escape(genHash(req.body.pass))}
                WHERE id = ${db_1.default.escape(req.params.id)}
            `);
            return res.send("ok");
        }
    }
    else
        res.status(500).send("Not Authenticated");
});
function createToken(user) {
    const payload = {
        sub: user.id,
        role: user.rol,
        name: user.razonSocial,
        iat: moment_1.default().unix(),
        exp: moment_1.default().add(14, 'days').unix()
    };
    return jwt_simple_1.default.encode(payload, config_1.default.apiKey);
}
function genHash(rndString) {
    let salt = bcryptjs_1.default.genSaltSync(saltRounds);
    let hash = bcryptjs_1.default.hashSync(rndString, salt);
    return hash;
}
function compareHash(rndString, hash) {
    return bcryptjs_1.default.compareSync(rndString, hash);
}
exports.default = app;
//# sourceMappingURL=acount.js.map