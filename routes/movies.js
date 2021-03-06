var express = require('express');
var router = express.Router();
var models = require('../db/models/index');

/* GET movies . */
router.get('/', (req, res, next) => {
  models.Movie.findAll({}).then( (movies) => {
    res.render('movies', {
      title:'Movies Listing',
      movies:movies
    })
  })
});

/* get movies id */
router.get('/:id', function(req, res, next) {
  models.Movie.findById(req.params.id).then(function(movies) {
    res.render('./movies/index', { movies: movies });
  });
});

/* get movies id - edit */
router.get('/:id/edit', function(req, res, next) {
  models.Movie.findById(req.params.id).then(function(movies) {
    res.render('./movies/edit', { movies: movies });
  });
});

/* Delete a movie */
router.delete('/:id', function(req, res, next) {
  models.Movie.destroy({
    where: { id: req.params.id }
  }).then(function(movies) {
    res.redirect('/movies');
  });
});

// put edited movies

router.put('/:id', function(req, res, next) {
  models.Movie.update({
    title: req.body.title,
    synopsis: req.body.synopsis

  }, { where: { id: req.params.id } }).then(function() {
    res.redirect('/movies/' + req.params.id);
  });
});

// create new movies - page
router.get('/new', (req, res, next) => {
  res.render('./movies/new')
});

// posting a new movie
router.post('/', function(req, res, next) {
  models.Movie.create({
    title: req.body.title,
    synopsis: req.body.synopsis
  }).then(function() {
    res.redirect('/')
  });
});


module.exports = router;
