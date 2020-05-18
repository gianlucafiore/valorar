"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const moment_1 = __importDefault(require("moment"));
const config_1 = __importDefault(require("../config"));
const db_1 = __importDefault(require("./db"));
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
app.get('/profile/:id', exports.isAuth.simple, async (req, res) => {
    const token = req.headers.authorization;
    let tokenString;
    if (token) {
        tokenString = token.split(' ')[1];
        const payload = jwt_simple_1.default.decode(tokenString, config_1.default.apiKey);
        let user = await db_1.default.query(`SELECT * FROM acountUser WHERE id = ${Number(req.params.id)}`);
        if (payload.sub == req.params.id || payload.role == 3) {
            // PUEDE EDITAR
            user[0].canEdit = true;
        }
        return res.status(200).send(user[0]);
    }
    else
        res.status(500).send("Not Authenticated");
});
app.post('/login', async (req, res) => {
    console.log(req.body.email);
    let acount = await db_1.default.query(`SELECT * FROM acountUser WHERE email = ${db_1.default.escape(req.body.email)}`);
    if (acount.length == 1 && compareHash(req.body.pass + "", acount[0].contrasenia)) {
        let token = createToken(acount[0]);
        return res.send({
            id: acount[0].id,
            razonSocial: acount[0].razonSocial,
            token: token
        });
    }
    else
        return res.status(403).send("no autorizado");
});
app.post('/registro', async (req, res) => {
    let user = await db_1.default.query(`SELECT * FROM acountUser WHERE email = ${db_1.default.escape(req.body.email)}`);
    if (user.length == 0 && req.body.email.includes("@")) {
        let data = {
            razonSocial: req.body.razonSocial,
            email: req.body.email,
            contrasenia: genHash(req.body.pass + ""),
            fechaAlta: new Date(),
            fechaBaja: '29990101',
            fechaCreacion: new Date(),
            rol: 0
        };
        let user = await db_1.default.query(`
            INSERT INTO acountUser (${Object.keys(data).join(",")}) 
                        values ${db_1.default.escape(Object.values(data))}
        `);
        return res.send(user);
    }
    else
        res.status(402).send("El email está en uso");
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