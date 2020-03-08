const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
	studentName: {type: String, required: true},
	cohort: {type: String, required: true}, 
	saveSlots: [{type: Schema.Types.ObjectId, ref: "SaveFile"}]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;