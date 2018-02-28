let mongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
let url = 'mongodb://localhost/todoList';
let fileSaver = require('fs');

function jsonData(res){
    mongoClient.connect(url,function(err,database){
        if(err){
            return console.log('connection fail');
            database.close();
         }
         console.log('connection start...');
         const mydb = database.db('todoList');
         let allData = mydb.collection('tasks');
         allData.find().toArray(function(err,result){
             if(err){
                 console.log('no data to find');
             }else{
                res.send(JSON.stringify(result));
             }
         });
         database.close();
    });
}

function exportCSV(res){
    mongoClient.connect(url,function(err,database){
        if(err){
            return console.log('connection fail');
            database.close();
         }
         console.log('connection start...');
         const mydb = database.db('todoList');
         let allData = mydb.collection('tasks');
         allData.find().toArray(function(err,result){
             if(err){
                 console.log('no data to find');
             }else{
                fileSaver.writeFile('message2.csv', JSON.stringify(result), function () {
                    res.sendfile('message2.csv');
                });
             }
         });
         database.close();
    });
}

function getAllData(res){
    mongoClient.connect(url,function(err,database){
       if(err){
           return console.log('connection fail');
           database.close();
        }
        console.log('connection start...');
        const mydb = database.db('todoList');
        let allData = mydb.collection('tasks');
        allData.find().toArray(function(err,result){
            if(err){
                console.log('no data to find');
            }else{
                res.render('todo.ejs', {todolist: result});
            }
        });
        database.close();
   });
}

function findByData(res,todoFind){
    mongoClient.connect(url,function(err,database){
        if(err){
            return console.log('connection fail');
            database.close();
        }
        console.log('connection start...');
        const mydb = database.db('todoList');
        let allData = mydb.collection('tasks');
        allData.findOne({"_id":ObjectId(todoFind)},function(err,result){
            if(err){
                console.log('no data to find');
            }else{
                res.render('update.ejs', {todo_actuel:result});
            }
        });
        database.close();
    });
 }

function insertNewData(res,newTodo){
    mongoClient.connect(url,function(err,database){
        if(err){
            return console.log('connection fail');
            database.close();
        }
        console.log('connection start...');
        const mydb = database.db('todoList');
        let allData = mydb.collection('tasks');
        allData.insertOne(newTodo,function(err,result){
            if(err){
                console.log('insert fail');
            }else{
            res.redirect('/todo');
            }
        });
        database.close();
    });
}

function updateData(res,newTodo,id){
    mongoClient.connect(url,function(err,database){
        if(err){
            return console.log('connection fail');
            database.close();
        }
        console.log('connection start...');
        const mydb = database.db('todoList');
        let allData = mydb.collection('tasks');
        allData.replaceOne({"_id":ObjectId(id)},newTodo,function(err,result){
            if(err){
                console.log('update fail');
            }else{
            res.redirect('/todo');
            }
        });
         database.close();
    });
}

function deleteData(res,id){
    mongoClient.connect(url,function(err,database){
        if(err){
            return console.log('connection fail');
            database.close();
         }
         console.log('connection start...');
         const mydb = database.db('todoList');
         let allData = mydb.collection('tasks');
         allData.deleteOne({"_id":ObjectId(id)},function(err,result){
            if(err){
                console.log('delete fail');
            }else{
            res.redirect('/todo');
            }
         });
         database.close();
    });
}

exports.getAllData = getAllData;
exports.findByData = findByData;
exports.insertNewData = insertNewData;
exports.updateData = updateData;
exports.deleteData = deleteData;
exports.jsonData = jsonData;
exports.exportCSV = exportCSV;


