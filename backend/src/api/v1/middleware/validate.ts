import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

import { MiddlewareFunction, RequestData } from "../types/express";

// validate method provided by Joi package
export const validate = <T>(schema: ObjectSchema<T>, data: T): void => {
    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
        throw new Error(
            `Validation error: ${error.details
                .map((x) => x.message)
                .join(", ")}`,
        );
    }
};

// run validate method against received data
// source defaults to "all" so older routes keep working
export const validateRequest = (
    schema: ObjectSchema,
    source: "body" | "query" | "params" | "all" = "all",
): MiddlewareFunction => {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            let data:
                | RequestData
                | Request["body"]
                | Request["query"]
                | Request["params"];

            if (source === "body") {
                data = req.body;
            } else if (source === "query") {
                data = req.query;
            } else if (source === "params") {
                data = req.params;
            } else {
                data = {
                    ...req.body,
                    ...req.params,
                    ...req.query,
                };
            }

            validate(schema, data);
            next();
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    };
};
