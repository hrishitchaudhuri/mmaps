var express = require('express');
var router = express.Router();
var app = express();
var MongoClient = require('mongodb').MongoClient;

router.post('/', function(req, res){
  MongoClient.connect('mongodb://localhost:27017', {
      useUnifiedTopology:true
  }, 
  
  function(err,client){
      if(err) throw err;

      var name = req.body.name; 
      var email =req.body.email; 
    
      var data = { 
          "name": name, 
          "email":email, 
      } 

      const db = client.db('newdb'); 
      db.collection('signup').insertOne(data,function(err, collection){ 
          if(err) throw err;

          console.log("[INFO] POST successful.");
          client.close();
      });
  });
});

module.exports = router;