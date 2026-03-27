import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import {
    createReviewSchema,
    getReviewsByGameSchema
} from "../validations/reviewValidation";
import * as reviewController from "../controllers/reviewController";

const router: Router = express.Router();

router.get(
    "/game/:gameId",
    validateRequest(getReviewsByGameSchema, "params"),
    reviewController.getReviewsByGame
);

router.post(
    "/",
    validateRequest(createReviewSchema, "body"),
    reviewController.createReview
);

export default router;