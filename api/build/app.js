"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const acount_1 = __importDefault(require("./controllers/acount"));
const cors_1 = __importDefault(require("cors"));
const uploads_1 = __importDefault(require("./controllers/uploads"));
const path_1 = __importDefault(require("path"));
const curriculum_1 = __importDefault(require("./controllers/curriculum"));
const buscador_1 = __importDefault(require("./controllers/buscador"));
const app = express_1.default();
app.use(express_1.default.json());
app.use(cors_1.default());
app.use(express_1.default.static(path_1.default.join(__dirname, "/public")));
app.use("/api/acount", acount_1.default);
app.use("/api/upload", uploads_1.default);
app.use("/api/curriculum", curriculum_1.default);
app.use("/api/buscador", buscador_1.default);
app.listen(5000, () => console.log("on port 5000"));
//# sourceMappingURL=app.js.map