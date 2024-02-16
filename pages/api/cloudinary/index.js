import { createRouter } from "next-connect";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import { imageMiddleware } from "@/middleware/imageMiddleware";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const router = createRouter();
router
  .use(
    fileUpload({
      useTempFiles: true,
    })
  )
  .use(imageMiddleware);

export const config = {
  api: {
    bodyParser: false,
  },
};

router.post(async (req, res) => {
  try {
    let files = Object.values(req.files).flat();
    let images = [];
    for (const file of files) {
      const img = await uploadToCloudinaryHandler(file, path);
      images.push(img);
      removeTmp(file.tempFilePath);
    }
    res.status(200).json(files);
  } catch (err) {
    res.status(500).json({ message: error.message });
  }
});

router.delete(async (req, res) => {
  let image_id = req.body.public_id;
  cloudinary.v2.uploader.destroy(image_id, async (err, result) => {
    if (err) return res.status(400).json({ success: false, err });
    res.json({ success: true, message: "Deleted image" });
  });
});

const uploadToCloudinaryHandler = async (file, path) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: path },
      (err, result) => {
        if (err) {
          removeTmp(file.tempFilePath);
          return res.status(400).json({ message: "Upload failed" });
        }
        resolve({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    );
  });
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

export default router.handler();
