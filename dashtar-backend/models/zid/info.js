const mongoose = require('mongoose');
const { Schema } = mongoose;

const zidSchema = new Schema({
  accessToken: { type: String, required: true },
  date: { type: Date, default: Date.now },
  role: { type: String, required: true },
  xManagerToken: { type: String, required: true },
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store' }
});

const Zid = mongoose.model('Zid', zidSchema);

module.exports = Zid;
