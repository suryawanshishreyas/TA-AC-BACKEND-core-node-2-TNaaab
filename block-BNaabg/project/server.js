var http = require('http');
var fs = require('fs');
var url = require('url');
const { parse } = require('path');

var usersPath= __dirname + '/users/';
var server = http.createServer(handleRequest);

function handleRequest(req,res){
    var parsedUrl = url.parse(req.url, true);

    var store = '';
    req.on('data',(chunk)=>{
        store+=chunk;
    });
    req.on('end',()=>{
        // all routes here
        if(req.url === '/users' && req.method === 'POST'){
            var username = JSON.parse(store).username;
            fs.open(usersPath + username + '.json','wx', (err,fd)=>{
                if(err) return console.log(err);
                fs.writeFile(fd, store, (err)=>{
                    if(err) return console.log(err);
                    fs.close(fd,()=>{
                        return res.end(`${username} created successfully`);
                    });
                })
            })
        }
        if(req.method === 'GET' && parsedUrl.pathname ==='/users'){
            var username = parsedUrl.query.username;
            fs.readFile(usersPath + username + '.json', (err, content)=>{
                if(err) return console.log(err);
                res.setHeader('content-type','application/json');
                return res.end(content);
            })
        }
        if(parsedUrl.pathname === '/users' && req.method === 'PUT'){
            var username = parsedUrl.query.username;
            fs.open(usersPath + username + '.json', 'r+',(err, fd)=>{
                if(err) return console.log(err);
                fs.ftruncate(fd, (err)=>{
                    if(err) return console.log(err);
                    fs.writeFile(fd, store, (err)=>{
                        if(err) return console.log(err);
                        fs.close(fd, ()=>{
                            return res.end(`${username} updated successfully`);
                        })
                    })
                })
            })
        }
        if(parsedUrl.pathname === '/users' && req.method === 'DELETE'){
            var username = parsedUrl.query.username;
            fs.unlink(usersPath + username + '.json', (err)=>{
                if(err) return console.log(err);
                return res.end(`${username} is deleted`);
            })
        }
        res.statusCode = 404;
        res.end('Page Not Found');
    })
}

server.listen(3000,()=>{
    console.log(`Server is listening on port 3000`);
})