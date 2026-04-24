import { Request, Response } from "express";
import prisma from "../../../../prisma/client";
import { getAuth } from "@clerk/express";

export const createProfile = async (req: Request, res: Response) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const existing = await prisma.userProfile.findFirst({
            where: { clerkId: userId },
        });
        if (existing) {
            return res.status(200).json(existing);
        }

        const { name, displayName, bio, avatarUrl } = req.body;
        const newProfile = await prisma.userProfile.create({
            data: {
                id: userId,
                clerkId: userId,
                name: name ?? "New User",
                displayName: displayName ?? "Player",
                bio: bio ?? "",
                avatarUrl: avatarUrl ?? null,
                updatedAt: new Date(),
            },
        });

        res.status(201).json(newProfile);
    } catch (error) {
        res.status(500).json({ error: "Create failed" });
    }
};

export const getAllProfiles = async (_req: Request, res: Response) => {
    try {
        const profiles = await prisma.userProfile.findMany();
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch profiles" });
    }
};

export const getProfile = async (req: Request, res: Response) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        let profile = await prisma.userProfile.findFirst({
            where: { clerkId: userId },
        });

        if (!profile) {
            profile = await prisma.userProfile.create({
                data: {
                    id: userId,
                    clerkId: userId,
                    name: "New User",
                    displayName: "Player",
                    bio: "",
                    avatarUrl: null,
                    updatedAt: new Date(),
                },
            });
        }

        res.json(profile);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
};

export const updateProfile = async (req: Request, res: Response) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        const { displayName, bio, avatarUrl } = req.body;

        await prisma.userProfile.updateMany({
            where: { clerkId: userId },
            data: {
                ...(displayName !== undefined && { displayName }),
                ...(bio !== undefined && { bio }),
                ...(avatarUrl !== undefined && { avatarUrl }),
                updatedAt: new Date(),
            },
        });

        const updated = await prisma.userProfile.findFirst({
            where: { clerkId: userId },
        });

        res.json(updated);
    } catch (error) {
        res.status(500).json({ error: "Update failed" });
    }
};

export const deleteProfile = async (req: Request, res: Response) => {
    const { userId } = getAuth(req);

    if (!userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    try {
        await prisma.userProfile.deleteMany({
            where: { clerkId: userId },
        });

        res.json({ message: "Deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Delete failed" });
    }
};
