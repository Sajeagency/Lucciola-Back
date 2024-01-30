import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "public/images/uploads",
  filename: (req, file, cb) => {
    console.log("-->", file);
    cb(null, new Date().getTime() + path.extname(file.originalname));
  },
});
export const upload = multer({ storage });
