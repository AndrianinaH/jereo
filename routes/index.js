let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let mongoService = require('./mongoService');

/* GET home page all Todo List. */
router.get('/todo', function (req, res, next) {
  mongoService.getAllData(res);
})

/* On ajoute un élément à la todolist */
.post('/todo/ajouter/', urlencodedParser, function (req, res) {
  if (req.body.newtodo != '' && req.body.priorite != '' && req.body.datelimite != '') {
    let newTodo = {
      tache: req.body.newtodo,
      priorite: req.body.priorite,
      datelimite: req.body.datelimite
    };
    mongoService.insertNewData(res, newTodo);

  }
})

/* Supprime un élément de la todolist */
.get('/todo/supprimer/:id', function (req, res) {
  if (req.params.id != '') {
    mongoService.deleteData(res, req.params.id);
  }
})

/* modifier un élément de la todolist */
.get('/todo/modifier/:id', function (req, res) {
  let id = req.params.id;
  if (id != '') {
    mongoService.findByData(res, id);
  }
})

.post('/todo/save_modif/', urlencodedParser, function (req, res) {
  if (req.body.id != '' && req.body.modif != '' && req.body.priorite != '' && req.body.datelimite != '') {
    let newTodo = {
      tache: req.body.modif,
      priorite: req.body.priorite,
      datelimite: req.body.datelimite
    };
    let id = req.body.id;
    mongoService.updateData(res, newTodo, id);
  }
})

.use('/todo/exportcsv/', function (req, res, next) {
  mongoService.exportCSV(res);
})

//--------------- Rest Service ----------------//
.use('/todo/jsonData/', function (req, res, next) {
  mongoService.jsonData(res);
})



module.exports = router;
