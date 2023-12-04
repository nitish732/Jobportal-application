import express from "express"
import {testPostController}from "../controllers/testController.js";

//Router object
const router=express.Router()

router.post("/test-post",testPostController)

export default router;