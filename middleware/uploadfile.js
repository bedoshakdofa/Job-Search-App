import multer from "multer";

import { v4 } from "uuid";
import AppError from "../utils/AppError.js";
const multerStorge = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, v4() + "-" + file.originalname);
    },
});

const multerFilter = (req, file, cb) => {
    if (
        file.mimetype.startsWith("image/") ||
        file.mimetype.startsWith("application/")
    ) {
        cb(null, true);
    } else {
        cb(
            new AppError(
                "Not an image or valid file type! Please upload only images or valid files.",
                400
            ),
            false
        );
    }
};

const upload = multer({
    storage: multerStorge,
    fileFilter: multerFilter,
});

export const uploadFile = upload.single("resume");
