export function generalInputService(value: string): {
    isValid: boolean;
    errors: string[];
} {
    let isValid = true;
    const errors: string[] = [];

    if (value.trim().length < 3) {
        isValid = false;
        errors.push("Input is too short.");
    }

    return { isValid, errors };
}
