const { Router } = require('express');
const SuperheroController = require('../controllers/superhero.controller.js');
const multer = require('multer');
const path = require('path');
const { STATIC_PATH } = require('../config/config');
// const paginate = require('../middlewares/paginate.mw');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(STATIC_PATH, 'images'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});
const upload = multer({ storage });

const superheroRouter = Router();

superheroRouter.post(
  '/',
  upload.array('images', 5),
  SuperheroController.createSuperhero
);
// userRouter.get('/', paginate, UserController.getAllUsers);
// userRouter.get('/:id', UserController.getUser);
superheroRouter.patch(
  '/:id',
  upload.array('images', 5),
  SuperheroController.updateSuperhero
);
superheroRouter.delete('/:id', SuperheroController.deleteSuperhero);

module.exports = superheroRouter;
