import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import logger from "./logger";
import morgan from "morgan";
import connectDB from "./db/connectDB";
import userRoute from "./routes/UserRoute";
import applicationRoute from "./routes/ApplicationRoute"
const app = express();
const PORT = process.env.PORT || 3000;
const morganFormat = ":method :url :status :response-time ms";
const corsOptions = {
    origin: process.env.FRONT_END_URL,
    credentials: true
}
app.use(cors(corsOptions));
app.use(express.json());
//logging and monitoring to track application running
//save log info to file app.log
app.use(
    morgan(morganFormat, {
      stream: {
        write: (message:string) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );
  
  
app.use("/api/user", userRoute);
app.use("/api/application", applicationRoute)

app.listen(PORT, () => {
    connectDB();
    console.log(`Server listen at port: ${PORT}`);
});