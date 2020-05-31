"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const app = express_1.default.Router();
app.get("/", async (req, res) => {
    let terminos;
    if (typeof req.query.search == "string") {
        terminos = req.query.search.split(",").map(s => {
            return ` tags LIKE ${db_1.default.escape("%" + s.trim() + "%")} `;
        }).join("||");
        let perfiles = await db_1.default.query(`
            SELECT razonSocial, titulo, imagenPerfil, tipo
            FROM acountUser
            WHERE fechaAlta < NOW() && fechaBaja > NOW() &&
                ${terminos}
            
        `);
        return res.send(perfiles);
    }
});
exports.default = app;
//# sourceMappingURL=buscador.js.map