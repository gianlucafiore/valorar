let config = {};

config = process.env.NODE_ENV === "production" ?
    {
        url:""
    }
    :
    {
        url:"http://localhost:5000"
    }

export default config;
