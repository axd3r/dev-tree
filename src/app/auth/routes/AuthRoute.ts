import { Router } from "express";

const AuthController = require('../controllers/AuthController')
const router = Router();

router.post("/login", AuthController.login);

module.exports = router
