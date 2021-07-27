const { Superhero } = require('../models');
const createError = require('http-errors');

module.exports.createSuperhero = async (req, res, next) => {
  try {
    const { body, files } = req;

    const createdHero = await Superhero.create(body);

    files.forEach(async file => {
      await createdHero.createImage({
        imagePath: file.filename,
      });
    });
    const images = files.map(file => file.filename); //???

    res.status(201).send({
      data: { createdHero, images },
    });
  } catch (err) {
    next(err);
  }
};
module.exports.updateSuperhero = async (req, res, next) => {
  try {
    const {
      params: { id },
      body, files
    } = req;
  } catch (err) {
    next(err);
  }
};