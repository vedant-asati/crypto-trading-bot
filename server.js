const mongoose = require('mongoose');
const next = require('next');
const dotenv = require('dotenv');

const dev = process.env.NODE_ENV != "production";
const nextServer = next({ dev });
const handle = nextServer.getRequestHandler();

dotenv.config({ path: "./config.env" });
const app = require("./app");

// DB connection
const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
}).then(()=>{
    console.log("JSR! DB connected.")
});

const port =3000;

nextServer.prepare().then(()=>{
    // backend
    app.get('*',(req,res)=>{
        return handle(req,res);
    });
    // frontend
    app.listen(port,()=>{
        console.log("JSR! App listening on port: ",port);
    });
});
