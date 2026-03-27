import { useEffect, useId, useRef } from "react";

type AvatarUploadProps = {
    avatarUrl: string | null;
    onChangeAvatarUrl: (url: string | null) => void;
};

export default function AvatarUpload({
    avatarUrl,
    onChangeAvatarUrl,
}: AvatarUploadProps) {
    const previousUrlRef = useRef<string | null>(null);
    const inputId = useId();

    useEffect(() => {
        const previous = previousUrlRef.current;
        if (
            previous &&
            previous.startsWith("blob:") &&
            previous !== avatarUrl
        ) {
            URL.revokeObjectURL(previous);
        }
        previousUrlRef.current = avatarUrl;
    }, [avatarUrl]);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            onChangeAvatarUrl(null);
            return;
        }

        const url = URL.createObjectURL(file);
        onChangeAvatarUrl(url);

        e.target.value = "";
    }

    function handleRemove() {
        onChangeAvatarUrl(null);
    }

    return (
        <section aria-label="Avatar upload" className="avatar-upload">
            <div className="avatar-upload__row">
                <div className="avatar-upload__preview">
                    {avatarUrl ? (
                        <img
                            className="avatar-upload__img"
                            src={avatarUrl}
                            alt="User avatar"
                        />
                    ) : (
                        <div
                            className="avatar-upload__placeholder"
                            aria-hidden="true"
                        >
                            Null
                        </div>
                    )}
                </div>

                <div className="avatar-upload__controls">
                    <label className="avatar-upload__label" htmlFor={inputId}>
                        Avatar
                    </label>
                    <input
                        id={inputId}
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />

                    <button
                        type="button"
                        className="avatar-upload__remove"
                        onClick={handleRemove}
                        disabled={!avatarUrl}
                    >
                        Remove avatar
                    </button>
                </div>
            </div>
        </section>
    );
}
