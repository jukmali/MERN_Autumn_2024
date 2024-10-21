const {response, request} = require("express");
var fs = require("fs");
require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");

// Let's take body-parser in use
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

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

app.get("/blog" , function(request, response) { 
    var data = {
        heading:"Blog Page",
        text:"This is a blog page"
    }
    response.render("pages/blog", data);
})

app.get("/shopping" , function(request, response) {
    var data = {
        heading:"Shopping List",
        listItems:["Milk", "Bread", "Butter", "Cheese"]
    }
    response.render("pages/shopping", data);
})

app.get("/studentpages", function(request, response) {
    response.status(200).send("SECRET PAGE");
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});