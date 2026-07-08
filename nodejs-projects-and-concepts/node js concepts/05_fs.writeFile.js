const fs = require('node:fs');

const content = "some text";

// by default code below will overwrite the content 
// of already existing file
// btw writeFile is asynchronous you can use sync method instead
// to block the thread until data is written

fs.writeFile('./05_fs.writeFile.txt', content, (err) => {
    if (err) {
        console.error(err);
    }
});

// By default, this API will replace the contents of the file if it does already exist.
// You can modify the default by specifying a flag:
// fs.writeFile('/Users/joe/test.txt', content, { flag: 'a+' <-- this bro }, err => {});
// a+ flag writes/positions the stream at the end
// or you can fs.appendFile() and fs.appendFileSync()

//append file example
const fs = require('node:fs');

const content = "HOHO!";

fs.appendFile('./someFile.txt', content, err => {
    if (err) {
        console.error(err);
    }
    // appending done!
});