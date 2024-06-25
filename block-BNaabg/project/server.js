var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var port = 3000;
var path = require('path');

const sendResponse = (res, statusCode, data) => {
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(data));
};

// Create the server
const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/users') {
        // Create a user
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const user = JSON.parse(body);
            const filePath = path.join(__dirname, 'users', `${user.username}.json`);

            fs.open(filePath, 'wx', (err, fd) => {
                if (err) {
                    if (err.code === 'EEXIST') {
                        return sendResponse(res, 409, { message: 'User already exists' });
                    }
                    return sendResponse(res, 500, { message: 'Internal Server Error' });
                }

                fs.writeFile(fd, JSON.stringify(user), err => {
                    if (err) {
                        return sendResponse(res, 500, { message: 'Internal Server Error' });
                    }

                    fs.close(fd, err => {
                        if (err) {
                            return sendResponse(res, 500, { message: 'Internal Server Error' });
                        }

                        sendResponse(res, 201, { message: 'User created' });
                    });
                });
            });
        });