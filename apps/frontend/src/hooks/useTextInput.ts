import { useState } from "react";
import type { ChangeEvent } from "react";

// hook for text inputs that keeps track of the current value
export function useTextInput(initialValue: string = "") {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(event.target.value);
    };

    const clear = () => {
        setValue("");
    };

    return {
        value,       
        setValue,   
        handleChange, 
        clear,   
    };
}