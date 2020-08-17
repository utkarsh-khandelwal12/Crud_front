const express = require("express");
const students = require('./Routes/student');
const users = require('./Routes/users');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');

// DB connection
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Students', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));//in case of frontend as we getting data 
//app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));//Whenever looking for a file look files inside the public folder

app.get('/', function (req, res) {
    res.render('index.ejs');//To access ejs file
});

// public route
app.use('/users', users);

// private route
app.use('/students', students);//validateUser is not valid with ejs so we dont use jwt. We use PASSPORT. STUDY THIS.

app.get('/favicon.ico', function (req, res) {
    res.sendStatus(204);
});

// user validation
/*function validateUser(req, res, next) {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_KEY)
        if(!data) {
            throw new Error()
        }
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}*/

// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// handle errors
app.use(function (err, req, res, next) {
    console.log(err);

    if (err.status === 404)
        res.status(404).json({ message: "Not found" });
    else
        res.status(500).json({ message: "Something looks wrong :( !!!" });
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});