const {
  Superhero,
  Image,
  Superpower,
  Sequelize,
  sequelize,
} = require('../models');
const { Op } = require('sequelize');
const queryInterface = sequelize.getQueryInterface();
const createError = require('http-errors');
const fs = require('fs');
const path = require('path');
const { STATIC_PATH } = require('../config/config');
module.exports.createSuperhero = async (req, res, next) => {
  try {
    const { body, files } = req;
    const createdHero = await Superhero.create(body);

    // const images = await Promise.all(
    //   files.map(async file => {
    //     await createdHero.createImage(
    //       {
    //         imagePath: file.filename,
    //       },
    //       { returning: ['image_path'] }
    //     );
    //     return file.filename;
    //   })
    // );

    const images = files.map(file => {
      return {
        hero_id: createdHero.id,
        image_path: file.filename,
        created_at: new Date(),
        updated_at: new Date(),
      };
    });
    await queryInterface.bulkInsert('images', images, {});

    const powers = await Superpower.findAll({
      where: {
        id: {
          [Op.in]: body.superpowers,
        },
      },
    });
    const powersArr = powers.map(power => {
      console.log(power.dataValues.id, 'power id');
      return {
        power_id: power.dataValues.id,
        hero_id: createdHero.id,
        created_at: new Date(),
        updated_at: new Date(),
      };
    });

    await queryInterface.bulkInsert('heroes_to_superpowers', powersArr, {});

    res.status(201).send({
      data: { createdHero, images, powersArr },
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
    body.superpowers.forEach(async power => {
      const superpower = await Superpower.findByPk(power);
      if (superpower) {
        await superpower.addSuperhero(createdHero);
      }
    });

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

    const images = await Image.findAll({
      where: { heroId: id },
      attributes: ['image_path'],
    });

    // const del = await Superhero.findByPk(id);
    // await del.removeImages(id)

    images.forEach(image => {
      const imagePath = image.dataValues.image_path;
      try {
        fs.unlink(path.resolve(STATIC_PATH, 'images', imagePath));
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

module.exports.getAllSuperheroes = async (req, res, next) => {
  try {
    const { pagination = {} } = req;
    const {
      count: rowsCount,
      rows: superheroes,
    } = await Superhero.findAndCountAll({
      ...pagination,
    });
    if (rowsCount === 0) {
      const err = createError(404, 'Superheroes not found');
      return next(err);
    }

    const HeroesWithImgsAndPowers = await Superhero.findAll({
      include: [
        {
          model: Superpower,
          attributes: ['id', 'superpower'],
          through: {
            attributes: [],
          },
        },
        { model: Image, attributes: ['image_path'] },
      ],
    });

    res.status(200).send({
      data: HeroesWithImgsAndPowers,
    });
  } catch (err) {
    next(err);
  }
};
