const express = require('express');
const router = express.Router();

const goalcontroller = require('../controllers/goalcontroller'); 


router.get('/:user_id', goalcontroller.getAllGoals);
router.post('/', goalcontroller.addGoal);
router.get('/goal/:goal_id', goalcontroller.getGoalById);
router.delete('/goal/:goal_id', goalcontroller.deleteGoal);
router.patch('/goal/:goal_id/updatestep/:step_id', goalcontroller.updateStep)
router.patch('/goal/:goal_id/deletestep/:step_id', goalcontroller.deleteStep)
router.patch('/goal/:goal_id/addstep', goalcontroller.addStep)

module.exports = router;