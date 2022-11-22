const mongoose = require('mongoose');
const { Schema } = mongoose;

const stepSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, required: true },
    deadline: Number,
}, {
    versionKey: false
})

const goalSchema = new Schema({
    user_id: mongoose.ObjectId,
    title: { type: String, required: true },
    description: String,
    deadline: Number,
    steps: [stepSchema]
}, {
    versionKey: false
});

const Model = mongoose.model('Goal', goalSchema);
module.exports = Model;