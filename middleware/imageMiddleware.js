import fs from "fs";

export const imageMiddleware = (req, res, next) => {
  try {
    if (!req.files) {
      return res.status(400).send("No files were chosen.");
    }
    let files = Object.values(req.files);
    for (const file of files) {
      if (
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/webp"
      ) {
        removeTmp(file.tempFilePath);
        return res.status(400).send("Only png, jpeg, and webp images are allowed.");
      }
      if (files.size > 1024 * 1024 * 3) {
        removeTmp(file.tempFilePath);
        return res.status(400).send("The image must be less than 3mb.");
      }
    }
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const removeTmp = (path) => {
    fs.unlink(path, (err) => {
      if (err) throw err;
    });
};