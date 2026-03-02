export function generalInputService(value: string): {
    isValid: boolean;
    errors: string[];
} {
    let isValid = true;
    const errors: string[] = [];

    if (value.trim().length < 3) {
        isValid = false;
        errors.push("Input must be at least 3 characters.");
    }

    return { isValid, errors };
}
