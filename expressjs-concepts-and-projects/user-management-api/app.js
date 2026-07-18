import express from 'express';
import fs from 'node:fs';

const app = express();
const port = 3000;
const filePath = './users.json';

// checking if filePath exists
if (fs.existsSync(filePath)) {
    console.log('Continuing with an existing file...');
}
// else creating file
else {
    const user = [{ "success": true, "userList": [] }]
    fs.writeFileSync(filePath, JSON.stringify(user, null, 2));
}

// middlwares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// homepage
app.get('/', (req, res) => {
    res.send(`Hi, please visit '/users' to check current users list. <br>
        To add users give POST request to '/users?add=your_name&age=your_age'. <br>
        To modify user give PATCH request to '/users/id?add=your_name&age=your_age'. <br>
        To delete user give DELETE request to '/users/id?add=your_name&age=your_age'.`);
});

// to prevent repetitive code
const userList = (req, res) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    res.json(JSON.parse(fileContent));
};

const addUser = (req, res) => {
    const userName = req.body.add;
    const userAge = req.body.age;

    // below code only works with express.urlencoded middleware
    if (Object.keys(req.body).length == 2) {

        const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        fileContent[0].userList.push({ "id": 1, "name": userName, "age": userAge });

        idRefresh(fileContent);

        fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2), 'utf-8');

        res.send('User successfully added!');
    }
    else {
        res.send('Query format is wrong, user could not be added.');
    }
}

// '/user' route - method - GET, POST allowed
app.route('/users')
    .get(userList)
    .post(addUser);


// file user id number fix after modification (POST, DELETE)
function idRefresh(fileContent) {
    for (let i = 0; i < fileContent[0].userList.length; i++) {
        fileContent[0].userList[i].id = i + 1;
    }
}

// '/user/:id' route -  method - GET, DELETE allowed
app.route('/users/:id')
    // GET method - get user details using id
    .get((req, res) => {
        const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const id = req.params.id;
        const userListIndex = fileContent[0].userList[id - 1];

        if (userListIndex) {
            res.json(userListIndex);
        }
        else {
            res.send('Id does not exist.')
        }
    })
    // PATCH method - modify users
    .patch((req, res) => {
        const userName = req.body.newAdd;
        const userAge = req.body.newAge;
        const id = req.params.id;

        // below code only works with express.urlencoded middleware
        if (Object.keys(req.body).length == 2) {

            const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

            fileContent[0].userList[id - 1].name = userName;
            fileContent[0].userList[id - 1].age = userAge;

            idRefresh(fileContent);

            fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2), 'utf-8');

            res.send('User successfully modified!');
        }
        else {
            res.send('Query format is wrong, user could not be added.');
        }
    })
    // DELETE method - delete users
    .delete((req, res) => {
        const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        const id = req.params.id;
        const userListIndex = fileContent[0].userList[id - 1];

        if (userListIndex) {
            fileContent[0].userList.splice(id - 1, 1);
            idRefresh(fileContent);
            fs.writeFileSync(filePath, JSON.stringify(fileContent, null, 2), 'utf-8');
            res.send(`User Id: ${id} deleted!`);
        }
        else {
            res.send('Id does not exist.')
        }
    });


// listening on port variable
app.listen(port, () => {
    console.log('server is running just fine...');
});