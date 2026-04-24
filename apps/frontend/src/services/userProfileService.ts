import type { UserProfile } from "@shared/types/UserProfile";
import { userProfileRepository } from "../repositories/userProfileRepo";

export class UserProfileService {
    private repo = userProfileRepository;

    async getProfile(token: string): Promise<UserProfile | undefined> {
        return this.repo.getCurrentUserProfile(token);
    }

    async updateDisplayName(token: string, value: string) {
        const trimmed = value.trim();

        if (trimmed.length < 2) {
            return undefined;
        }

        return this.repo.updateDisplayName(token, trimmed);
    }

    async updateBio(token: string, bio: string) {
        const cleaned = bio.trim();
        return this.repo.updateBio(token, cleaned);
    }

    async updateAvatar(token: string, avatarUrl: string | null) {
        return this.repo.updateAvatar(token, avatarUrl);
    }
}

export const userProfileService = new UserProfileService();
