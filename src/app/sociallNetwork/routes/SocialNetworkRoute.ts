import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware";

const SocialNetworkController = require("../controllers/SocialNetworkController");
const router = express.Router();

router.post("/", authMiddleware, SocialNetworkController.save);
router.get("/", SocialNetworkController.getAll);
router.get('/:socialId', SocialNetworkController.findOne);
router.put('/:socialId', authMiddleware, SocialNetworkController.update);
router.delete('/:socialId', authMiddleware, SocialNetworkController.remove);
router.get('/user/:userId', SocialNetworkController.findByUserId);
module.exports = router;