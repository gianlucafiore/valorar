
let config = {
    host:"https://valor-ar.com.ar",
    
    apiKey:"65465798asdas--podaw4234asd4asgh5h464asd-.",
    dbConn: {
        user:"sistema",
        password:"361224",
        host:"valor-ar.com.ar",
        database:"valorar",
        connectionLimit:5
    }
};

config = process.env.NODE_ENV === "development" ? 
{
    host:"http://localhost:5000",
    apiKey:"65465798asdas--podaw4234asd4asgh5h464asd-.",
    dbConn: {
        user:"gian",
        password:"124816",
        host:"localhost",
        database:"valorar",
        connectionLimit:5
    }
}: config

export default config;