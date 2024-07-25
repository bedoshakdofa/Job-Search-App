import { Router } from "express";
import {
    addApp,
    addjob,
    deletejob,
    GetAlljobs,
    getJobsForCompany,
    updatejob,
} from "../Controllers/jobController.js";
import restrictTo from "../middleware/restrictTo.js";
import protect from "./../middleware/protect.js";
import { uploadFile } from "../middleware/uploadfile.js";
import validate from "./../middleware/validate.js";
import jobValidation from "../validation/jobValidate.js";
const jobRouter = Router();

jobRouter.use(protect);
jobRouter
    .route("/:id")
    .patch(restrictTo("Company_HR"), updatejob)
    .delete(restrictTo("Company_HR"), deletejob);
jobRouter
    .route("/")
    .get(restrictTo("user", "Company_HR"), GetAlljobs)
    .post(restrictTo("Company_HR"), validate(jobValidation), addjob);

jobRouter.get(
    "/jobsInCompany",
    restrictTo("user", "Company_HR"),
    getJobsForCompany
);

jobRouter.post("/apply/:id", uploadFile, restrictTo("user"), addApp);
export default jobRouter;
