const { Superpower } = require('../models');
const createError = require('http-errors');

module.exports.createSuperpower = async (req, res, next) => {
  try {
    const { body } = req;

    const createdSuperpower = await Superpower.create(body);

    res.status(201).send({
      data: { createdSuperpower },
    });
  } catch (err) {
    next(err);
  }
};

module.exports.updateSuperpower = async (req, res, next) => {
  try {
    const {
      body,
      params: { id },
    } = req;

    const [rowsCount, updatedSuperpower] = await Superpower.update(body, {
      where: { id },
      attributes: ['id', 'superpower'],
      returning: true,
    });

    if (rowsCount !== 1) {
      return next(createError(400, "Task can't be updated"));
    }

    res.send({
      data: updatedSuperpower,
    });
  } catch (err) {
    next(err);
  }
};
