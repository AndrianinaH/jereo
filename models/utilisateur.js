let mongoose = require('mongoose');

let utilisateurSchema = mongoose.Schema({
    pseudo :{
        type: String,
        required: true,
    },
    email :{
        type: String,
        required: true,
    },
    password :{
        type: String,
        required: true,
    },
});

let Utilisateur = module.exports = mongoose.model("Utilisateur", utilisateurSchema);


//-------- get utilisateur 
module.exports.getUtilisateur = function(utilisateur,callback){
    Utilisateur.findOne(utilisateur,callback);
};

//-------- create utilisateur 
module.exports.createUtilisateur = function(utilisateur,callback){
    Utilisateur.create(utilisateur,callback);
};