import express, { Router } from "express";
import { validateRequest } from "../middleware/validate";
import { searchGamesSchema } from "../validations/gameValidation";
import * as gameController from "../controllers/gameController";
import { requireAuth } from "../middleware/requireAuth";

const router: Router = express.Router();

router.get("/", gameController.getGames);
router.get("/owned", gameController.getOwnedGames);
router.get("/search", validateRequest(searchGamesSchema, "query"), gameController.searchGames);
router.patch("/:id/toggle-owned", requireAuth, gameController.toggleOwnedGame);

export default router;