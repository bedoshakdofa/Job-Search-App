import { Router } from "express";
import protect from "./../middleware/protect.js";
import restrictTo from "./../middleware/restrictTo.js";
import {
    addCompany,
    deleteCompany,
    GetACompany,
    getAllApplications,
    searchCompany,
    updatecompany,
} from "../Controllers/companyController.js";
import validate from "./../middleware/validate.js";
import companyValidation from "../validation/companyValidate.js";

const companyRouter = Router();

companyRouter.use(protect);

companyRouter
    .route("/Allapp")
    .get(restrictTo("Company_HR"), getAllApplications);
companyRouter.get("/search", restrictTo("Company_HR", "user"), searchCompany);

companyRouter.use(restrictTo("Company_HR"));

companyRouter.route("/").post(validate(companyValidation), addCompany);
companyRouter
    .route("/:id")
    .patch(updatecompany)
    .delete(deleteCompany)
    .get(GetACompany);

export default companyRouter;
