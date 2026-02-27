import { useContext, useId, useState, useEffect } from "react";
import AvatarUpload from "./AvatarUpload";
import "./ProfilePage.css";
import { ProfileContext } from "../../../context/ProfileContext";
import { generalInputService } from "../../../services/inputService";

export default function ProfilePage() {
    const context = useContext(ProfileContext);

    if (!context) {
        throw new Error("ProfilePage must be used inside ProfileProvider");
    }

    const { profile, saveProfile } = context;

    const [draftDisplayName, setDraftDisplayName] = useState(
        profile.displayName,
    );
    const [draftBio, setDraftBio] = useState(profile.bio);
    const [draftAvatarUrl, setDraftAvatarUrl] = useState(profile.avatarUrl);
    const bioValidation = generalInputService(draftBio);
    const bioTooShort = draftBio.trim().length > 0 && !bioValidation.isValid;

    useEffect(() => {
        setDraftDisplayName(profile.displayName);
        setDraftBio(profile.bio);
        setDraftAvatarUrl(profile.avatarUrl);
    }, [profile]);

    const uid = useId();
    const displayNameId = `displayName-${uid}`;
    const bioId = `bio-${uid}`;

    const displayNameTooShort =
        draftDisplayName.trim().length > 0 &&
        draftDisplayName.trim().length < 2;

    const canSave =
        draftDisplayName.trim().length >= 2 && bioValidation.isValid;

    function handleSave() {
        saveProfile({
            displayName: draftDisplayName,
            bio: draftBio,
            avatarUrl: draftAvatarUrl,
        });
    }

    function handleCancel() {
        setDraftDisplayName(profile.displayName);
        setDraftBio(profile.bio);
        setDraftAvatarUrl(profile.avatarUrl);
    }

    return (
        <section className="profile">
            <header className="profile__header">
                <h2 className="profile__title">Profile</h2>
            </header>

            <div className="profile__grid">
                <div className="profile__card">
                    <h3>Preview</h3>

                    <div className="profile__preview">
                        <div className="profile__avatar-box">
                            {profile.avatarUrl ? (
                                <img
                                    className="profile__avatar-img"
                                    src={profile.avatarUrl}
                                    alt="User avatar"
                                />
                            ) : (
                                <div className="profile__avatar-placeholder">
                                    Null
                                </div>
                            )}
                        </div>

                        <div>
                            <p>
                                <strong>Name:</strong> {profile.name}
                            </p>
                            <p>
                                <strong>Display name:</strong>{" "}
                                {profile.displayName}
                            </p>
                            <p>
                                <strong>Bio:</strong> {profile.bio}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="profile__card">
                    <h3>Edit</h3>

                    <AvatarUpload
                        avatarUrl={draftAvatarUrl}
                        onChangeAvatarUrl={setDraftAvatarUrl}
                    />

                    <div className="profile__form">
                        <div>
                            <label htmlFor={displayNameId}>Display name</label>
                            <input
                                id={displayNameId}
                                value={draftDisplayName}
                                onChange={(e) =>
                                    setDraftDisplayName(e.target.value)
                                }
                            />
                            {displayNameTooShort && (
                                <p className="profile__error">
                                    Display name must be at least 2 characters.
                                </p>
                            )}
                        </div>

                        <div>
                            <label htmlFor={bioId}>Bio</label>
                            <textarea
                                id={bioId}
                                value={draftBio}
                                onChange={(e) => setDraftBio(e.target.value)}
                            />
                            {bioTooShort && (
                                <p className="profile__error">
                                    Bio must be at least 3 characters.
                                </p>
                            )}
                        </div>

                        <div className="profile__actions">
                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={!canSave}
                            >
                                Save
                            </button>

                            <button type="button" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
