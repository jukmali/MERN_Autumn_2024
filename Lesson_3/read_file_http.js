var https = require('https');

var options = {
    hostname: 'www.omdbapi.com',
    // port: 443,
    path:'/?s=star+wars&apikey=cbbc6750',
    method: 'GET'
}

const req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
    var data = '';
    res.on('data', chunck => {
        data += chunck;
        process.stdout.write(chunck);
    });
    res.on('end', () => {
        jsData = JSON.parse(data);
        console.log(jsData);
    }); 
});

req.on('error', (e) => {
    console.error(e);
});

req.end();