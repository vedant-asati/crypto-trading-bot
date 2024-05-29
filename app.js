const express = require('express')
const cors = require('cors')
const userRouter = require('./Api/Routers/userRouter')


const app = express();
app.use(express.json({ limit: "100kb" }))

app.use(cors())
app.options('*', cors());

app.use('/api/v1/user', userRouter);

module.exports = app;