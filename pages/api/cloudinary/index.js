import { createRouter } from "next-connect";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

const router = createRouter();

router.post(async (req, res) => {

});


export default router.handler();