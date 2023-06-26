import { createRouter } from 'next-connect';
import bcrypt from 'bcrypt';
import { validateEmail } from '@/utils/validation';
import db from '@/utils/db';
import User from '@/models/User';
import { createResetToken } from '@/utils/tokens';
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
        const user_id = createResetToken({
            id: user._id.toString(),
        });        const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;
        sendEmail(email, url, "", "Activate your account");
        await db.disconnectDb();
        res.json({
            message: "Register success! Please activate your email to start.",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router.handler();