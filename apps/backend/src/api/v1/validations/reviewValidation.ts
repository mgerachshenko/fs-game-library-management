import Joi, { ObjectSchema } from "joi";

export const getReviewsByGameSchema: ObjectSchema = Joi.object({
    gameId: Joi.number().integer().positive().required().messages({
        "number.base": "Game id must be a number",
        "number.integer": "Game id must be a whole number",
        "number.positive": "Game id must be greater than 0",
        "any.required": "Game id is required"
    })
});

export const createReviewSchema: ObjectSchema = Joi.object({
    gameId: Joi.number().integer().positive().required().messages({
        "number.base": "Game id must be a number",
        "number.integer": "Game id must be a whole number",
        "number.positive": "Game id must be greater than 0",
        "any.required": "Game id is required"
    }),

    content: Joi.string().trim().min(3).max(150).required().messages({
        "string.base": "Review content must be text",
        "string.empty": "Review content cannot be empty",
        "string.min": "Review content must be at least 3 characters",
        "string.max": "Review content cannot be longer than 150 characters",
        "any.required": "Review content is required"
    })
});