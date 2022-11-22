const Goal = require('../models/goals');
const { ObjectId } = require('mongodb');


exports.addGoal = async (req, res, next) => {
    const newGoal = new Goal(req.body);
    newGoal.steps = [];
    try {
        await newGoal.save()
        res.status(201).json({ success: true, data: newGoal });
    } catch (error) {
        res.status(201).json({ success: false, data: "Error saving goal" });
    }
}

exports.getAllGoals = async (req, res, next) => {
    const goals = await Goal.find({ user_id: new ObjectId(req.params.user_id) })
    res.status(200).json({ success: true, data: goals })
}

exports.getGoalById = async (req, res, next) => {
    console.log("goal", req.params.goal_id)
    const goal = await Goal.findOne({ _id: new ObjectId(req.params.goal_id) })
    res.status(200).json({ success: true, data: goal })
}

exports.deleteGoal = async (req, res, next) => {
    try {
        await Goal.findByIdAndDelete(req.params.goal_id)
        res.status(200).json({ success: true, data: "Goal deleted" });
    } catch (error) {
        res.status(200).json({ success: false, data: "Error deleting goal" });
    }
}

exports.updateGoal = async (req, res, next) => {
    const newGoal = req.body;
    console.log(newGoal, req.params)
    try {
        await Goal.findOneAndUpdate(req.params.goal_id, req.body)
        res.status(200).json({ success: true, data: "Goal updated" });
    } catch (error) {
        res.status(200).json({ success: false, data: "Error updating goal" });
    }
}


exports.updateStep = async (req, res, next) => {
    const newStep = req.body;
    try {
        const result=await Goal.updateOne({ _id: new ObjectId(req.params.goal_id) , 'steps._id':new ObjectId(req.params.step_id)}, {$set:{'steps.$':newStep}})
        res.status(200).json({success:true, data: result});
    } catch (error) {
        res.status(200).json({success:false, data: "Error updating step"});
    }
}

exports.addStep = async (req, res, next) => {
    const newStep = req.body;
    try {
        await Goal.findByIdAndUpdate(req.params.goal_id, { $push: { steps: newStep } })
        res.status(200).json({success:true, data:"Step successfully added"});
    } catch (error) {
        res.status(200).json({success:false, data: "Error adding step"});
    }
}

exports.deleteStep = async (req, res, next) => {
    try {
        await Goal.findByIdAndUpdate(req.params.goal_id, { $pull:{ steps:{'_id': new ObjectId(req.params.step_id)}}})
        res.status(200).json({success:true, data: "Step successfully deleted"});
    } catch (error) {
        res.status(400).json({success:false, data: "Error deleting step"});
    }
}