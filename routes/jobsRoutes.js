import express from "express";
import userAuth from '../middlewares/authMiddleware.js';
import { createJobController, deleteJobController, getJobController, updateJobController, jobsStatsController } from "../controllers/jobsController.js";

//Router object
const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Jobs
 *   description: Operations related to job management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       properties:
 *         company:
 *           type: string
 *           description: Company name
 *         position:
 *           type: string
 *           description: Job position
 *         status:
 *           type: string
 *           enum: ['pending', 'reject', 'interview']
 *           description: Job status
 *         workType:
 *           type: string
 *           enum: ['full-time', 'part-time', 'internship', 'contract']
 *           description: Work type
 *         workLocation:
 *           type: string
 *           description: Work location
 *       example:
 *         company: Example Company
 *         position: Software Engineer
 *         status: pending
 *         workType: full-time
 *         workLocation: Mumbai
 */

/**
 * @swagger
 * /api/v1/job/create-job:
 *   post:
 *     summary: Create a new job
 *     tags: [Jobs]
 *     requestHeaders:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: string 
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       201:
 *         description: Job created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.post("/create-job", userAuth, createJobController);

/**
 * @swagger
 * /api/v1/job/get-job:
 *   get:
 *     summary: Get jobs with filters and pagination
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         description: Job status filter
 *         type: string
 *       - in: query
 *         name: workType
 *         description: Work type filter
 *         type: string
 *       - in: query
 *         name: search
 *         description: Search filter for job position
 *         type: string
 *       - in: query
 *         name: sort
 *         description: Sorting criteria (latest, oldest, a-z, z-a)
 *         type: string
 *       - in: query
 *         name: page
 *         description: Page number for pagination
 *         type: integer
 *       - in: query
 *         name: limit
 *         description: Number of items per page
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/get-job", userAuth, getJobController);

/**
 * @swagger
 * /api/v1/job/update-job/{id}:
 *   patch:
 *     summary: Update a job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Job ID
 *         required: true
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Job'
 *     responses:
 *       200:
 *         description: Job updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */
router.patch("/update-job/:id", userAuth, updateJobController);

/**
 * @swagger
 * /api/v1/job/delete-job/{id}:
 *   delete:
 *     summary: Delete a job by ID
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Job ID
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Job deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Job not found
 *       500:
 *         description: Internal server error
 */
router.delete("/delete-job/:id", userAuth, deleteJobController);

/**
 * @swagger
 * /api/v1/job/job-stats:
 *   get:
 *     summary: Get job statistics
 *     tags: [Jobs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Job'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */
router.get("/job-stats", userAuth, jobsStatsController);

export default router;

