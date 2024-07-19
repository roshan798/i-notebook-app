import express from "express";
import userContrller from "@controllers/user.controller";
const router = express.Router();

router.post("/signup", userContrller.signup);
router.post("/login", userContrller.login);

export default router;