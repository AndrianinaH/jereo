let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let mongoService = require('./mongoWebService');

/* GET all todolist. */
router.get('/tasks', function (req, res, next) {
  mongoService.getAllData(res);
})

/* On ajoute un élément à la todolist */
.post('/tasks/', urlencodedParser, function (req, res) {
  if (req.body.tache != undefined && req.body.priorite != undefined && req.body.datelimite != undefined) {
    let newTodo = {
      tache: req.body.tache,
      priorite: req.body.priorite,
      datelimite: req.body.datelimite
    };
    mongoService.insertNewData(res, newTodo);
  }
  else res.json({"status":"ko"});
})

/* Supprime un élément de la todolist */
.delete('/tasks/:id', function (req, res) {
  if (req.params.id != undefined) {
    mongoService.deleteData(res, req.params.id);
  }
  else res.json({"status":"ko"});
})

/* modifier un élément de la todolist */
.get('/tasks/:id', function (req, res) {
  let id = req.params.id;
  if (id != undefined) {
    mongoService.findByData(res, id);
  }
  else res.json({"status":"ko"});
})

.put('/tasks/', urlencodedParser, function (req, res) {
  if (req.body.id != undefined && req.body.tache != undefined && req.body.priorite != undefined && req.body.datelimite != undefined) {
    let newTodo = {
      tache: req.body.tache,
      priorite: req.body.priorite,
      datelimite: req.body.datelimite
    };
    let id = req.body.id;
    mongoService.updateData(res, newTodo, id);
  }
  else res.json({"status":"ko"});
})

.use('/tasks/exportcsv/', function (req, res, next) {
  mongoService.exportCSV(res);
})




module.exports = router;
