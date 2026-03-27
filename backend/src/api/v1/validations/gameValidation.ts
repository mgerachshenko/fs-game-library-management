import Joi, { ObjectSchema } from "joi";

export const searchGamesSchema: ObjectSchema = Joi.object({
    query: Joi.string().min(3).required().messages({
        "string.min": "Search query must be at least 3 characters",
        "any.required": "Search query is required",
        "string.empty": "Search query cannot be empty",
    }),

    category: Joi.string().allow("").optional(),
});
