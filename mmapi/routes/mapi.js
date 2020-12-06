var url = require('url');
var qs = require('querystring');

var express = require('express');
var router = express.Router();
var app = express();
var MongoClient = require('mongodb').MongoClient;

router.get('/', function(req, res, next){
	MongoClient.connect('mongodb://localhost:27017',{
		useUnifiedTopology:true
    }, 
    
    function(err,client){
        if(err) throw err;
        
		const db = client.db('newdb'); 
		db.collection('users').find({}).toArray(function(err,objs){
            if (err) throw err;
            
            res.end(JSON.stringify(objs));
            console.log(objs);
        });
	});
    
    next();
});

router.post('/', function(req, res, next){
    MongoClient.connect('mongodb://localhost:27017', {
        useUnifiedTopology:true
    }, 
    
    function(err,client){
        if(err) throw err;

        let title = {
            TITLE: req.body.TITLE
        }

        const CLIENT_BASE = client.db('newdb'); 
        CLIENT_BASE.collection('users').updateOne(title, { $set: req.body }, { upsert: true }, function(err){
            if(err) throw err;

            console.log("[INFO] POST successful.");
        });
    });
    next();
})

module.exports = router;