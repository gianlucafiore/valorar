"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
let config = {
    host: "http://valor-ar.com.ar:5000",
    apiKey: "65465798asdas--podaw4234asd4asgh5h464asd-.",
    dbConn: {
        user: "sistema",
        password: "361224",
        host: "localhost",
        database: "valorar",
        connectionLimit: 5
    }
};
config = process.env.NODE_ENV === "development" ?
    {
        host: "http://localhost:5000",
        apiKey: "65465798asdas--podaw4234asd4asgh5h464asd-.",
        dbConn: {
            user: "gian",
            password: "124816",
            host: "localhost",
            database: "valorar",
            connectionLimit: 5
        }
    } : config;
exports.default = config;
//# sourceMappingURL=config.js.map