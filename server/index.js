// server/index.js

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const { v4: uuidv4 } = require('uuid');


var Datastore = require('nedb');

dbUsers = new Datastore({ filename: __dirname + '/users', autoload: true });
dbPosts = new Datastore({ filename: __dirname + '/posts', autoload: true });



app.post('/addUser', (req, res) => {
    req.on("data", function (data) {
        let myData = JSON.parse(data)
        let prototypeUser =
        {
            _id: uuidv4(),
            login: myData.login,
            password: myData.password,
            first_name: myData.first_name,
            last_name: myData.last_name,
            bio: myData.bio,
            role: myData.role,
            created_at: myData.created_at,// Will not be saved
            created_by: myData.created_by,
            first_login: myData.first_login,
            image: myData.image,
            department: myData.department,
            status: myData.status
        };

        dbUsers.insert(prototypeUser, function (err, newDoc) {   // Callback is optional
            // newDoc is the newly inserted document, including its _id
            // newDoc has no key called notToBeSaved since its value was undefined
        });
    })


})

app.post('/addPost', (req, res) => {
    req.on("data", function (data) {
        let myData = JSON.parse(data)
        let prototypePost =
        {
            _id: uuidv4(),
            created_at: myData.created_at,// Will not be saved
            created_by: myData.created_by,
            updated_at: myData.updated_at,
            updated_by: myData.updated_by,
            content: myData.content,
            permission: myData.permission,
            status: myData.status
        };

        dbPosts.insert(prototypePost, function (err, newDoc) {   // Callback is optional
            // newDoc is the newly inserted document, including its _id
            // newDoc has no key called notToBeSaved since its value was undefined
        });
    })
    res.end(JSON.stringify(["ok", "dziala"]));
})

app.get("/getUsers", (req, res) => {
    dbUsers.find({}, function (err, docs) {
        console.log(docs);
        res.end(JSON.stringify(docs));
    });
});

app.get("/getPosts", (req, res) => {
    dbPosts.find({}, function (err, docs) {
        console.log(docs);
        res.end(JSON.stringify(docs));
    });
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
