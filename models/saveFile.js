const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const saveFileSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: "User"},
  gameState: {type: Array}
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const SaveFile = mongoose.model('SaveFile', saveFileSchema);

module.exports = SaveFile;