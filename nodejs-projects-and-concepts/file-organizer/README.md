# File Organizer

A zero-dependency, synchronous Node.js script that automatically sorts assets from a local folder into category-specific subdirectories based on their extensions.

## Storage Tree

```
.
├── unorganised-folder/
│   ├── Audio/
│   ├── Code & Programming/
│   ├── Documents/
│   ├── Images/
├── index.js
└── package.json
```

## System Rules

* I/O Strategy: Uses synchronous operations (readdirSync, mkdirSync, renameSync) to guarantee linear execution and prevent async race conditions.
* Path Extraction: Dynamically parses the target folder path via substring slicing of directory separators combined with import.meta.dirname.
* Skipping Logic: If a destination directory already exists, the script logs an alert, skips creation, and proceeds directly to file relocation.

## Mapped Categories

* Media: Images (.jpg, .png, .webp, .svg, .raw), Videos (.mp4, .mkv, .mov), Audio (.mp3, .wav, .flac), Fonts (.ttf, .woff2).
* Text & Code: Documents (.pdf, .docx, .xlsx, .txt), Code & Programming (.html, .js, .ts, .py, .cpp, .md), E-Books (.epub, .mobi).
* Data & System: Data (.csv, .sql, .sqlite), Archives (.zip, .rar, .tar.gz, .iso), Executables (.exe, .msi, .dmg), System (.ini, .env, .log).

## Usage

Place unorganized files in the target directory and execute the script via the command: node index.js