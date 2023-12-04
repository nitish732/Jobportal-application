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
const PORT = process.env.PORT || 8080;
//server listen on port number 8080
app.listen(PORT, () => {
  console.log(
    `Node server running in ${process.env.DEV_MODE} Mode on port no ${PORT}`
      .bgGreen.white
  );
});