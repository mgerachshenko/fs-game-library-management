import type { UserProfile } from "../types/UserProfile";
import { USER_PROFILES_TESTDATA } from "../apis/userProfiles.testdata";

export class UserProfileRepository {
    private profiles = [...USER_PROFILES_TESTDATA];

    getAll(): UserProfile[] {
        return [...this.profiles];
    }

    getById(id: string): UserProfile | undefined {
        return this.profiles.find((p) => p.id === id);
    }

    create(profile: UserProfile): UserProfile {
        this.profiles = [profile, ...this.profiles];
        return profile;
    }

    update(id: string, patch: Partial<UserProfile>): UserProfile | undefined {
        const idx = this.profiles.findIndex((p) => p.id === id);
        if (idx === -1) return undefined;

        const updated: UserProfile = {
            ...this.profiles[idx],
            ...patch,
            updatedAt: new Date().toISOString(),
        };

        this.profiles[idx] = updated;
        return updated;
    }

    delete(id: string): boolean {
        const before = this.profiles.length;
        this.profiles = this.profiles.filter((p) => p.id !== id);
        return this.profiles.length !== before;
    }
}

export const userProfileRepository = new UserProfileRepository();
