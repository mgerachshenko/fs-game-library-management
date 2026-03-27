import { Request, Response } from "express";
import {
    getUserProfileById,
    updateUserProfile,
} from "../services/userProfileService";

export const getProfile = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    try {
        const profile = await getUserProfileById(id);

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const { displayName, bio, avatarUrl } = req.body;

    try {
        const updated = await updateUserProfile(id, {
            displayName,
            bio,
            avatarUrl,
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "Update failed" });
    }
};
