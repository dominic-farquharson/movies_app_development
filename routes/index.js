var express = require('express');
var router = express.Router();
var models = require('../db/models/index');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// create new movies - page
router.get('/new', (req, res, next) => {
  res.render('./movies/new')
  // res.send('yes')
});

// posting a new movie
router.post('/', function(req, res, next) {
  models.Movie.create({
    title: req.body.title,
    synopsis: req.body.synopsis
  }).then(function() {
    res.redirect('/movies')
  });
});

module.exports = router;
