## Logs Analyzer

Just another simple project to better understand and know the 'why' of fs.createReadStream() method,


I learned that this method is memory efficient and is a better way of managing bigger files as readFile method loads up the whole file before showing it, this method utilises streams and reads small chunks per for loop iteration.