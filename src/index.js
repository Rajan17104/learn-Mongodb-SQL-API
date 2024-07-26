
const express  = require("express");
const app = express();
const route = require("./routes/api/v1/index");
const connectDb = require("./db/mogoosdb");
var cors = require("cors");
var cookieParser = require('cookie-parser');
const googleLoginProvider = require("./utils/provider");

app.use(cors())
app.use(cookieParser())
app.use(express.json());
app.use(require('express-session')({ secret: 'QWERTYUIOP', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/v1", route);

connectDb();

googleLoginProvider()

app.listen(9000,()=>{
    console.log("serever created 9000");
})
