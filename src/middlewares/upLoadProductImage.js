import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/products");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `product_${Date.now()}${ext}`);
  },
});

const upLoadProductImage = multer({ storage });
export default upLoadProductImage;

// subir archivo a carpeta local funciona pero vamos a mejorarla, eliminar despues que quede todo ok 
