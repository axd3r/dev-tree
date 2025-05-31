import express from "express";
import { authMiddleware } from "../../middleware/authMiddleware";

const UserController = require("../controllers/UserController");
const router = express.Router();

router.post("/save", UserController.save);
router.get('/get-all', UserController.getAll);
router.get('/:userId', UserController.findOne);
router.put('/:userId', authMiddleware, UserController.update);
router.delete('/:userId', authMiddleware, UserController.remove);

module.exports = router;