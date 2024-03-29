import { createRouter } from 'next-connect';
import bcrypt from 'bcrypt';
import { validateEmail } from '@/utils/validation';
import db from '@/utils/db';
import User from '@/models/User';
import { createResetToken } from '@/utils/tokens';
import { sendEmail } from '@/utils/sendEmail';
import { resetPasswordEmailTemplate } from '@/emails/resetPasswordEmailTemplate';

const router = createRouter();

router.post(async (req, res) => {
    try {
        await db.connectDb();
        const { email } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "This email does not exist." });
        }
        const user_id = createResetToken({
            id: user._id.toString(),
        });        const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;
        sendEmail(email, url, "", "Reset password", resetPasswordEmailTemplate);
        await db.disconnectDb();
        res.json({
            message: "Reset password email has been sent!",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router.handler();