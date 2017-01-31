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

// render new page
router.get('/new', function(req,res,next){
  res.render('directors/new', {
      title: 'Add Director',
  });
});
//create new entry
router.post('/', function(req,res,next){
  models.Director.create({
    name: req.body.name
  }).then(function(director){
    res.redirect('/directors')
  });
});

// show individual profile
router.get('/:id', function(req, res, next){
  models.Director.findById(req.params.id).then(function(director) {
    res.render('directors/profile', {
      title: 'Director Profile',
      director: director
    });
  });
});

// delete individual director
router.delete('/:id', function(req,res, next) {
  models.Director.destroy({
    where: {id:req.params.id}
  }).then(function(director){
    res.redirect('/directors')
  });
});

// Bring user to edit profile page
router.get('/:id/edit', function(req,res,next){
  models.Director.findById(req.params.id).then(function(director) {
    res.render('directors/edit', {
      title: 'Edit Director',
      director: director
    });
  });
});

router.put('/:id', function(req, res, next) {
  models.Director.update({
    name: req.body.name
    }, {where: {id: req.params.id} }).then(function(){
    res.redirect('/directors/' + req.params.id);
    });
  });


module.exports = router;
