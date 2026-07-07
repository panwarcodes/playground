// so this returns stats project if the file actually exists
// example file exists:
// Stats {
//   dev: 2489803594,
//   mode: 33206,
//   nlink: 1,
//   uid: 0,
//   gid: 0,
//   rdev: 0,
//   blksize: 4096,
//   ino: 62768919806632250, // basically inode or index number which os assigns to this file
//   size: 1036,
//   blocks: 8,
//   atimeMs: 1783236340175.5964,
//   mtimeMs: 1783236339809.5405,
//   ctimeMs: 1783236339809.5405,
//   birthtimeMs: 1782040025704.483
// }
// and if file don't exist:
// [Error: ENOENT: no such file or directory, stat 'non existent file path which you entered above is provided here'] {
//   errno: -4058,
//   code: 'ENOENT',
//   syscall: 'stat',
//   path: 'C:\\Users\\Nishchey\\coding\\playground\\nodejs-projects\\node js concepts\\http.createServe.js'
// }


const fs = require('node:fs');

fs.stat('./http.c`reateServe.js', (err, stats) => {
    if (err) {
        console.error(err);
        return; // optional shyt but very important
    }
    else {
        console.log(stats);
    }
});


// fs apparently provides, several other methods like 
//   stats.isFile(); // true
//   stats.isDirectory(); // false
//   stats.isSymbolicLink(); // false
//   console.log(stats.size); // 1024000 //= 1MB


// statsync method blocks the thread until stats of a file arrives 
// try {
//     const stats = fs.statSync('./http.createServer.js');
//     console.log(stats);
// }
// catch (err) {
//     console.error(err);
// }