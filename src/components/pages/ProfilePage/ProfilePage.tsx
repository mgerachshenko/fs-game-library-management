import { useContext, useId } from "react";
import AvatarUpload from "./AvatarUpload";
import "./ProfilePage.css";
import { ProfileContext } from "../../../context/ProfileContext";

export default function ProfilePage() {
    const context = useContext(ProfileContext);

    if (!context) {
        throw new Error("ProfilePage must be used inside ProfileProvider");
    }

    const {
        profile,
        displayName,
        setDisplayName,
        bio,
        setBio,
        avatarUrl,
        setAvatarUrl,
    } = context;

    const uid = useId();
    const displayNameId = `displayName-${uid}`;
    const bioId = `bio-${uid}`;

    const displayNameTooShort =
        displayName.trim().length > 0 && displayName.trim().length < 2;

    return (
        <section className="profile" aria-label="Profile page">
            <header className="profile__header">
                <h2 className="profile__title">Profile</h2>
            </header>

            <div className="profile__grid">
                {/* Left: preview */}
                <div className="profile__card" aria-label="Profile preview">
                    <h3 className="profile__card-title">Preview</h3>

                    <div className="profile__preview">
                        <div className="profile__avatar-box">
                            {avatarUrl ? (
                                <img
                                    className="profile__avatar-img"
                                    src={avatarUrl}
                                    alt="User avatar"
                                />
                            ) : (
                                <div className="profile__avatar-placeholder">
                                    Null
                                </div>
                            )}
                        </div>

                        <div className="profile__preview-text">
                            <p>
                                <span className="profile__label">Name:</span>{" "}
                                {profile.name}
                            </p>

                            <p>
                                <span className="profile__label">
                                    Display name:
                                </span>{" "}
                                {displayName.trim() ? displayName : "—"}
                            </p>

                            <p>
                                <span className="profile__label">Bio:</span>{" "}
                                {bio.trim() ? bio : "—"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: edit controls */}
                <div className="profile__card" aria-label="Profile editor">
                    <h3 className="profile__card-title">Edit</h3>

                    <AvatarUpload
                        avatarUrl={avatarUrl}
                        onChangeAvatarUrl={setAvatarUrl}
                    />

                    <form className="profile__form">
                        <div className="profile__field">
                            <label htmlFor={displayNameId}>Display name</label>
                            <input
                                id={displayNameId}
                                type="text"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                            {displayNameTooShort && (
                                <p className="profile__error" role="alert">
                                    Display name should be at least 2
                                    characters.
                                </p>
                            )}
                        </div>

                        <div className="profile__field">
                            <label htmlFor={bioId}>Bio</label>
                            <textarea
                                id={bioId}
                                value={bio}
                                onChange={(e) => setBio(e.target.value)}
                                rows={4}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
