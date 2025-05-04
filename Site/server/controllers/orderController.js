import Order    from '../models/Order.js';
import Supplier from '../models/Supplier.js';
import Payment  from '../models/Payment.js';

// Add a new order (same as before, but return populated order)
export const addOrder = async (req, res) => {
  try {
    const { product, supplierId, price, quantity, date } = req.body;
    const supplier = await Supplier.findById(supplierId);
    if (!supplier) return res.status(404).json({ success: false, error: "Supplier not found" });

    const orderId = 'ORD' + Date.now();
    const total   = price * quantity;

    const newOrder = new Order({
      orderId,
      supplier: supplierId,
      product,
      price, quantity, total,
      placedDate: date || Date.now(),
      status: 'Placed'
    });
    await newOrder.save();

    // Create Payment
    await new Payment({ order: newOrder._id, total, paymentStatus: 'Pending' }).save();

    // Return populated order
    const populated = await Order.findById(newOrder._id)
      .populate('supplier', 'name business phone email')
      .populate('product',  'name');
    res.status(200).json({ success: true, order: populated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Add order server error" });
  }
};

// Get all orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('supplier', 'name business phone email')
      .populate('product',  'name');
    if (!orders) return res.status(404).json({ success: false, error: "No orders found." });
    res.status(200).json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ success: false, error: "Get orders server error" });
  }
};

// Get single order
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('supplier', 'name business phone email')
      .populate('product',  'name');
    if (!order) return res.status(404).json({ success: false, error: "Order not found" });
    res.status(200).json({ success: true, order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Get order server error" });
  }
};

// Update order
export const updateOrder = async (req, res) => {
  try {
    const { quantity, status, modifiedDate } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, error: "Order not found" });

    order.quantity     = quantity;
    order.status       = status;
    order.total        = order.price * quantity;
    if (['Received','Cancelled'].includes(status)) {
      order.modifiedDate = modifiedDate ? new Date(modifiedDate) : Date.now();
    }
    await order.save();

    // Update or create payment
    let payment = await Payment.findOne({ order: order._id });
    if (!payment) {
      payment = new Payment({ order: order._id, total: order.total, paymentStatus: 'Pending' });
    } else {
      payment.total = order.total;
    }
    await payment.save();

    const populated = await Order.findById(order._id)
      .populate('supplier', 'name business phone email')
      .populate('product',  'name');
    res.status(200).json({ success: true, order: populated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Update order server error" });
  }
};

// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ success: false, error: "Order not found" });
    await Payment.findOneAndDelete({ order: order._id });
    res.status(200).json({ success: true, message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: "Delete order server error" });
  }
};