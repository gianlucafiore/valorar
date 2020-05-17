"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const acount_1 = __importDefault(require("./controllers/acount"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use("/api/acount", acount_1.default);
app.listen(5000, () => console.log("on port 5000"));
//# sourceMappingURL=app.js.map