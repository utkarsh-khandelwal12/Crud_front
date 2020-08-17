const mongoose = require("mongoose");

var studentSchema = new mongoose.Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Age: {
        type: Number,
        required: true
    },
    College: {
        type: String,
        required: true
    },
    Batch: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Student", studentSchema);