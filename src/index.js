
const express  = require("express");

const app = express();

const route = require("./routes/api/v1/index");
const connectDb = require("./db/mogoosdb");

app.use("/api/v1", route);

connectDb();

app.listen(3000,()=>{
    console.log("serever created 3000");
})