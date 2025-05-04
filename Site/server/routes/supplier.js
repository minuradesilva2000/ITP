import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { addSupplier ,getSuppliers,getSupplier,upload, updateSupplier,deleteSupplier,getNextSupplierId} from '../controllers/supplierController.js'

    const router=express.Router()

    router.post('/add',authMiddleware,upload.single("image"),addSupplier)
    router.get('/:id',authMiddleware,getSupplier)
    router.get('/',authMiddleware,getSuppliers)
    router.put('/:id',authMiddleware,updateSupplier)
    router.delete('/:id', authMiddleware,deleteSupplier)
    router.get('/next-id', getNextSupplierId);

export default router    