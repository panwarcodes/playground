const fs = require('node:fs');

fs.readFile('./01_fs.stat.js', 'utf-8', (err, data) => {
    if (err) {
        console.error(err);
    }
    else {
        console.log(data);
    }
});

// All three of fs.readFile(), fs.readFileSync() and fsPromises.readFile() 
// read the full content of the file in memory before returning the data.


// use stream example https://nodejs.org/learn/manipulating-files/writing-files-with-nodejs
// for massive file readings, it is extremely memory efficient