import express from "express";

const UserController = require("../controllers/UserController");
const router = express.Router();

router.post("/save", UserController.save);
router.get('/get-all', UserController.getAll);
router.get('/:userId', UserController.findOne);
router.put('/:userId', UserController.update);
router.delete('/:userId', UserController.remove);

module.exports = router;