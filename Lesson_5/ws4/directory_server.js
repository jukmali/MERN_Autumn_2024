var express = require("express");
var app = express();
var fs = require("fs");
// app.use(express.static("./public/demosite"));
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/adduser", function(request, response) {
    response.status(200).sendFile(__dirname + "/public/adduser.html");
});

app.post("/adduser", function(request, response) { 
    var data = request.body.name + "\n";  
    data += request.body.email + "\n";
    data += request.body.company + "\n";

    console.log(data);
    response.status(200).send("Data received: " + data);
});

app.get("/", function(request, response) {  
    response.status(200).sendFile(__dirname + "/public/index.html");
});

app.get("/list", function(request, response) {  
    response.status(200).sendFile(__dirname + "/exampledata.txt");
});

app.get("/add", function(request, response) {  
    var data = require("./exampledata2.json");

    // Create a new object to add to the data array
    data.push({
        Name: "Jukka Malinen",
        Company: "Laurea",
        Email: "jukka.malinen@laurea.fi",
        Date: new Date()  
    });

    // Convert the JSON object to a string format
    var jsonStr = JSON.stringify(data);

    // Write data to a file
    fs.writeFile("exampledata2.json", jsonStr, err => {
        if (err) throw err;
        console.log("It's saved!");
    });
    response.status(200).send("Data added to the file. Browse to the /details to see the contents of the file");
});

app.get("/jsondata", function(request, response) {  
    response.status(200).sendFile(__dirname + "/exampledata2.json");
});

app.get("/details", function(request, response) {  
    var data = require("./exampledata2.json");

    var results = "<table border='1'>";
    for(var i=0; i<data.length; i++){
        results += "<tr>";
        results += "<td>" + data[i].Name + "</td>";
        results += "<td>" + data[i].Email + "</td>";
        results += "</tr>";
    }
    results += "</table>";
    response.status(200).send(results);
}); 

// The 404 Route (ALWAYS Keep this as the last route)
app.get("/*", function(request, response) {  
    response.send("Sorry, this is an invalid URL.", 404);
});

app.listen(3000, function() {   
    console.log("Server is running on port 3000");
});