const {response, request} = require("express");
var fs = require("fs");
require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// Let's take body-parser in use
app.use(bodyParser.urlencoded({extended: true}));

// Let's take material from public folder
app.use(express.static("./public"));

app.post("/signin", function(request, response) {
    var email = request.body.email;
    var pass = request.body.pass;

    console.log("Email: " + email);
    console.log("Password: " + pass);

    if(email == process.env.USERID && pass == process.env.PASSWORD) {
        response.redirect("/studentpages");
    } else {
        response.status(200).send("Form submitted with email: " + email + " and password: " + pass);    
    }
});

app.get("/studentpages", function(request, response) {
    response.status(200).send("SECRET PAGE");
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});