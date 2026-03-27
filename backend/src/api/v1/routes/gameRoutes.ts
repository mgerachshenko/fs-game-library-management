import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { searchGamesSchema } from "../validations/gameValidation";
import * as gameController from "../controllers/gameController";

const router: Router = express.Router();

router.get("/", gameController.getGames);
router.get("/owned", gameController.getOwnedGames);
router.get("/search", validateRequest(searchGamesSchema, "query"), gameController.searchGames);
router.patch("/:id/toggle-owned", gameController.toggleOwnedGame);

export default router;