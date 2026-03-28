import { Router } from "express";
import {
    createProfile,
    getAllProfiles,
    getProfile,
    updateProfile,
    deleteProfile,
} from "../controllers/userProfileController";

const router = Router();

router.post("/", createProfile);
router.get("/", getAllProfiles);
router.get("/:id", getProfile);
router.put("/:id", updateProfile);
router.delete("/:id", deleteProfile);

export default router;
