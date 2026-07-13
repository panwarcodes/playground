const fs = require('node:fs');
const readline = require('readline');

// this script reads line using streams to reduce high memory usage
// on bigger files

async function processFileByLine() {
    // creates a readable stream from the target file
    const fileStream = fs.createReadStream('./06_logs.txt'); // file path
    
    const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let infoCount = 0;
    let warningCount = 0;
    let errorCount = 0;
    let totalCount = 0;

    for await (const line of rl) {
        if (line.includes('INFO')) {
            infoCount = infoCount + 1;
        }
        else if (line.includes('WARNING')) {
            warningCount = warningCount + 1;
        }
        else {
            errorCount = errorCount + 1;
        }

        // total line count updater
        totalCount = totalCount + 1;
    }

    console.log(`
        ======= Log Analysis ======
        
        Total Lines: ${totalCount}
        
        INFO: ${infoCount}
        WARNING: ${warningCount}
        ERROR: ${errorCount}
        `);
}

processFileByLine().catch(console.error);