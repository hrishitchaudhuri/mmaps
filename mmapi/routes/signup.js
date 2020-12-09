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

/*
router.post('/mailToAll', function(req, res) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mindmaps94@gmail.com',
          pass: 'mindMAPS-98'
        }
    });

    MongoClient.connect('mongodb://localhost:27017', {
        useUnifiedTopology:true
    }, 
    
    
    function(err, client) {
        const db = client.db('newdb');
        db.collection('signup').find({}).toArray(function(err, objs) {
            if (err) throw err;

            for (i = 0; i < objs.length; i++) {
                var mailOptions = {
                    from: 'mindmaps94@gmail.com',
                    to: objs[i].email,
                    subject: 'Sending Email using Node.js',
                    text: 'Hello' + toString(objs[i].name)
                };

                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    } else {
                      console.log('Email sent: ' + info.response);
                    }
                })
            }
        })
    })
})
*/

router.post('/', function(req, res){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mindmaps94@gmail.com',
          pass: 'mindMAPS-98'
        }
    });
  
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

      db.collection('signup').findOne(email, function(err,objs){
        if (objs) {
            var data = { 
                "name": name, 
                "email":email, 
            } 

            var mailOptions = {
                from: 'mindmaps94@gmail.com',
                to: email,
                subject: 'Hello!',
                text: 'Hello, Welcome to Mind Maps!'
            };
    
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
 
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
});

module.exports = router;