// importing required ingredients
const fs = require('node:fs');
const path = require('node:path');
const { argv } = require('node:process');

// notes storage file path
const filePath = './tasks.json';

// checking if notes file exists
if (fs.existsSync(filePath)) {
}
// creating new file if not found
else {
    try {
        fs.writeFileSync(filePath, "");
    }
    catch (error) {
        console.error(error);
    }
}

// getting argv index's value from index 2 
// to infinite in a separate array
const args = argv.slice(2);

// command and content variables
const command = args[0];
const content = args[1];

// storing filePath value inside a variable
const fileContent = fs.readFileSync(filePath, 'utf-8');



switch (command) {

    case 'help':
        console.log(`
            add - usage: add <enter note here>\n
            list - list note storage\n
            delete - usage: delete <enter index of note>\n`);
        break;

    case 'add':
        noteHandler(command, content)
        break;

    case 'delete':
        noteHandler(command, content);
        break;

    case 'list':
        noteHandler(command);
        break;

    default:
        console.log("Argument not supported, type 'node app.js help' for help!");
}

function noteHandler(command, content) {
    if (command === "add") {
        if (fileContent.length === 0) {
            noteAdder(content, "emptyFile");
            return;
        }
        if (fileContent.length > 0) {
            noteAdder(content, "contentDetected");
            return;
        }
    }

    if (command === "delete") {
        noteDel(content);
        return;
    }

    if (command === "list") {
        const contentArray = JSON.parse(fileContent);
        contentArray.forEach((value, index) => {
            console.log(index + 1, value.text);
        });
        return;
    }
}

function noteAdder(content, condition) {
    if (condition === "emptyFile") {
        const appendArray = [{
            "id": 1,
            "text": content
        }];

        // if contentFile != filePath, it will gen new tasks.json
        fs.writeFile(filePath, JSON.stringify(appendArray, null, 2), err => {
            if (err) {
                console.error(err);
            }
        });
    }
    // if content detected
    else {
        const contentArray = JSON.parse(fileContent);
        const appendArray = {
            "id": contentArray.length + 1,
            "text": content
        };
        contentArray.push(appendArray);
        fs.writeFile(filePath, JSON.stringify(contentArray, null, 2), err => {
            if (err) {
                console.error(err);
            }
        })
        console.log("Item added successfully!")
    }
}

function noteDel(content) {
    if (fileContent.length === 0 || content === undefined) {
        console.log("Action not allowed!");
        return;
    }

    else if (fileContent.length > 0) {
        const fileContentNew = fs.readFileSync(filePath, 'utf8');
        const contentArray = JSON.parse(fileContentNew);
        contentArray.splice(content - 1, 1);
        fs.writeFileSync(filePath, JSON.stringify(contentArray, null, 2), err => {
            if (err) {
                console.error(err);
            }
            else {
                console.log('Item deleted successfully!');
            }
        });
        return;
    }
}