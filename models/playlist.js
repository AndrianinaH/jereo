let mongoose = require('mongoose');
let ObjectId = require('mongodb').ObjectId;

let PlaylistSchema = mongoose.Schema({
    titre :{
        type: String,
        required: true,
    },
    couleur :{
        type: String,
        required: true,
    },
    idUser :{
        type: String,
        required: true,
    },
    etat :{
        type: Number,
        required: true,
    }
});

let Playlist = module.exports = mongoose.model("Playlist", PlaylistSchema);


//-------- get Playlist 
module.exports.getPlaylist = function(playlist,callback){
    Playlist.find(playlist,callback);
};

//-------- create Playlist 
module.exports.createPlaylist = function(playlist,callback){
    Playlist.create(playlist,callback);
};

//-------- update Playlist 
module.exports.updatePlaylist = function(id,playlist,callback){
    Playlist.findByIdAndUpdate(id,playlist,callback);
};