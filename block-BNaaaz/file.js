var http = require('http');
var fs = require('fs');

const server = http.createServer((req,res)=>{
    res.setHeader('Content-type','text/plain');
    fs.createReadStream('./readme.txt').pipe(res);

})

server.listen(3000,()=>{
    console.log(`Server is listening on http://localhost:3000`);
})