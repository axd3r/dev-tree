import express from "express";

const SocialBaseController = require("../../controllers/socialBase/SocialBaseController");
const router = express.Router();

router.post("/", SocialBaseController.save);
router.get("/", SocialBaseController.getAll);
router.get('/:socialId', SocialBaseController.findOne);
router.put('/:socialId', SocialBaseController.update);
router.delete('/:socialId', SocialBaseController.remove);

module.exports = router;