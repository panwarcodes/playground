// extracts the argv property from process module of node
const { argv } = require('node:process');

// argv property just stores the commands and its arguments ran 
// in an array at the time script was run and arguements given
// useful when making cli based apps, just use switch case 
// there to handle indices as the actual arguements of the program
// stated as to use
// real usage inside: cli-notes-app directory


argv.forEach((val, index) => {
    console.log(`Index: ${index}, Value: ${val}`);
});

