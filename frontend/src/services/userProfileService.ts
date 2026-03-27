import type { UserProfile } from "../types/UserProfile";
import { userProfileRepository } from "../repositories/userProfileRepo";

export class UserProfileService {
    private repo = userProfileRepository;

    async getProfile(id: string): Promise<UserProfile | undefined> {
        return this.repo.getById(id);
    }

    async updateDisplayName(id: string, value: string) {
        const trimmed = value.trim();

        if (trimmed.length < 2) {
            return undefined;
        }

        return this.repo.update(id, { displayName: trimmed });
    }

    async updateBio(id: string, bio: string) {
        const cleaned = bio.trim();
        return this.repo.update(id, { bio: cleaned });
    }

    async updateAvatar(id: string, avatarUrl: string | null) {
        return this.repo.update(id, { avatarUrl });
    }
}

export const userProfileService = new UserProfileService();
