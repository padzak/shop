import { createRouter } from "next-connect";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const router = createRouter();
router.use(
  fileUpload({
    useTempFiles: true,
  })
);

export const config = {
  api: {
    bodyParser: false,
  },
};

router.post(async (req, res) => {
  try {
    let files = Object.values(req.files).flat();

    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
});

export default router.handler();
