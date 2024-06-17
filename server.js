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
console.log(process.env.DATABASE);
console.log(typeof (process.env.DATABASE));
console.log(process.env.DATABASE_PASSWORD);
console.log(typeof (process.env.DATABASE_PASSWORD));
console.log("Mongo Connection string: ", DB);
// mongoose.connect(DB, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: true,
// }).then((a) => {
//     console.log("JSR! DB connected. ", a)
// }).catch((err) => console.log("JSR! DB not connected. ", err));

const port = 3000;

nextServer.prepare().then(() => {
    // backend
    app.get('*', (req, res) => {
        return handle(req, res);
    });
    // frontend
    app.listen(port, () => {
        console.log("JSR! App listening on port: ", port);
    });
});
