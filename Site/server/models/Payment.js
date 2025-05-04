import mongoose from 'mongoose';
const { Schema } = mongoose;

const paymentSchema = new Schema({
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  total: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["Pending", "Payed"], default: "Pending" },
  payedDate: { type: Date, default: null },  // When payment is actually made
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;