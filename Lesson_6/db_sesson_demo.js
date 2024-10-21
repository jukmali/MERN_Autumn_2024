const {response, request} = require("express");
var fs = require("fs");
require("dotenv").config();
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mysql = require("mysql");
var session = require("express-session");

// Let's take body-parser in use
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

// Let's take material from public folder
app.use(express.static("./public"));

app.use(session({  
    name: "session_demo",
    resave: true,
    saveUninitialized: true,
    secret: "secretkey",
    SameSite: "Lax",
    //How long this session will be valid in milliseconds
    cookie: {maxAge: 60 * 1000 * 30 } //30 minutes
}));


app.post("/signin" , function(request,response){
    // POST
    // Define connection parameters
    var con = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"logindemo",
    });
    var email = request.body.email;
    var pass = request.body.pass;
    console.log(email);
    console.log(pass);

    

    // Create query to database
    var query = `SELECT * FROM users WHERE userid ='${email}' and password='${pass}';`;
    console.log(query);
    
    // Create the connection to database
    con.connect(function(err){
        if(err) throw err;
        con.query(query,function(err,result,fields){
            if(err) console.log("Error in DB connection!" + err);
            else{
                console.log("Rows from query: " + result.length);
                if(result.length == 1){
                    // We save the session data here
                    request.session.loggedin = true;
                    request.session.email = email;
                    console.log("Successful connection!");
                    response.send("SUCCESS");
                    // response.render("./pages/index");
                    //response.redirect("studentpages");
                } else {
                    console.log("Wrong userid or password");
                    response.send("Wrong userid or password");

                }
            };
        
         });
    });

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

app.get("/studentpages", function(request, response){
    if(request.session.loggedin == true){
        var data  = {
            email: request.session.email,
        };
        console.log("Session connection");
        
        response.render("./pages/student",data);
        // response.send("You " + request.session.email + " are now in the secret STUDENT PAGE!");
    } else {
        response.redirect("./form.html");
    }
});

app.get("/logout", function(request,response){
    request.session.destroy(function(err){
        console.log("Session is destroyed");
        response.send("Session is closed");
    });
});

app.listen(3000, function() {
    console.log("Server is running on port 3000");
});