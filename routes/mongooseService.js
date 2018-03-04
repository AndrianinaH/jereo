let mongoose = require('mongoose');

// let url = 'mongodb://localhost/jereo';
let url = 'mongodb://layton:azerty12345@ds253918.mlab.com:53918/jereo';
mongoose.connect(url);

Utilisateur = require('../models/utilisateur');
Playlist = require('../models/playlist');
Video = require('../models/video');

//--------------------------- Utilisateur Service ---------------------------//
//-------- login
exports.Login = function(res,utilisateur){
    Utilisateur.getUtilisateur(utilisateur,function(err, user){
        if(err) res.json({"status":"ko"});
        else{
            if(user == null) res.json({"status":"ko"});
            else {
                let newUser = {
                    "_id" : user._id,
                    "pseudo" : user.pseudo,
                    "email" : user.email
                }
                res.json(newUser); 
            }
        }
    });
}
//-------- signin
exports.Signin = function(res,utilisateur){
    Utilisateur.getUtilisateur(utilisateur,function(err,user){
        if(err) res.json({"status":"ko"});
        else{
            if(user != null) res.json({"status":"exist"});
            else {
                Utilisateur.createUtilisateur(utilisateur,function(err, user){
                    if(err) res.json({"status":"ko"});
                    else{
                        let newUser = {
                            "_id" : user._id,
                            "pseudo" : user.pseudo,
                            "email" : user.email
                        }
                        res.json(newUser); 
                    }
                });
            }
        }
    });
  
}

//--------------------------- Playlist Service ------------------------------//
//-------- get playlist ok by idUser
exports.GetPlaylist = function(res,idUser){
    let playlist = {"idUser":idUser, "etat": 1}; 
    Playlist.getPlaylist(playlist,function(err, playlists){
        if(err) res.json({"status":"ko"});
        else{
            res.json(playlists);
        }
    });
}

//-------- get playlist ko by idUser
exports.GetPlaylistDelete = function(res,idUser){
    let playlist = {"idUser":idUser, "etat": 2}; 
    Playlist.getPlaylist(playlist,function(err, playlists){
        if(err) res.json({"status":"ko"});
        else{
            res.json(playlists);
        }
    });
}

//-------- create playlist by idUser
exports.CreatePlaylist = function(res,newPlaylist){
    Playlist.createPlaylist(newPlaylist,function(err, playlists){
        if(err) res.json({"status":"ko"});
        else{
            res.json(playlists);
        }
    });
}

//-------- update playlist by idUser
exports.UpdatePlaylist = function(res,id,newPlaylist){
    Playlist.updatePlaylist(id,newPlaylist,function(err, playlists){
        if(err) res.json({"status":"ko"});
        else{
            newPlaylist._id = id;
            res.json(newPlaylist);
        }
    });
}
//-------- delete playlist by idUser
exports.DeletePlaylist = function(res,id){
    let playlist = {"etat":2};
    Playlist.updatePlaylist(id,playlist,function(err, playlists){
        if(err) res.json({"status":"ko"});
        else{
            res.json({"status":"ok"});
        }
    });
}
//--------------------------- Video Service ---------------------------------//
//-------- get video ok by idPlaylist
exports.GetVideo = function(res,idPlaylist){
    let video = {"idPlaylist":idPlaylist, "etat": 1}; 
    Video.getVideo(video,function(err, videos){
        if(err) res.json({"status":"ko"});
        else{
            res.json(videos);
        }
    });
}

//-------- get video ko by idPlaylist
exports.GetVideoDelete = function(res,idPlaylist){
    let video = {"idPlaylist":idPlaylist, "etat": 2}; 
    Video.getVideo(video,function(err, videos){
        if(err) res.json({"status":"ko"});
        else{
            res.json(videos);
        }
    });
}

//-------- create video by idPlaylist
exports.CreateVideo = function(res,newVideo){
    Video.createVideo(newVideo,function(err, videos){
        if(err) res.json({"status":"ko"});
        else{
            res.json(videos);
        }
    });
}

//-------- update video by idPlaylist
exports.UpdateVideo = function(res,id,newVideo){
    Video.updateVideo(id,newVideo,function(err, videos){
        if(err) res.json({"status":"ko"});
        else{
            newVideo.id = id;
            res.json(newVideo);
        }
    });
}

//-------- delete video by idPlaylist
exports.DeleteVideo = function(res,id){
    let video = {"etat":2};
    Video.updateVideo(id,video,function(err, videos){
        if(err) res.json({"status":"ko"});
        else{
            res.json({"status":"ok"});
        }
    });
}