var express = require('express');
var router = express.Router();
var models = require('../db/models/index');


/* GET home page. */

router.get('/', function(req, res, next){
  models.Director.findAll({}).then(function(directors) {
    res.render('directors/directors', {
      title: 'Directors',
      directors: directors
    });
  });
});

router.get('/:id', function(req, res, next){
  models.Director.findById(req.params.id).then(function(director) {
    res.render('directors/profile', {
      title: 'Director Profile',
      director: director
    });
  });
});

module.exports = router;
