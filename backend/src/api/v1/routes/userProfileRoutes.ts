import { Router } from "express";
import {
    getProfile,
    updateProfile,
} from "../controllers/userProfileController";

const router = Router();

router.get("/:id", getProfile);
router.put("/:id", updateProfile);

export default router;
