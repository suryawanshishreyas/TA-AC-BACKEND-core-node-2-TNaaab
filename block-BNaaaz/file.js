var http = require('http');
var fs = require('fs');

const server = http.createServer((req,res)=>{
    if(req.method === 'GET' && req.url === '/'){
        res.setHeader('Content-type','text/plain');
        fs.readFile('./readme.txt',(err,content)=>{
            if(err) console.log(err);
            res.end(content);
        })
    }
})

server.listen(3000,()=>{
    console.log(`Server is listening on http://localhost:3000`);
})