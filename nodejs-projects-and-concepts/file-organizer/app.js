import fs from 'node:fs';
import path from 'node:path';

// the only part where I used AI
const fileCategories = [
  { "Images": [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg", ".bmp", ".tiff", ".ico", ".heic", ".raw"] },
  { "Videos": [".mp4", ".mkv", ".avi", ".mov", ".wmv", ".flv", ".webm", ".m4v", ".3gp"] },
  { "Audio": [".mp3", ".wav", ".flac", ".m4a", ".aac", ".ogg", ".wma", ".opus", ".mid", ".midi"] },
  { "Documents": [".pdf", ".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".odt", ".ods", ".odp", ".rtf", ".txt", ".pages", ".numbers", ".key"] },
  { "Code & Programming": [".html", ".css", ".js", ".jsx", ".ts", ".tsx", ".json", ".py", ".rb", ".php", ".java", ".c", ".cpp", ".cs", ".go", ".rs", ".sh", ".bat", ".sql", ".yaml", ".yml", ".xml", ".md"] },
  { "Archives & Compressed": [".zip", ".rar", ".7z", ".tar", ".gz", ".bz2", ".iso", ".dmg", ".pkg"] },
  { "Executables & Installers": [".exe", ".msi", ".apk", ".app", ".bat", ".cmd", ".bin"] },
  { "Data & Databases": [".csv", ".tsv", ".sql", ".db", ".sqlite", ".mdb", ".accdb"] },
  { "Fonts": [".ttf", ".otf", ".woff", ".woff2", ".eot"] },
  { "E-Books": [".epub", ".mobi", ".azw3", ".djvu", ".fb2"] },
  { "Design & 3D": [".psd", ".ai", ".xd", ".fig", ".sketch", ".blend", ".obj", ".fbx", ".stl", ".dwg"] },
  { "System & Configuration": [".ini", ".conf", ".cfg", ".env", ".sys", ".dll", ".log", ".bak"] }
];

const unorgFolderPath = './unorganised-folder/';

// getting file's name one by one includes
// directories and file's extension with them
fs.readdirSync(unorgFolderPath).forEach(fileName => {
    fileCategoryFinder(fileName);
});

// find file's type
function fileCategoryFinder(fileName) {

    // looping fileCategories's indexes
    for (let i = 0; i < fileCategories.length; i++) {

        // looping those index's key and values
        for (const [fileCategory, extensionList] of Object.entries(fileCategories[i])) {

            // looping through extensionList
            for (const fileExtension of extensionList) {

                // checking if file includes fileExtension
                if (path.extname(fileName) === fileExtension) {

                    // send detected file's category
                    categoryPathMaker(fileName, fileCategory);
                };
            };
        };
    };
};

// file's category's path maker
function categoryPathMaker(fileName, fileCategory) {

    const start = unorgFolderPath.indexOf('/') + 1;
    const end = unorgFolderPath.lastIndexOf('/') + 1;
    const result = unorgFolderPath.substring(start, end);

    const currentDir = import.meta.dirname;
    const joinedPath = path.join(currentDir, result, fileCategory);

    makeDir(joinedPath, fileName, fileCategory, result);
}

// making required directories
function makeDir(joinedPath, fileName, fileCategory, result) {
    if (fs.existsSync(joinedPath)) {
        console.log(`${fileCategory} folder already exists - skipping creating.`);
    }
    else {
        try {
            fs.mkdirSync(joinedPath);
            console.log(`${fileCategory} folder created`);
        }
        catch (err) {
            console.error(err);
        }
    };

    fileMover(joinedPath, fileName, fileCategory, result);
}

// moving files to their 
function fileMover(joinedPath, fileName, fileCategory, result) {
    const oldPath = path.join(import.meta.dirname, result, fileName);
    const newPath = path.join(joinedPath, fileName);

    try {
        fs.renameSync(oldPath, newPath);
        console.log(`${fileName} moved to ${fileCategory} directory`);
    }
    catch (error) {
        console.error(error);
    }
}