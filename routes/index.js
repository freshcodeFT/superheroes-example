const { Router } = require('express');
const superheroRouter = require('./superhero');
const superpowerRouter = require('./superpower');

const router = Router();

router.use('/superheroes', superheroRouter);
router.use('/superpowers', superpowerRouter);

module.exports = router;
