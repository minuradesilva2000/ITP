import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getPayments, getPayment, updatePayment, deletePayment } from '../controllers/paymentController.js';

const router = express.Router();

router.get('/', authMiddleware, getPayments);
router.get('/:id', authMiddleware, getPayment);
router.put('/:id', authMiddleware, updatePayment);
router.delete('/:id', authMiddleware, deletePayment);

export default router;