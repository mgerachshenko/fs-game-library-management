import type { UserProfile } from "@shared/types/UserProfile";
//import { USER_PROFILES_TESTDATA } from "../apis/userProfiles.testdata";

const API_BASE = "http://localhost:3001/api/v1/profiles";

export class UserProfileRepository {
    async create(profile: UserProfile): Promise<UserProfile> {
        const res = await fetch(API_BASE, {
            method: "POST",
            headers: {
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

    async getById(id: string): Promise<UserProfile | undefined> {
        const res = await fetch(`${API_BASE}/${id}`);

        if (!res.ok) return undefined;

        return res.json();
    }

    async update(
        id: string,
        patch: Partial<UserProfile>,
    ): Promise<UserProfile | undefined> {
        const res = await fetch(`${API_BASE}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(patch),
        });

        if (!res.ok) return undefined;

        return res.json();
    }

    async delete(id: string): Promise<boolean> {
        const res = await fetch(`${API_BASE}/${id}`, {
            method: "DELETE",
        });
        return res.ok;
    }
}
export const userProfileRepository = new UserProfileRepository();
