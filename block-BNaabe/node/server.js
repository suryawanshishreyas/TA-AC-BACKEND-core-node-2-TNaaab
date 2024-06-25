// 1
const path = require('path');
const relativePath = '/index.html';
const absolutePath = __dirname;
const formPath = path.join(absolutePath + relativePath);
console.log(formPath);



var absolutePath2 = __dirname;
console.log(absolutePath2 + '/server.js');
var appAbsPath = '/app.js';
apprelPath=path.join(absolutePath2 + appAbsPath);
console.log(apprelPath);
absIndexPath = path.join(absolutePath2 + '/index.html');
console.log(absIndexPath);

// 2
var http = require('http');

const server = http.createServer((req,res)=>{
    res.setHeader('Content-type','application/json');
    if(req.method === 'POST' && req.url === '/'){
        let data= '';
        req.on('data',(chunk)=>{
            data+=chunk;
        })
        req.on('end',()=>{
            console.log('POST Data:',data);
            res.end('Data Received');
        })
    }
})

const port = 3000;
server.listen(port,()=>{
    console.log(`Server is listening to http://localhost:${port}`);
})

// 3
const port2 = 9000;
const server2 = http.createServer((req,res)=>{
    var dataFormat = req.headers['content-type'];
    var store = '';
    req.on('data',(chunk)=>{
        store+=chunk;
    })
    req.on('end',()=>{
        console.log(store);
        console.log(dataFormat);
    })
})

server2.listen(port2,()=>{
    console.log(`Server is listening on http://localhost:${port2}`);
})

// 4
const port3 = 8000;
const server3 = http.createServer((req,res)=>{
    if(req.method === 'POST' && req.url==='/'){
        var store = '';
        req.on('data',(chunk)=>{
        store+=chunk;
    })
        req.on('end',()=>{
            console.log(store);
            res.end(store);
    })
}
})

server3.listen(port3,()=>{
    console.log(`Server is listening on http://localhost:${port3}`);
})