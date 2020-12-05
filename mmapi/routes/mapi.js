var url = require('url');
var qs = require('querystring');
var fs = require('fs');
var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

router.get('/', function(req, res, next){
    /*
    res.writeHead(200, {
        'Content-type':'text/plain'
    });

    var REQ_URL = url.parse(req.url);
    var FILE_PATH = REQ_URL.pathname;

    var REQ_QUERY = REQ_URL.query;
    var QOBJ = qs.parse(REQ_QUERY);

    MongoClient.connect('mongodb://localhost:27017', {
        useUnifiedTopology: true
    }), 
    function(err, client) {
        if (err) throw err;

        const CLIENT_BASE = client.db('new');
        CLIENT_BASE.collection('users').findOne(QOBJ, function(err, docs) {
            res.send(docs);
        });
    }
    */

    console.log("Got GET request");
	MongoClient.connect('mongodb://localhost:27017',{
		useUnifiedTopology:true
    }, 
    
    function(err,client){
        if(err) throw err;
        
        console.log('Reached within Mongo');
		const db = client.db('newdb'); //use newdb;
		db.collection('post').find({}).toArray(function(err,objs){
            if (err) throw err;
            
            console.log("Did we get here?");
            res.end(JSON.stringify(objs));

            console.log(objs);
            console.log("Those were the objs");
        });
	});
    
    next();
});

router.post('/', function(req, res, next){
    /*
    var REQ_URL = url.parse(req.url);
    var FILE_PATH = REQ_URL.pathname;

    let body = [];
    req.on('data', (chunk)=>{
        body.push(chunk);
    })

    .on('end', ()=>{
        body = Buffer.concat(body).toString();

        MongoClient.connect('mongodb://localhost:27017', {
            useUnifiedTopology:true
        }, 

        function(err, client){
            if(err) throw err;
        
            const CLIENT_BASE = client.db('newdb');
            fs.readFile(FILE_PATH.substr(1), (err, data) => {
                OBJS = JSON.parse(data);
                
                CLIENT_BASE.collection('users').insertMany(objs,
                    function(err,res) {
                        if(err) throw err;
                    
                        response.write(res.insertedCount+' document(s) inserted..')
                        client.close();
                        response.end()
                })
            })
        })
    })
    */

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