// server/index.js

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
const fs = require('fs')
const stream = require('stream')
const formidable = require('formidable');

const path = require('path');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
var urlencodedParser = bodyParser.urlencoded({ extended: false })





const { v4: uuidv4 } = require('uuid');


var Datastore = require('nedb');

dbUsers = new Datastore({ filename: __dirname + '/users', autoload: true });
dbPosts = new Datastore({ filename: __dirname + '/posts', autoload: true });

app.post('/image', (req, res) => {
    let data = req.body;
    const r = fs.createReadStream('./server/static/post-pictures/' + data.image) // or any other way to get a readable stream
    const ps = new stream.PassThrough() // <---- this makes a trick with stream error handling
    stream.pipeline(
        r,
        ps, // <---- this makes a trick with stream error handling
        (err) => {
            if (err) {
                console.log(err) // No such file or any other kind of error
                return res.sendStatus(400);
            }
        })
    ps.pipe(res) // <---- this makes a trick with stream error handling
})

app.post('/profilePicture', (req, res) => {
    let data = req.body;
    console.log(JSON.stringify(data.image));
    const r = fs.createReadStream('./server/static/profile-pictures/' + data.image + ".jpg") // or any other way to get a readable stream
    const ps = new stream.PassThrough() // <---- this makes a trick with stream error handling
    stream.pipeline(
        r,
        ps, // <---- this makes a trick with stream error handling
        (err) => {
            if (err) {
                console.log(err) // No such file or any other kind of error
                return res.sendStatus(400);
            }
        })
    ps.pipe(res) // <---- this makes a trick with stream error handling
})

app.post('/addUser', (req, res) => {
    req.on("data", function (data) {
        let myData = JSON.parse(data)
        let prototypeUser =
        {
            _id: uuidv4(),
            login: myData.login,
            password: myData.password,
            profile_picture: myData.profile_picture,
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
    let myData = req.body;
    let prototypePost =
    {
        _id: uuidv4(),
        created_at: myData.created_at,// Will not be saved
        created_by: myData.created_by,
        updated_at: myData.updated_at,
        updated_by: myData.updated_by,
        text: myData.text,
        image: myData.image,
        permission: myData.permission,
        status: myData.status
    };



    dbPosts.insert(prototypePost, function (err, newDoc) {   // Callback is optional
        // newDoc is the newly inserted document, including its _id
        // newDoc has no key called notToBeSaved since its value was undefined
    });
    res.end(JSON.stringify(["ok", "dziala"]));


})

app.post("/login", (req, res) => {
    let data = req.body;
    //console.log(JSON.stringify(data));

    dbUsers.find({ login: data.login, password: data.password }, function (err, docs) {
        //console.log(docs);

        res.send(JSON.stringify(docs));
    });
});

app.post("/getMyPosts", (req, res) => {
    //console.log(JSON.stringify(req.body));
    dbPosts.find({}, function (err, docs) {
        //console.log(docs);
        res.send(JSON.stringify(docs));
    });
});

app.get("/getPosts", (req, res) => {
    dbPosts.find({}, function (err, docs) {
        //console.log(docs);
        res.send(JSON.stringify(docs));
    });
});

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

const multer = require("multer");

const storage = multer.diskStorage({
    destination: path.join(__dirname, './static', 'post-pictures'),
    filename: function (req, file, cb) {
        // null as first argument means no error
        cb(null, Date.now() + '-' + file.originalname)
    }
})

let upload = multer({ storage: storage });

app.post('/upload', upload.array('image'), async (req, res) => {
    try {
        console.log(JSON.parse(req.body.jsonData));
        console.log(req.files[0].filename);
        let arrayOfImages = []
        req.files.forEach(element => {
            let myFilename = uuidv4() + ".png";
            arrayOfImages.push(myFilename);
            fs.rename(path.join(__dirname, './static', 'post-pictures', element.filename),
                path.join(__dirname, './static', 'post-pictures', myFilename), function (err) {
                    if (err) console.log('ERROR: ' + err);
                });
        });


        let prototypePost =
        {
            _id: uuidv4(),
            created_at: "myData.created_at",// Will not be saved
            created_by: JSON.parse(req.body.jsonData).user,
            updated_at: "myData.updated_at",
            updated_by: JSON.parse(req.body.jsonData).user,
            text: JSON.parse(req.body.jsonData).content,
            image: arrayOfImages,
            permission: 'myData.permission',
            status: 'myData.status',
            title: JSON.parse(req.body.jsonData).title
        };



        dbPosts.insert(prototypePost, function (err, newDoc) {   // Callback is optional
            // newDoc is the newly inserted document, including its _id
            // newDoc has no key called notToBeSaved since its value was undefined
        });

        const classifiedsadd = {
            image: req.files[0].filename
        };

        res.send("ok")

    } catch (err) { console.log(err) }
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
