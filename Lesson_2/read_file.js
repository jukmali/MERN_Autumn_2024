var fs = require('fs');

console.log("Going to read the file");
var data = fs.readFileSync('example.txt');

console.log(data.toString());

console.log("Program Ended");