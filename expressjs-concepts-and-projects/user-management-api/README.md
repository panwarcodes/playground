# Express User Management CRUD API

A simple CRUD API built with Express.js that stores user data in a local `users.json` file. No database required.

## Features

- Create users
- Read all users
- Read a single user by ID
- Update users
- Delete users
- Automatically creates `users.json` on first run
- Automatically refreshes user IDs after updates/deletions

## Tech Stack

- Node.js
- Express.js
- File system (`fs`)

## Installation

```bash
git clone <repository-url>
cd <project-folder>

npm install
```

## Run

```bash
node index.js
```

Server starts on:

```
http://localhost:3000
```

## Project Structure

```
.
├── index.js
├── users.json
├── package.json
└── README.md
```

## API

### GET /

Returns basic usage instructions.

---

### GET /users

Returns every user.

Example response:

```json
[
  {
    "success": true,
    "userList": [
      {
        "id": 1,
        "name": "John",
        "age": "20"
      }
    ]
  }
]
```

---

### POST /users

Adds a new user.

Body (`application/x-www-form-urlencoded` or JSON):

```json
{
  "add": "John",
  "age": "20"
}
```

Response:

```
User successfully added!
```

---

### GET /users/:id

Returns a user by ID.

Example:

```
GET /users/1
```

---

### PATCH /users/:id

Updates an existing user.

Body:

```json
{
  "newAdd": "Jane",
  "newAge": "22"
}
```

Response:

```
User successfully modified!
```

---

### DELETE /users/:id

Deletes a user.

Example:

```
DELETE /users/1
```

Response:

```
User Id: 1 deleted!
```

## Data Format

`users.json`

```json
[
  {
    "success": true,
    "userList": [
      {
        "id": 1,
        "name": "John",
        "age": "20"
      }
    ]
  }
]
```

## Notes

- Data is stored locally in `users.json`.
- IDs are reassigned after every delete operation.
- Uses synchronous file operations (`readFileSync` / `writeFileSync`).
- No validation or error handling for invalid request data.
- Intended as a beginner CRUD project.