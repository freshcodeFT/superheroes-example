const { Router } = require('express');
const superheroRouter = require('./superhero');
// const taskRouter = require('./task');
// const groupRouter = require('./group');

const router = Router();

router.use('/users', superheroRouter);
// router.use('/tasks', taskRouter);
// router.use('/groups', groupRouter);

module.exports = router;