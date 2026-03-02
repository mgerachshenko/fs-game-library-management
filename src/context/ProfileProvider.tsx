import type { ReactNode } from "react";
import { useUserProfile } from "../hooks/useUserProfile";
import { ProfileContext } from "./ProfileContext";

export function ProfileProvider({
    userId,
    children,
}: {
    userId: string;
    children: ReactNode;
}) {
    const profileState = useUserProfile(userId);

    return (
        <ProfileContext.Provider value={profileState}>
            {children}
        </ProfileContext.Provider>
    );
}
