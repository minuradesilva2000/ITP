import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
  orderId: { type: String, required: true, unique: true },
  supplier: { type: Schema.Types.ObjectId, ref: 'Supplier', required: true },
  product: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
  placedDate: { type: Date, default: Date.now },
  modifiedDate: { type: Date },
  status: { type: String, default: "Placed" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;