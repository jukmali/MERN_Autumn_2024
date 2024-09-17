var data = require('./persons.json');
var http = require("http");

// original data 
console.log("Original data");   
console.log(data);

// Add data to the end
data.push({
    index: 7,
    name: 'John Doe',
    address: '123 Main St',
    city: 'Springfield',
});

console.log("Data after adding new data");
console.log(data);

// Remove last data
data.pop();

console.log("Data after removing last data");
console.log(data);

var output;
output = '<table border="1">';

for (var i = 0; i < data.length; i++) {
    output += '<tr>';
    output += '<td>' + data[i].name + '</td>';
    output += '<td>' + data[i].company + '</td>';
    output += '<td>' + data[i].address + '</td>';
    output += '</tr>';
}
output += '</table>';

console.log(output);

var server = http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type': 'text/html'});
    response.write(output);
    response.end();
});

var port = process.env.PORT || 3000;
server.listen(port);

console.log('Server running at http://3000/');