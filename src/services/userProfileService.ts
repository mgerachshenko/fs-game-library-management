import type { UserProfile } from "../types/UserProfile";
import { userProfileRepository } from "../repositories/userProfileRepo";

export class UserProfileService {
    private repo = userProfileRepository;

    getProfiles(): UserProfile[] {
        return this.repo.getAll();
    }

    getProfileOrThrow(id: string): UserProfile {
        const p = this.repo.getById(id);
        if (!p) throw new Error("Profile not found");
        return p;
    }

    updateDisplayName(id: string, value: string) {
        return this.repo.update(id, { displayName: value });
    }

    updateBio(id: string, bio: string): UserProfile | undefined {
        const cleaned = bio.trim();
        return this.repo.update(id, { bio: cleaned });
    }

    updateAvatar(
        id: string,
        avatarUrl: string | null,
    ): UserProfile | undefined {
        return this.repo.update(id, { avatarUrl });
    }
}

export const userProfileService = new UserProfileService();
