const { Router } = require('express');
const SuperpowerController = require('../controllers/superpower.controller');

const superpowerRouter = Router();

superpowerRouter.post('/', SuperpowerController.createSuperpower);
superpowerRouter.patch('/:id', SuperpowerController.updateSuperpower);
superpowerRouter.delete('/:id', SuperpowerController.deleteSuperpower);

module.exports = superpowerRouter;
