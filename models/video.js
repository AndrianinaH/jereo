let mongoose = require('mongoose');
let ObjectId = require('mongodb').ObjectId;

let VideoSchema = mongoose.Schema({
    titre :{
        type: String,
        required: true,
    },
    videoId :{
        type: String,
        required: true,
    },
    urlImage :{
        type: String,
        required: true,
    },
    idPlaylist :{
        type: String,
        required: true,
    },
    etat :{
        type: Number,
        required: true,
    }
});

let Video = module.exports = mongoose.model("Video", VideoSchema);


//-------- get Video 
module.exports.getVideo = function(video,callback){
    Video.find(video,callback);
};

//-------- create Video 
module.exports.createVideo = function(video,callback){
    Video.create(video,callback);
};

//-------- update Video 
module.exports.updateVideo = function(id,video,callback){
    Video.findByIdAndUpdate(id,video,callback);
};