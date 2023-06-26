import { createRouter } from 'next-connect';
import bcrypt from 'bcrypt';
import { validateEmail } from '@/utils/validation';
import db from '@/utils/db';
import User from '@/models/User';
import { createActivationToken } from '@/utils/tokens';
import { sendEmail } from '@/utils/sendEmail';

const router = createRouter();

router.post(async (req, res) => {
    try {
        await db.connectDb();
        const { email } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: "This email does not exist." });
        }
        const userId = user._id.toString();
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router.handler();