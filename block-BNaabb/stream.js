var http = require('http');

var server = http.createServer((req,res)=>{
    var store = '';
    req.on('data', (chunk)=>{
        store = store + chunk;
    })
    req.on('end', ()=>{
        res.write(store);
        res.end();
    })
    
})

server.listen(2345,()=>{
    console.log(`Server is listening on port http://localhost:2345`);
})