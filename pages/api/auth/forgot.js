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
        const { name, email, password } = req.body;
        
        const url = `${process.env.BASE_URL}/activate/${activation_token}`;
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