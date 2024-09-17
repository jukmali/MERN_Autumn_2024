var fs = require('fs');

var file = './write.txt';
fs.unlink(file, function(err){
    if(err) throw err;
    console.log("File deleted successfully");
});