
const express  = require("express");
const app = express();
const route = require("./routes/api/v1/index");
const connectDb = require("./db/mogoosdb");
var cors = require("cors");

app.use(cors())
app.use(express.json());
app.use("/api/v1", route);

connectDb();

app.listen(6000,()=>{
    console.log("serever created 6000");
})
