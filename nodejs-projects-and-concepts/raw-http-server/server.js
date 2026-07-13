const http = require('node:http');
const fs = require('node:fs');
const query = require('querystring');

const filePath = './users.json';

// checking whether filePath contains actual file
if (fs.existsSync(filePath)) {
}
// creating new file if not found
else {
    try {
        fs.writeFileSync(filePath, '[]');
    }
    catch (error) {
        console.error(error);
    }
}

const server = http.createServer((req, res) => {
    

    const url = req.url;

    if (url === '/' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('Hi, how are you anata ~ >.< ~ ? <br>');
        res.write(`How to add and delete users? send POST and DELETE requests to '/users?user=your_name'`);
        res.end();
    }

    else if (url === '/users' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/json' });
        const readUsers = fs.readFileSync(filePath, "utf-8");
        res.write(readUsers);
        res.end();
    }

    else if (url.includes("?") && req.method === 'POST') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        const username = url.slice(11);

        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const parsedContent = JSON.parse(fileContent);
        parsedContent.push(username);

        fs.writeFileSync(filePath, JSON.stringify(parsedContent, null, 2));
        res.write('User added bro!');
        res.end();
    }

    else if (url.includes("?") && req.method === 'DELETE') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        const username = url.slice(11);

        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const parsedContent = JSON.parse(fileContent);
        const index = parsedContent.indexOf(username);
        
        if (index !== -1) {
            parsedContent.splice(index, 1);
        }

        fs.writeFileSync(filePath, JSON.stringify(parsedContent, null, 2));
        res.write('User deleted bro!');
        res.end();
    }

    else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.write(`Request method ${req.method} is not supported in this url.`);
        res.end();
    }
});


server.listen(3000, () => {
    console.log('Anata ~ The server is rockin! >.<');
});