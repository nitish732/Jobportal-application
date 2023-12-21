// package imports
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "swagger-jsdoc";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import morgan from "morgan";
//security packages
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
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

// swagger api config
const options= {
     definition : {
      openapi:"3.0.0",
      info:{
        title:'JobConnect Application',
        description:'Node ExpressJS Job Portal Application'
      },
      servers: [
        {
       // url : "http://localhost:8080"
          url : "https://jobportal-application.onrender.com"
        }
      ],
      security: [
        {
          bearerAuth: []
        }
      ]
     },
   apis: ['./routes/*.js']
};
const spec = swaggerDoc(options);
// rest object
const app = express();

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
//routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user",userRoutes);
app.use("/api/v1/job",jobsRoutes);

//homeroute root
app.use("/api-doc", swaggerUi.serve,swaggerUi.setup(spec));

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
