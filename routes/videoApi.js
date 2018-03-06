let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let mongoose = require('./mongooseService');


router

    /* GET all videos. */
    .get('/api/video/:idPlaylist', function (req, res, next) {
        if (req.params.idPlaylist != undefined) {
            mongoose.GetVideo(res, req.params.idPlaylist);
        } else res.json({ "status": "ko" });
    })

    /* GET all video ko */
    .get('/api/videoDelete/:idPlaylist', function (req, res, next) {
        if (req.params.idPlaylist != undefined) {
            mongoose.GetVideoDelete(res, req.params.idPlaylist);
        } else res.json({ "status": "ko" });
    })

    /* On ajoute une video */
    .post('/api/video', urlencodedParser, function (req, res) {
        if (req.body.titre != undefined && req.body.videoId != undefined && req.body.urlImage != undefined && req.body.idPlaylist != undefined) {
            let newVideo = {
                titre: req.body.titre,
                videoId: req.body.videoId,
                urlImage: req.body.urlImage,
                idPlaylist: req.body.idPlaylist,
                etat: 1
            };
            mongoose.CreateVideo(res, newVideo);
        }
        else res.json({ "status": "ko" });
    })

    /* On update une video */
    .put('/api/video', urlencodedParser, function (req, res) {
        if (req.body.id != undefined && req.body.titre != undefined && req.body.videoId != undefined && req.body.urlImage != undefined && req.body.idPlaylist != undefined && req.body.etat != undefined) {
            let id = req.body.id;
            let newVideo = {
                titre: req.body.titre,
                videoId: req.body.videoId,
                urlImage: req.body.urlImage,
                idPlaylist: req.body.idPlaylist,
                etat: req.body.etat
            };
            mongoose.UpdateVideo(res, id, newVideo);
        }
        else res.json({ "status": "ko" });
    })

    /* Supprime une video */
    .delete('/api/video/:id', function (req, res) {
        if (req.params.id != undefined) {
            mongoose.DeleteVideo(res, req.params.id);
        }
        else res.json({ "status": "ko" });
    })






module.exports = router;
