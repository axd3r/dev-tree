import express from "express";
import { authMiddleware } from "../../../middleware/authMiddleware";

const SocialBaseController = require("../../controllers/socialBase/SocialBaseController");
const router = express.Router();

router.post("/", authMiddleware, SocialBaseController.save);
router.get("/", authMiddleware, SocialBaseController.getAll);
router.get('/:socialId', authMiddleware, SocialBaseController.findOne);
router.put('/:socialId', authMiddleware, SocialBaseController.update);
router.delete('/:socialId', authMiddleware, SocialBaseController.remove);

module.exports = router;