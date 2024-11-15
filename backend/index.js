import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
//import path from "path";
import { fileURLToPath } from "url";
import resumeRouter from "./routes/resume.route.js";

const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://dvkrishna142000:B1ev9nIeSiwDNFWf@cluster0.g6nhi.mongodb.net/ResumeBuilder?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
        console.log("MongoDB is connected successfully....");
    })
    .catch((err) => {
        console.error(err);
    });

app.use("/api/resume", resumeRouter);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(statusCode).json({
        success: false, 
        statusCode,
        message,
    });
});

app.listen(5000, () => {
    console.log("Server is running at port 5000.....");
});
