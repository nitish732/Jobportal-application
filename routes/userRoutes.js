import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import { getUserController, updateUserController } from "../controllers/userController.js";

const router = express.Router();

/**
 *  @swagger
 *  tags:
 *    name: User
 *    description: User apis
 */

/**
 * @swagger
 * /api/v1/user/update-user:
 *    post:
 *      summary: To update user
 *      tags: [User]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: user updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        500:
 *          description: internal server error
 */
router.put("/update-user",userAuth, updateUserController)
/**
 * @swagger
 * /api/v1/user/get-user:
 *    post:
 *      summary: To get user details
 *      tags: [User]
 *      requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: user details fetched successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        500:
 *          description: internal server error
 */
router.get('/get-user',getUserController)

export default router;
