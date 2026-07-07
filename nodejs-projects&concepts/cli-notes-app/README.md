# Notes CLI

A simple command-line notes application built with Node.js. Notes are stored locally in a `tasks.json` file.

## Features

* Add notes
* List all saved notes
* Delete notes by index
* Automatically creates `tasks.json` if it does not exist
* Stores data in JSON format

## Requirements

* Node.js installed

## Installation

Clone the repository and navigate to the project folder.

```bash
git clone <repository-url>
cd <project-folder>
```

## Usage

### Display Help

```bash
node app.js help
```

Output:

```text
add - usage: add <enter note here>

list - list note storage

delete - usage: delete <enter index of note>
```

### Add a Note

```bash
node app.js add "Buy groceries"
```

### List Notes

```bash
node app.js list
```

Example output:

```text
1 Buy groceries
2 Finish assignment
3 Read a book
```

### Delete a Note

Delete a note using its displayed index.

```bash
node app.js delete 2
```

## Project Structure

```text
.
├── app.js
└── tasks.json
```

## Data Format

Notes are stored as an array of objects.

```json
[
  {
    "id": 1,
    "text": "Buy groceries"
  },
  {
    "id": 2,
    "text": "Read a book"
  }
]
```

## How It Works

* Checks whether `tasks.json` exists.
* Creates the file if it is missing.
* Reads command-line arguments using `process.argv`.
* Supports three commands:

  * `add`
  * `list`
  * `delete`
* Updates the JSON file after every add or delete operation.