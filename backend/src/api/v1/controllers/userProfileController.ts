import { Request, Response } from "express";
import {
    createUserProfile,
    getAllUserProfiles,
    getUserProfileById,
    updateUserProfile,
    deleteUserProfile,
} from "../services/userProfileService";

export const createProfile = async (req: Request, res: Response) => {
    try {
        const newProfile = await createUserProfile(req.body);
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(500).json({ error: "Create failed" });
    }
};

export const getAllProfiles = async (req: Request, res: Response) => {
    try {
        const profiles = await getAllUserProfiles();
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch profiles" });
    }
};

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

export const deleteProfile = async (req: Request, res: Response) => {
    const id = req.params.id as string;

    try {
        await deleteUserProfile(id);
        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Delete failed" });
    }
};
