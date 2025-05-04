import Product from '../models/Product.js';
import Counter from '../models/Counter.js';
import multer  from 'multer';
import path    from 'path';

// Multer setup for uploads → public/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/uploads'),
  filename:    (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname))
});
export const upload = multer({ storage });

// Get next PID### code
async function getNextCode() {
  const ctr = await Counter.findByIdAndUpdate(
    'product',
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return 'PID' + String(ctr.seq).padStart(3, '0');
}

// GET /api/product
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET /api/product/:id
export const getProductById = async (req, res) => {
  try {
    const p = await Product.findById(req.params.id);
    if (!p) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, product: p });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// POST /api/product/add
export const addProduct = async (req, res) => {
  try {
    const code = await getNextCode();
    const product = new Product({
      code,
      name: req.body.name,
      image: req.file ? req.file.filename : ''
    });
    await product.save();
    res.json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// PUT /api/product/:id
export const updateProduct = async (req, res) => {
  try {
    const data = { name: req.body.name };
    if (req.file) data.image = req.file.filename;
    const p = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    if (!p) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, product: p });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// DELETE /api/product/:id
export const deleteProduct = async (req, res) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};