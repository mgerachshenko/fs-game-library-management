import { useEffect, useState } from "react";
import type { UserProfile } from "../types/UserProfile";
import { userProfileService } from "../services/userProfileService";

export function useUserProfile(userId: string) {
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const loadProfile = async () => {
            const data = await userProfileService.getProfile(userId);
            setProfile(data ?? null);
        };

        loadProfile();
    }, [userId]);

    async function updateDisplayName(value: string) {
        const updated = await userProfileService.updateDisplayName(
            userId,
            value,
        );
        if (updated) setProfile(updated);
    }

    async function updateBio(value: string) {
        const updated = await userProfileService.updateBio(userId, value);
        if (updated) setProfile(updated);
    }

    async function updateAvatar(value: string | null) {
        const updated = await userProfileService.updateAvatar(userId, value);
        if (updated) setProfile(updated);
    }

    async function saveProfile(patch: Partial<UserProfile>) {
        let updated = profile;

        if (!updated) return;

        if (patch.displayName !== undefined) {
            const result = await userProfileService.updateDisplayName(
                userId,
                patch.displayName,
            );
            if (result) updated = result;
        }

        if (patch.bio !== undefined) {
            const result = await userProfileService.updateBio(
                userId,
                patch.bio,
            );
            if (result) updated = result;
        }

        if (patch.avatarUrl !== undefined) {
            const result = await userProfileService.updateAvatar(
                userId,
                patch.avatarUrl,
            );
            if (result) updated = result;
        }

        setProfile(updated);
    }

    return {
        profile,
        displayName: profile?.displayName ?? "",
        bio: profile?.bio ?? "",
        avatarUrl: profile?.avatarUrl ?? null,
        setDisplayName: updateDisplayName,
        setBio: updateBio,
        setAvatarUrl: updateAvatar,
        saveProfile,
    };
}
