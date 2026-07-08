const path = require('node:path');
const fs = require('node:fs')

const filePath = './http.createServer.js';

const fileNameWithExt = path.basename(filePath);
const dirName = path.dirname(filePath);
const extName = path.extname(filePath);

console.log(fileNameWithExt, dirName, extName);

const fileNameNoExt = path.basename(filePath, path.extname(filePath));
console.log(fileNameNoExt);

// you can join two or more parts of path easily
const name = "gigaChad";
const joinedPath = path.join('/', 'user', name, 'id');
console.log(joinedPath);

// NOTE: Neither resolve nor normalize will check if the path exists. 
// They just calculate a path based on the information they got. 
// SO YOU MUST check if a file path exists or not using stat method
// NOTE 2: .resolve will give you relative answer, it depends on from where you ran the script
// for example, you must cd in the folder to run script else use 
// path.resolve(__dirname, 'joe.txt'); for consistent answer
// two dots mean go 2 level above and then browse files in that folder
// 1 dot mean go 1 level above, and always start with ./ mean current directory
// then use 1 or 2 dots to go above the current directory


let resolvedPath = path.resolve('path.module.js'); 
// C:\Users\username\coding\playground\nodejs-projects\node js concepts\path.module.js
console.log(resolvedPath);


resolvedPath = path.resolve('tmp','path.module.js'); 
// C:\Users\username\coding\playground\nodejs-projects\node js concepts\tmp\path.module.js
// C:\Users\Nishchey\coding\playground\nodejs-projects\path.module.js if executed from outside of the folder remotely
console.log(resolvedPath);

resolvedPath = path.resolve('/etc','path.module.js'); 
// C:\etc\path.module.js
console.log(resolvedPath);

const normalizedPath = path.normalize('././README.md');
console.log(normalizedPath);

// now we can actually check that file's stat by 
// using just the normalizedPath variable and stat method of fs
// this works for me cause README.md file actually exists

fs.stat(normalizedPath, (err, stats) => {
    if (err) {
        console.error(err);
    }
    else {
        console.log(stats);
    }
});