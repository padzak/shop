import { createRouter } from 'next-connect';
import db from '@/utils/db';

const router = createRouter();

router.post(async (req, res) => {
    try {
        await db.connectDb();
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router.handler();