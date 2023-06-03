import { createRouter } from 'next-connect';
import { validateEmail } from '@/utils/validation';
import db from '@/utils/db';
import User from '@/models/User';

const router = createRouter();

router.post(async (req, res) => {
    try {
        await db.connectDb();
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Invalid email" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "This email is already taken" });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router.handler();