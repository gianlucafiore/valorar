"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mariadb_1 = __importDefault(require("mariadb"));
const config_1 = __importDefault(require("../config"));
exports.default = mariadb_1.default.createPool(config_1.default.dbConn);
//# sourceMappingURL=db.js.map