var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();
var app = express();
var MongoClient = require('mongodb').MongoClient;

router.get('/', function(req, res) {
    res.writeHead(200, {'Content-type':'application/json'});
    MongoClient.connect('mongodb://localhost:27017', {
      useUnifiedTopology:true
  }, 

  function(err, client) {
      if (err) throw err;

      const db = client.db('newdb');
      db.collection('signup').find({}).toArray(function(err, objs) {
          if (err) throw err;

          res.write(JSON.stringify(objs));
          console.log(objs);

          res.end();
          client.close();
      })
  })
});

router.post('/', function(req, res){
      MongoClient.connect('mongodb://localhost:27017', {
      useUnifiedTopology:true
  }, 
  
  function(err,client){
      if(err) throw err;

      const db = client.db('newdb');

      var name = req.body.name; 
      var email =req.body.email; 
    
      var em = {
          "email" : email
      };

      db.collection('signup').findOne(em, function(err,objs){
        if (objs) {
            var data = { 
                "name": name, 
                "email":email, 
            } 
 
            db.collection('signup').insertOne(data,function(err, collection){ 
                if(err) throw err;

                console.log("[INFO] POST successful.");
                client.close();
            });
        }

        else {
            console.log("[INFO] User already exists.")
            client.close();
        }
      });
  });
  res.end();
});

module.exports = router;