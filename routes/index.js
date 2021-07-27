const { Router } = require('express');
const userRouter = require('./user');
const taskRouter = require('./task');
const groupRouter = require('./group');

const router = Router();

router.use('/users', userRouter);
router.use('/tasks', taskRouter);
router.use('/groups', groupRouter);

module.exports = router;