import express from 'express';
import { upload, addProduct, getAllProducts, getProductById, updateProduct, deleteProduct }
  from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();
router.use(authMiddleware);

router.get('/',        getAllProducts);
router.post('/add',    upload.single('image'), addProduct);
router.get('/:id',     getProductById);
router.put('/:id',     upload.single('image'), updateProduct);
router.delete('/:id',  deleteProduct);

export default router;