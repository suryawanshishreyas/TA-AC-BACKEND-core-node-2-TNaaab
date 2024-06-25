// 1
const path = require('path');

const relativePath = path.relative(__dirname, path.join(__dirname,'projects','client','index.js'));
console.log('Relative Path:',relativePath);

const absolutePath = path.resolve(__dirname,'..','client','index.js');
console.log('Absolute Path:',absolutePath);

// 2
var http = require('http');
var fs = require('fs');
const querystring = require('querystring');

var port = 5678;

const server = http.createServer((req,res)=>{
    if(req.method === 'GET' && req.url === '/form'){
        const filePath = path.join(__dirname, 'form.html');
        fs.readFile(filePath, (err,data)=>{
            if(err){
                res.writeHead(500,{'Content-type':'text/plain'});
                res.end('Internal Server Error');
            }else{
                res.writeHead(200,{'Content-type':'text/html'});
                res.end(data);
            }
        });
    }else if(req.method === 'POST' && req.url === '/form'){
        let store = '';
        req.on('data',(chunk)=>{
            store +=chunk.toString();
        });
        req.on('end',()=>{
            const parsedData = querystring.parse(store);

            res.writeHead(200,{'Content-type':'text/html'});
            res.end(`
                <html>
                <head><title>Form Submission</title></head>
                <body>
                    <h1>Form Data Submitted</h1>
                    <p>Name: ${parsedData.name}</p>
                    <p>Email: ${parsedData.email}</p>
                    <p>Age: ${parsedData.age}</p>
                </body>
                </html>
                `);
        });
    }else{
        res.writeHead(404,{'Content-type':'text/plain'});
        res.end('Not Found');
    }
});

server.listen(port,()=>{
    console.log(`Server is listening on http://localhost:${port}`);
})