import { useEffect, useState } from "react";
import type { UserProfile } from "@shared/types/UserProfile";
import { userProfileService } from "../services/userProfileService";
import { useAuth } from "@clerk/clerk-react";

export function useUserProfile(userId: string) {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const { getToken, isLoaded } = useAuth();

    useEffect(() => {
        if (!userId || !isLoaded) return;

        const loadProfile = async () => {
            const token = await getToken();
            if (!token) return;

            const data = await userProfileService.getProfile(token);
            setProfile(data ?? null);
        };

        loadProfile();
    }, [userId, getToken, isLoaded]);

    async function updateDisplayName(value: string) {
        const token = await getToken();
        if (!token) return;

        const updated = await userProfileService.updateDisplayName(
            token,
            value,
        );
        if (updated) setProfile(updated);
    }

    async function updateBio(value: string) {
        const token = await getToken();
        if (!token) return;

        const updated = await userProfileService.updateBio(token, value);
        if (updated) setProfile(updated);
    }

    async function updateAvatar(value: string | null) {
        const token = await getToken();
        if (!token) return;

        const updated = await userProfileService.updateAvatar(token, value);
        if (updated) setProfile(updated);
    }

    async function saveProfile(patch: Partial<UserProfile>) {
        const token = await getToken();
        if (!token) return;

        let updated: UserProfile | null = profile;

        if (!updated) return;

        if (patch.displayName !== undefined) {
            const result = await userProfileService.updateDisplayName(
                token,
                patch.displayName,
            );
            if (result) updated = result;
        }

        if (patch.bio !== undefined) {
            const result = await userProfileService.updateBio(token, patch.bio);
            if (result) updated = result;
        }

        if (patch.avatarUrl !== undefined) {
            const result = await userProfileService.updateAvatar(
                token,
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
