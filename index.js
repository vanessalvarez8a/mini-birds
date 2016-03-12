var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongojs = require('mongojs');
var port = 9050;
var corsOptions = {
  origin: 'http://localhost:9050' // cors just is going accept those api requests from our OWN server
}

var app = express();
app.use(bodyParser.json());
app.use(cors(corsOptions));

var db = mongojs('birds', ['products']);
var products = db.collection('products');

db.products.find(function(err, results) {
  // console.log(err, results);
});


//the readme shows a much longer api but all we want is until sighting
app.get('/api/sighting', function(req, res) {
  console.log('test');
  db.products.find(function(err, birds) {
    res.send(birds);
  })
})


app.put('/api/sighting/:id', function(req, res) { //one specific type of bird
  db.products.update({_id: mongojs.ObjectId(req.params.id)}, {$set: req.body}, function(err, results) {
    if(!err) {
      console.log(results);
      return res.status(200).send(results);
    }
  })
})


app.post('/api/sighting', function(req, res) {
  db.products.insert(req.body, function(err, results) {
    if(!err) {
      console.log(results);
      res.status(200).send(results);
    }
    else{
      console.log(err)
    }
  })
})

app.delete('/api/sighting/:id', function (req, res) {
  db.products.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, results){
    if(!err){
      console.log(results);
      res.status(200).send(results);
    }
    else{
      res.status(500).send(err);
      console.log(err);
    }
  })
});


app.listen(port, function() {
  console.log('Listening on ' + port);
});
