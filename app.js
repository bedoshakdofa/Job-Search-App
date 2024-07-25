import express from "express";

import dotenv from "dotenv";
import userRouter from "./Routers/userRoutes.js";
import AppError from "./utils/AppError.js";
import companyRouter from "./Routers/companyRoutes.js";
import jobRouter from "./Routers/jobRouter.js";
dotenv.config({ path: "./config.env" });
const app = express();
app.use(express.json());
app.use("/user", userRouter);
app.use("/company", companyRouter);
app.use("/job", jobRouter);

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
        error: err,
    });
});

app.use("*", (req, res, next) => {
    return next(new AppError(500, `this ${req.originalUrl} is not found `));
});

export default app;
