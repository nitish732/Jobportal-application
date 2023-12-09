import express from "express";
import userAuth from '../middlewares/authMiddleware.js';
import { createJobController, deleteJobController, getJobController, updateJobController, jobsStatsController } from "../controllers/jobsController.js";

//Router object
const router = express.Router();

router.post("/create-job", userAuth, createJobController);
router.get("/get-job", userAuth, getJobController);
router.patch("/update-job/:id", userAuth, updateJobController);
router.delete("/delete-job/:id", userAuth, deleteJobController);
router.get("/job-stats", userAuth, jobsStatsController);

export default router;
