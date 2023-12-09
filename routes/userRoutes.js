import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { getUserController, updateUserController } from "../controllers/userController.js";

const router = express.Router();


router.put("/update-user",userAuth, updateUserController)
router.get('/get-user',getUserController)

export default router;
