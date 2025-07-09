import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/avatars");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `avatar_${req.params.id}_${Date.now()}${ext}`);
  },
});

const uploadAvatar = multer({ storage });
export default uploadAvatar;
