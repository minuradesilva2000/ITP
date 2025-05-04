import mongoose from 'mongoose';
const { Schema } = mongoose;

const counterSchema = new Schema({
  _id: { type: String, required: true }, // e.g. 'product'
  seq: { type: Number, default: 0 }
});

export default mongoose.model('Counter', counterSchema);