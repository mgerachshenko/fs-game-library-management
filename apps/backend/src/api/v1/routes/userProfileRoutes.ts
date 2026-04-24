import { Router } from "express";
import {
    //createProfile,
    getAllProfiles,
    getProfile,
    updateProfile,
    deleteProfile,
} from "../controllers/userProfileController";

const router = Router();

// router.post("/", createProfile);
router.get("/", getAllProfiles);
router.get("/me", getProfile);
router.put("/me", updateProfile);
router.delete("/me", deleteProfile);

export default router;
