const { Router } = require('express');
const SuperheroController = require('../controllers/superhero.controller.js');
const paginate = require('../middlewares/paginate.mw');
const { uploadImages } = require('../middlewares/file.upload');

const superheroRouter = Router();

superheroRouter
  .route('/')
  .post(uploadImages, SuperheroController.createSuperhero)
  .get(paginate, SuperheroController.getAllSuperheroes);

superheroRouter
  .route('/:id')
  .get(SuperheroController.getSuperhero)
  .patch(uploadImages, SuperheroController.updateSuperhero)
  .delete(SuperheroController.deleteSuperhero);

module.exports = superheroRouter;
