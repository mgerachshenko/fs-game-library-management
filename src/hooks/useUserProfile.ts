import { useState } from "react";
import type { UserProfile } from "../types/UserProfile";
import { userProfileService } from "../services/userProfileService";

export function useUserProfile(userId: string) {
    const [profile, setProfile] = useState<UserProfile>(() =>
        userProfileService.getProfileOrThrow(userId),
    );

    function updateDisplayName(value: string) {
        const updated = userProfileService.updateDisplayName(userId, value);
        if (updated) setProfile(updated);
    }

    function updateBio(value: string) {
        const updated = userProfileService.updateBio(userId, value);
        if (updated) setProfile(updated);
    }

    function updateAvatar(value: string | null) {
        const updated = userProfileService.updateAvatar(userId, value);
        if (updated) setProfile(updated);
    }

    function saveProfile(patch: Partial<UserProfile>) {
        let updated = profile;

        if (patch.displayName !== undefined) {
            const result = userProfileService.updateDisplayName(
                userId,
                patch.displayName,
            );
            if (result) updated = result;
        }

        if (patch.bio !== undefined) {
            const result = userProfileService.updateBio(userId, patch.bio);
            if (result) updated = result;
        }

        if (patch.avatarUrl !== undefined) {
            const result = userProfileService.updateAvatar(
                userId,
                patch.avatarUrl,
            );
            if (result) updated = result;
        }

        setProfile(updated);
    }

    return {
        profile,
        displayName: profile.displayName,
        bio: profile.bio,
        avatarUrl: profile.avatarUrl,
        setDisplayName: updateDisplayName,
        setBio: updateBio,
        setAvatarUrl: updateAvatar,
        saveProfile,
    };
}
