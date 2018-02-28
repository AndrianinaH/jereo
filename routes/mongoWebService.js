let mongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
let url = 'mongodb://localhost/todoList';
let fileSaver = require('fs');

function exportCSV(res){
    mongoClient.connect(url,function(err,database){
        if(err){
            database.close();
            return console.log('connection fail');  
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
            database.close();
            return console.log('connection fail');  
        }
        console.log('connection start...');
        const mydb = database.db('todoList');
        let allData = mydb.collection('tasks');
        allData.find().toArray(function(err,result){
            if(err){
                console.log('no data to find');
                res.json({"status":"ko"});
            }else{
                res.json(result);
            }
        });
        database.close();
   });
}

function findByData(res,todoFind){
    mongoClient.connect(url,function(err,database){
        if(err){
            database.close();
            return console.log('connection fail');  
        }
        console.log('connection start...');
        const mydb = database.db('todoList');
        let allData = mydb.collection('tasks');
        allData.findOne({"_id":ObjectId(todoFind)},function(err,result){
            if(err){
                console.log('no data to find');
                res.json({"status":"ko"});
            }else{
                res.json(result);
            }
        });
        database.close();
    });
 }

function insertNewData(res,newTodo){
    mongoClient.connect(url,function(err,database){
        if(err){
            database.close();
            return console.log('connection fail');  
        }
        console.log('connection start...');
        const mydb = database.db('todoList');
        let allData = mydb.collection('tasks');
        allData.insertOne(newTodo,function(err,result){
            if(err){
                console.log('insert fail');
                res.json({"status":"ko"});
            }else{
                res.json({"status":"ok"});
            }
        });
        database.close();
    });
}

function updateData(res,newTodo,id){
    mongoClient.connect(url,function(err,database){
        if(err){
            database.close();
            return console.log('connection fail');
        }
        console.log('connection start...');
        const mydb = database.db('todoList');
        let allData = mydb.collection('tasks');
        allData.replaceOne({"_id":ObjectId(id)},newTodo,function(err,result){
            if(err){
                console.log('update fail');
                res.json({"status":"ko"});
            }else{
                res.json({"status":"ok"});
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
                res.json({"status":"ko"});
            }else{
                res.json({"status":"ok"});
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
exports.exportCSV = exportCSV;


