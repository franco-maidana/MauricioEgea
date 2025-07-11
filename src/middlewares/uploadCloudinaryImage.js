import multer from 'multer';
const storage = multer.memoryStorage();
const uploadCloudinaryImage = multer({ storage });
export default uploadCloudinaryImage;
