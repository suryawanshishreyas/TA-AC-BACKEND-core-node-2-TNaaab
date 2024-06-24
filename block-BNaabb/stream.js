var http = require('http');

var server = http.createServer((req,res)=>{
    var store = '';
    req.on('data', (chunk)=>{
        store = store + chunk;
    })
    req.on('end', ()=>{
        console.log(store);
    })
    res.write(store);
})

server.listen(2345,()=>{
    console.log(`Server is listening on port http://localhost:2345`);
})