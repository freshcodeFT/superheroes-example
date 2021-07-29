const { Superpower } = require('../models');
const createError = require('http-errors');
/* CREATE */
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
/* UPDATE */
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
      return next(createError(400, "Superpower can't be updated"));
    }

    res.send({
      data: updatedSuperpower,
    });
  } catch (err) {
    next(err);
  }
};
/* DELETE */
module.exports.deleteSuperpower = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rowsCount = await Superpower.destroy({
      where: { id },
    });
    if (rowsCount !== 1) {
      return next(createError(404, 'Superpower not found'));
    }
    res.send({ data: rowsCount });
  } catch (err) {
    next(err);
  }
};
