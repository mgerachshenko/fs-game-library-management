import { createContext } from "react";
import { useUserProfile } from "../hooks/useUserProfile";

type ProfileContextType = ReturnType<typeof useUserProfile>;

export const ProfileContext = createContext<ProfileContextType | null>(null);
