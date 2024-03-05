import { createRouter } from "next-connect";
import cloudinary from "cloudinary";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import { imageMiddleware } from "@/middleware/imageMiddleware";
import fs from "fs";

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
  console.log("post request");
  try {
    console.log("request", req);
    const { path } = req.body;
    let files = Object.values(req.files).flat();
    let images = [];
    for (const file of files) {
      const img = await uploadToCloudinaryHandler(file, path);
      images.push(img);
      removeTmp(file.tempFilePath);
    }
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: err.message });
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
  return new Promise((resolve, reject) => {
    // Add reject to handle errors properly
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: path },
      (err, cloudinaryRes) => {
        if (err) {
          removeTmp(file.tempFilePath); // Cleanup even on error
          reject(new Error("Upload failed")); // Reject the promise on error
        } else {
          resolve({
            public_id: cloudinaryRes.public_id,
            url: cloudinaryRes.secure_url, // Ensure you're using secure_url for HTTPS
          });
        }
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
