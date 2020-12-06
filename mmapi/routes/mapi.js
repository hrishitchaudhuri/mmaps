var url = require('url');
var qs = require('querystring');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

router.get('/', function(req, res, next){
	MongoClient.connect('mongodb://localhost:27017',{
		useUnifiedTopology:true
    }, 
    
    function(err,client){
        if(err) throw err;
        
		const db = client.db('newdb'); //use newdb;
		db.collection('users').find({}).toArray(function(err,objs){
            if (err) throw err;
            
            res.end(JSON.stringify(objs));
            console.log(objs);
        });
	});
    
    next();
});

router.post('/', function(req, res, next){
    MongoClient.connect('mongodb://localhost:27017',{
        useUnifiedTopology:true
    }, 
    
    function(err,client){
        if(err) throw err;
        
        const CLIENT_BASE = client.db('newdb'); //use newdb;
        CLIENT_BASE.collection('users').insertOne(req.body,function(err){
            if(err) throw err;
            console.log(req.body);
            res.send("Save Successful.")
        });
    });
    next();
})

module.exports = router;