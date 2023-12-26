var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/xiaomi');
var app = express();

// view engine setup
app.set('views', './views');
app.set('view engine', 'pug');

var model = require('./models/user.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  model.find({})
    .then((student) => {
      res.render('layout', { model: student });
    })
    .catch((err) => {
      console.log(err);
    })
});

app.get('/addanentry', (req, res) => {
  res.render('index');
});

app.post('/addyourentry', (req, res) => {
  var msg = new model({ name: req.body.name, age: req.body.age });
  msg.save();
  res.redirect('/');
});

app.get('/edit/:id', function(req, res) {
    model.findById(req.params.id)
        .then((data) => {
            console.log(data._id)
            res.render('edit', {
                data: data
            });
        })
        .catch((error) => {
            // Handle any other errors that might occur during the database query
            console.error('Error:', error);
            res.status(500).send('Internal Server Error');
        });
});

app.post('/edityourentry/:id', (req, res) => {
  const updateFields = {
    name: req.body.name,
    age: req.body.age
  };

  const query = { _id: req.params.id };

  model.updateOne(query, updateFields)
    .then(() => {
      console.log("Update success");
      res.redirect('/')
    })
    .catch((err) => {
      console.error("Update error:", err);
      res.status(500).send("Update error");
    });
});


app.listen(8080);
