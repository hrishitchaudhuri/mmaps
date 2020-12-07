var url = require('url');
var qs = require('querystring');

var express = require('express');
var router = express.Router();
var app = express();
var MongoClient = require('mongodb').MongoClient;

router.get('/search', function(req, res) {
    res.writeHead(200, {'Content-type':'application/json'});
    MongoClient.connect('mongodb://localhost:27017', {
		useUnifiedTopology:true
    }, 
    
    function(err,client){
        if (err) throw err;
        
        var req_url = url.parse(req.url);
        var query_object = qs.parse(req_url.query);

        let title = {
            TITLE: query_object.TITLE
        }

        console.log(title);

		const db = client.db('newdb'); 
		db.collection('users').find(title).toArray(function(err,objs){
            if (err) throw err;
            
            res.write(JSON.stringify(objs));
            console.log(objs);

            res.end();
            client.close();
        });
    });
});

router.get('/', function(req, res) {
    res.writeHead(200, {'Content-type':'application/json'});
    MongoClient.connect('mongodb://localhost:27017',{
		useUnifiedTopology:true
    }, 
    
    function(err,client){
        if (err) throw err;
        
        var req_url = url.parse(req.url);
        var query_object = qs.parse(req_url.query);

        let nodeid = {
            NOTE_ID: parseInt(query_object.NOTE_ID)
        }

        console.log(nodeid);

		const db = client.db('newdb'); 
		db.collection('users').findOne(nodeid, function(err,objs){
            if (err) throw err;
            
            res.write(JSON.stringify(objs));
            console.log(objs);

            res.end();
            client.close();
        });
    });
});

router.post('/delete', function(req, res) {
    MongoClient.connect('mongodb://localhost:27017', {
        useUnifiedTopology:true
    }, 
    
    function (err, client) {
        if (err) throw err;

        let noteid = {
            NOTE_ID: req.body.NOTE_ID
        }

        const CLIENT_BASE = client.db('newdb');
        CLIENT_BASE.collection('users').deleteOne(noteid, function(err) {
            if (err) throw err;

            console.log('[INFO] DEL successful.');
            
            res.send("Delete Successful.")
            client.close();
        });
    })
})

router.post('/', function(req, res){
    MongoClient.connect('mongodb://localhost:27017', {
        useUnifiedTopology:true
    }, 
    
    function(err,client){
        if(err) throw err;

        let nodeid = {
            NOTE_ID: req.body.NOTE_ID
        }

        const CLIENT_BASE = client.db('newdb'); 
        CLIENT_BASE.collection('users').updateOne(nodeid, { $set: req.body }, { upsert: true }, function(err){
            if(err) throw err;

            console.log("[INFO] POST successful.");
            client.close();
        });
    });
})

module.exports = router;