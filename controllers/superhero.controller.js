const { Superhero } = require('../models');
const createError = require('http-errors');

module.exports.createSuperhero = async (req, res, next) => {
  try {
    const { body, files } = req;

    const createdHero = await Superhero.create(body);
    // console.log(createdUser);
    res.status(201).send({
      data: createdHero,
    });
  } catch (err) {
    next(err);
  }
};