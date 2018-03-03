let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let mongoose = require('./mongooseService');

router

    /* GET all playlist ok. */
    .get('/api/playlist/:idUser', function (req, res, next) {
        if (req.params.idUser != undefined) {
            mongoose.GetPlaylist(res, req.params.idUser);
        } else res.json({ "status": "ko" });
    })

    /* GET all playlist ko */
    .get('/api/playlistDelete/:idUser', function (req, res, next) {
        if (req.params.idUser != undefined) {
            mongoose.GetPlaylistDelete(res, req.params.idUser);
        } else res.json({ "status": "ko" });
    })

    /* On ajoute une playlist */
    .post('/api/playlist', urlencodedParser, function (req, res) {
        if (req.body.titre != undefined && req.body.couleur != undefined && req.body.idUser != undefined) {
            let newPlaylist = {
                titre: req.body.titre,
                couleur: req.body.couleur,
                idUser: req.body.idUser,
                etat: 1
            };
            mongoose.CreatePlaylist(res, newPlaylist);
        }
        else res.json({ "status": "ko" });
    })

    /* On update une playlist */
    .put('/api/playlist', urlencodedParser, function (req, res) {
        if (req.body.id != undefined && req.body.titre != undefined && req.body.couleur != undefined && req.body.idUser != undefined && req.body.etat != undefined) {
            let id = req.body.id;
            let newPlaylist = {
                titre: req.body.titre,
                couleur: req.body.couleur,
                idUser: req.body.idUser,
                etat: req.body.etat
            };
            mongoose.UpdatePlaylist(res, id, newPlaylist);
        }
        else res.json({ "status": "ko" });
    })

    /* Supprime une playlist */
    .delete('/api/playlist/:id', function (req, res) {
        if (req.params.id != undefined) {
            mongoose.DeletePlaylist(res, req.params.id);
        }
        else res.json({ "status": "ko" });
    })

module.exports = router;
