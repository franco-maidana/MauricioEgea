import multer from "multer";

const storage = multer.memoryStorage(); // ¡En memoria!

const uploadAvatar = multer({ storage });

export default uploadAvatar;
