var http = require('http');
var qs = require('querystring');

const server = http.createServer((req,res)=>{
    var dataFormat = req.headers['content-type'];
    var store ='';
    req.on('data', (chunk)=>{
        store = store + chunk;
    })
    req.on('end', ()=>{
        if(dataFormat === 'application/json'){
            var parsedData = JSON.parse(store);
            res.end(store);
        }
        if(dataFormat === 'application/x-www-form-urlencoded'){
            var parsedData = qs.parse(store);
            console.log(JSON.stringify(parsedData));
            res.end(JSON.stringify(parsedData));
        }
    })
})

server.listen(7000, ()=>{
    console.log(`Server listening on http://localhost:7000`);
})