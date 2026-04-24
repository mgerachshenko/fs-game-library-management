import type { UserProfile } from "@shared/types/UserProfile";
//import { USER_PROFILES_TESTDATA } from "../apis/userProfiles.testdata";
import { useAuth } from "@clerk/clerk-react";

const API_BASE = `${import.meta.env.VITE_API_BASE_URL}/api/v1/profiles`;

export class UserProfileRepository {
    async create(token: string, profile: UserProfile): Promise<UserProfile> {
        const res = await fetch(`${API_BASE}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profile),
        });

        if (!res.ok) throw new Error("Create failed");
        return res.json();
    }

    async getAll(): Promise<UserProfile[]> {
        const res = await fetch(API_BASE);

        if (!res.ok) return [];

        return res.json();
    }

    async getCurrentUserProfile(
        token: string,
    ): Promise<UserProfile | undefined> {
        const res = await fetch(`${API_BASE}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) return undefined;

        return res.json();
    }

    async updateDisplayName(
        token: string,
        value: string,
    ): Promise<UserProfile | undefined> {
        const res = await fetch(`${API_BASE}/me`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ displayName: value }),
        });

        if (!res.ok) return undefined;

        return res.json();
    }

    async updateBio(
        token: string,
        value: string,
    ): Promise<UserProfile | undefined> {
        const res = await fetch(`${API_BASE}/me`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ bio: value }),
        });

        if (!res.ok) return undefined;

        return res.json();
    }

    async updateAvatar(
        token: string,
        value: string | null,
    ): Promise<UserProfile | undefined> {
        const res = await fetch(`${API_BASE}/me`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ avatarUrl: value }),
        });

        if (!res.ok) return undefined;

        return res.json();
    }

    async delete(token: string): Promise<boolean> {
        const res = await fetch(`${API_BASE}/me`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return res.ok;
    }
}
export const userProfileRepository = new UserProfileRepository();
