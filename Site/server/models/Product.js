import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
  code:  { type: String, required: true, unique: true },  // PID001, PID002...
  name:  { type: String, required: true },
  image: { type: String }                                   // filename under public/uploads
}, { timestamps: true });

export default mongoose.model('Product', productSchema);