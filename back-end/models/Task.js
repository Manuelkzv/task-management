const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creationDate: { type: Date, required: true },
  status: { type: Number, required: true },
  lastModifiedDate: { type: Date, required: false },
  createdBy: { type: mongoose.Schema.ObjectId, required: false },
  assignedTo: { type: mongoose.Schema.ObjectId, required: false },
});
module.exports = mongoose.model('Task', taskSchema);
