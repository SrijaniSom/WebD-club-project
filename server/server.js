const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const ejs = require('ejs');

app.set('view engine', 'ejs');

dotenv.config({ path: "config.env" });

require("./db/connection");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// loading static assets
app.use('/css',express.static(path.resolve(__dirname ,"../public/css" )))
app.use('/images',express.static(path.resolve(__dirname ,"../public/images" )))
app.use('/js',express.static(path.resolve(__dirname ,"../public/js" )))



// we link the router files to make our route easy
const auth = require("./router/auth");

app
    .get('/' , (req,res) => {
        res.sendFile(path.join(__dirname+'../../public/html/index.html'))})
    .get('/register', auth)
    .post('/studentlogin' , auth)
    .get('/feedback' , auth)
    .post('/addfaculty', auth)

    const PORT =4000;

app.listen(PORT, () => {
  console.log(`server is runnig at port no ${PORT}`);
});
