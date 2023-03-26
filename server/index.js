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


const multer = require("multer");




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

    const r = fs.createReadStream('./server/static/profile-pictures/' + data.image) // or any other way to get a readable stream
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


let profileStorage = multer.diskStorage({
    destination: path.join(__dirname, './static', 'profile-pictures'),
    filename: function (req, file, cb) {
        // let ext = path.extname(file.originalname);
        // let fileName = userUUid + ext;
        // req.fileDetails = {
        //     fileName: fileName,
        //     fileType: file.mimetype,
        //     filePath: `/static/profile-pictures/${fileName}`,
        // };
        cb(null, file.originalname);
    },
});

let profileUpload = multer({ storage: profileStorage });

app.post('/addUser', profileUpload.single('image'), (req, res) => {
    let myData = JSON.parse(req.body.jsonData);

    dbUsers.find({ login: myData.login }, function (err, docs) {
        let myDocs = JSON.stringify(docs);
        if (myDocs == []) {
            let imageName = uuidv4() + path.extname(req.file.filename);

            fs.rename(path.join(__dirname, './static', 'profile-pictures', req.file.filename),
                path.join(__dirname, './static', 'profile-pictures', imageName), function (err) {
                    if (err) console.log('ERROR: ' + err);
                });



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
                image: imageName,
                department: myData.department,
                status: "not_activated"
            };



            dbUsers.insert(prototypeUser, function (err, newDoc) {   // Callback is optional
                // newDoc is the newly inserted document, including its _id
                // newDoc has no key called notToBeSaved since its value was undefined
            });
        } else {
            res.end("username taken")
            console.log("user not added");
        }

    });




});


app.post("/login", (req, res) => {
    let data = req.body;


    dbUsers.find({ login: data.login, password: data.password }, function (err, docs) {
        if (docs.status == "not_activated") {
            dbUsers.update({ login: data.login, password: data.password }, { $set: { first_login: Date.now() } }, {}, function (err, numReplaced) {

            })
            res.send(JSON.stringify(docs));
        } else {
            dbUsers.update({ login: data.login, password: data.password }, { $set: { status: "online", first_login: Date.now() } }, {}, function (err, numReplaced) {

            })
            res.send(JSON.stringify(docs));

        }


    });
});

app.post("/getUsers", (req, res) => {
    let data = req.body;


    dbPosts.find({}, { password: 0, _id: 0 }, function (err, docs) {
        res.send(JSON.stringify(docs));
    });
});

app.post("/getMyPosts", (req, res) => {
    dbPosts.loadDatabase(function (err) {    // Callback is optional
        // Now commands will be executed
    });
    let data = req.body;

    dbPosts.find({ created_by: data.created_by }, function (err, docs) {

        res.send(JSON.stringify(docs));
    });
});

app.post("/getPostsWithMyPremission", (req, res) => {
    dbPosts.loadDatabase(function (err) {    // Callback is optional
        // Now commands will be executed
    });
    let data = req.body;

    dbPosts.find({ permission: data.role }, function (err, docs) {

        res.send(JSON.stringify(docs));
    });
});

app.get("/getPosts", (req, res) => {
    dbPosts.loadDatabase(function (err) {    // Callback is optional
        // Now commands will be executed
    });
    dbPosts.find({}, function (err, docs) {
        res.send(JSON.stringify(docs));
    });
});



const storage = multer.diskStorage({
    destination: path.join(__dirname, './static', 'post-pictures'),
    filename: function (req, file, cb) {

        // null as first argument means no error
        cb(null, file.originalname)
    }
})

let upload = multer({ storage: storage });

app.post('/upload', upload.array('image'), async (req, res) => {

    try {

        let arrayOfImages = []

        console.log(req.files)
        console.log(req.files[0])
        if (req.files[0] !== undefined) {



            req.files.forEach(element => {
                if (element.originalname !== undefined) {
                    let myFilename = uuidv4() + path.extname(element.originalname);

                    arrayOfImages.push(myFilename);
                    fs.rename(path.join(__dirname, './static', 'post-pictures', element.originalname),
                        path.join(__dirname, './static', 'post-pictures', myFilename), function (err) {
                            if (err) console.log('ERROR: ' + err);
                        });
                }
            });


        }


        let prototypePost =
        {
            _id: uuidv4(),
            created_at: Date.now(),// Will not be saved
            created_by: JSON.parse(req.body.jsonData).user,
            updated_at: Date.now(),
            updated_by: JSON.parse(req.body.jsonData).user,
            text: JSON.parse(req.body.jsonData).content,
            images: arrayOfImages,
            permission: JSON.parse(req.body.jsonData).permission,
            status: 'posted',
            title: JSON.parse(req.body.jsonData).title
        };



        dbPosts.insert(prototypePost, function (err, newDoc) {   // Callback is optional
            // newDoc is the newly inserted document, including its _id
            // newDoc has no key called notToBeSaved since its value was undefined
        });

        // const classifiedsadd = {
        //     image: req.files[0].filename
        // };

        res.send("ok")

    } catch (err) { console.log(err) }
})

app.post("/changePassword", (req, res) => {

    let data = JSON.parse(req.body.jsonData);
    // Find the user by login and password
    dbUsers.update({ login: data.login, password: data.password }, { $set: { password: data.passwordOne } }, {}, function (err, numReplaced) {
        if (err) {
            res.status(500).send("Internal server error");
            return;
        } else if (numReplaced == 0) {
            res.status(401).send("Invalid credentials");
            return;
        } else {
            res.send("Password changed successfully");
        }

    });
});

app.post("/handleStatus", (req, res) => {

    let data = JSON.parse(req.body.jsonData);
    console.log("handling logining ", data.status)
    // Find the user by login and password
    dbUsers.update({ _id: data.user }, { $set: { status: data.status } }, {}, function (err, numReplaced) {
        if (err) {
            res.status(500).send("Internal server error");
            return;
        } else {
            res.send("Logged Out");
        }

    });
});
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
