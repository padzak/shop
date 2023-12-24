import { createRouter } from 'next-connect';
import Product from '../../../models/Product';
import nextConnect from 'next-connect';
import db from '../../../utils/db';

const router = createRouter();

router.get(async (req, res) => {
    try {
        db.connectDb();
        const id = req.query.id;
        const style = req.query.style || 0;
        const size = req.query.size || 0;
        const product = await Product.findById(id).lean();
        
        console.log(id, style, size);
    } catch(error) {
        return res.statusCode(500).json({message: error.message});
    }
});

export default router.handler();