import { useState } from "react";
import ProfilePage from "./page/profile/ProfilePage";

export default function TestProfile() {
    const [displayName, setDisplayName] = useState("PlayerOne");
    const [bio, setBio] = useState("");
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

    return (
        <main>
            <ProfilePage
                username="Dara W"
                displayName={displayName}
                setDisplayName={setDisplayName}
                bio={bio}
                setBio={setBio}
                avatarUrl={avatarUrl}
                setAvatarUrl={setAvatarUrl}
            />
        </main>
    );
}
