import type { ReactNode } from "react";
import { useUserProfile } from "../hooks/useUserProfile";
import { ProfileContext } from "./ProfileContext";
import { useUser } from "@clerk/clerk-react";

export function ProfileProvider({ children }: { children: ReactNode }) {
    const { user, isLoaded } = useUser();

    const profileState = useUserProfile(user?.id ?? "");

    // if Clerk still loading
    if (!isLoaded) {
        return <div>Loading user...</div>;
    }

    // Not Log In
    if (!user) {
        return (
            <ProfileContext.Provider value={null}>
                {children}
            </ProfileContext.Provider>
        );
    }

    // User Logged in
    return (
        <ProfileContext.Provider value={profileState}>
            {children}
        </ProfileContext.Provider>
    );
}
