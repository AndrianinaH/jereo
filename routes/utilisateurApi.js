let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let mongoose= require('./mongooseService');

router
/* connexion */ 
.post('/api/login/', function (req, res) {
    if (req.body.email != undefined && req.body.password != undefined) {
        let newUser = {
            email: req.body.email,
            password: req.body.password
        };
        mongoose.Login(res, newUser);
    }
    else res.json({"status":"ko"});   
})

/* inscription  */
.post('/api/signin/', urlencodedParser, function (req, res) {
    if (req.body.pseudo != undefined && req.body.email != undefined && req.body.password != undefined) {
        let newUser = {
            pseudo: req.body.pseudo,
            email: req.body.email,
            password: req.body.password
        };
        mongoose.Signin(res, newUser);
    }
    else res.json({"status":"ko"});
})

module.exports = router;
