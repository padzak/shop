import { createRouter } from 'next-connect';
import bcrypt from 'bcrypt';
import { validateEmail } from '@/utils/validation';
import db from '@/utils/db';
import axios from 'axios';
import User from '@/models/User';
import { createResetToken } from '@/utils/tokens';
import { sendEmail } from '@/utils/sendEmail';
import { resetPasswordEmailTemplate } from '@/emails/resetPasswordEmailTemplate';

const router = createRouter();

router.put(async (req, res) => {
    try {
        await db.connectDb();
        const { user_id, password } = req.body;
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(400).json({ message: "This user account does not exist." });
        }
        const encryptedPassword = await bcrypt.hash(password, 12);
        await user.updateOne({
            password: encryptedPassword,
        });
        res.json({
           email: user.email, 
        });
        await db.disconnectDb();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router.handler();