import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { addOrder, getOrders, getOrder, updateOrder, deleteOrder } from '../controllers/orderController.js';

const router = express.Router();

router.post('/add', authMiddleware, addOrder);
router.get('/:id', authMiddleware, getOrder);
router.get('/', authMiddleware, getOrders);
router.put('/:id', authMiddleware, updateOrder);
router.delete('/:id', authMiddleware, deleteOrder);

export default router;