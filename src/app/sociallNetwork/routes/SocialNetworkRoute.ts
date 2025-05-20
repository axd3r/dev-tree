import express from "express";

const SocialNetworkController = require("../controllers/SocialNetworkController");
const router = express.Router();

router.post("/", SocialNetworkController.save);
router.get("/", SocialNetworkController.getAll);
router.get('/:socialId', SocialNetworkController.findOne);
router.put('/:socialId', SocialNetworkController.update);
router.delete('/:socialId', SocialNetworkController.remove);
router.get('/user/:userId', SocialNetworkController.findByUserId);
module.exports = router;