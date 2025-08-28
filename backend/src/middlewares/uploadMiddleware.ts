import multer from "multer";
import path from "path";

export const avatarStorage = multer({ storage: multer.memoryStorage() });

export const productStorage = multer({ storage: multer.memoryStorage() });

export const bannerStorage = multer({ storage: multer.memoryStorage() });
