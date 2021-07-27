const { Superhero, Image } = require('../models');
const createError = require('http-errors');
const fs = require('fs');
const path = require('path');
const { STATIC_PATH } = require('../config/config');
module.exports.createSuperhero = async (req, res, next) => {
  try {
    const { body, files } = req;

    const createdHero = await Superhero.create(body);

    const images = await Promise.all(
      files.map(async file => {
        await createdHero.createImage(
          {
            imagePath: file.filename,
          },
          { returning: ['image_path'] }
        );
        return file.filename;
      })
    );

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
      body,
      files,
    } = req;

    const Hero = await Superhero.findByPk(id);
    const [rowsCount, updatedSuperhero] = await Superhero.update(body, {
      where: { id },
      returning: true,
    });
    const images = await Promise.all(
      files.map(async file => {
        await Hero.createImage(
          {
            imagePath: file.filename,
          },
          { returning: ['image_path'] }
        );
        return file.filename;
      })
    );
    res.status(200).send({
      data: { updatedSuperhero, images },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteSuperhero = async (req, res, next) => {
  try {
    const {
      params: { id },
    } = req;

    const images = await Promise.all(
      await Image.findAll({
        where: { heroId: id },
        attributes: ['image_path'],
      })
    );
    // const del = await Superhero.findByPk(id);
    // await del.removeImages(id)

    images.forEach(image => {
      const imagePath = image.dataValues.image_path;
      try {
        fs.unlinkSync(path.resolve(STATIC_PATH, 'images', imagePath));
      } catch (err) {}
    });

    const rowsCount = await Superhero.destroy({
      where: { id },
    });

    if (rowsCount !== 1) {
      return next(createError(404, 'User not found'));
    }

    res.send({ data: rowsCount });
  } catch (err) {
    next(err);
  }
};
