// package imports
import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
// files imports
import connectDB from "./config/db.js";
import testRoutes from "./routes/testRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js"
import jobsRoutes from "./routes/jobsRoutes.js"
import errorMiddleware from "./middlewares/errorMiddleware.js";
//Dot ENV configs
dotenv.config();

// mongodb connection
connectDB();
// rest object
const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
//routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/job",jobsRoutes);

// validation middleware
app.use(errorMiddleware);
const PORT = process.env.PORT || 8080;
//server listen on port number 8080
app.listen(PORT, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} Mode on port no ${PORT}`
      .bgGreen.white
  );
});
