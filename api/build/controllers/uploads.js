"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default.Router();
app.post("/portada", (req, res) => {
    return res.send("http://localhost:3000/logo.png");
});
exports.default = app;
//# sourceMappingURL=uploads.js.map