import { useEffect, useState } from "react";
import type { UserProfile } from "@shared/types/UserProfile";
import { userProfileService } from "../services/userProfileService";
import { useAuth } from "@clerk/clerk-react";

export function useUserProfile(userId: string) {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const { getToken } = useAuth();

    useEffect(() => {
        if (!userId) return;

        const loadProfile = async () => {
            const token = await getToken();
            if (!token) return;

            const data = await userProfileService.getProfile(token);
            setProfile(data ?? null);
        };

        loadProfile();
    }, [userId, getToken]);

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

    return {
        profile,
        displayName: profile?.displayName ?? "",
        bio: profile?.bio ?? "",
        avatarUrl: profile?.avatarUrl ?? null,
        setDisplayName: updateDisplayName,
        setBio: updateBio,
        setAvatarUrl: updateAvatar,
    };
}
