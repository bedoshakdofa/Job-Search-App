import company from "../models/companyModule.js";
import AppError from "../utils/AppError.js";
import CatchAsync from "./../utils/CatchAsync.js";
import job from "./../models/jobModule.js";
import applications from "./../models/ApplicationModule.js";

export const addCompany = CatchAsync(async (req, res, next) => {
    req.body.companyHR = req.user.id;
    await company.create(req.body);
    res.status(200).json({
        status: "success",
        message: "company added ✅",
    });
});

export const updatecompany = CatchAsync(async (req, res, next) => {
    const updatedDoc = await company.findByIdAndUpdate(
        {
            _id: req.params.id,
            companyHR: req.user.id,
        },
        req.body,
        { new: true }
    );
    res.status(200).json({ status: "success", company: updatedDoc });
});

export const deleteCompany = CatchAsync(async (req, res, next) => {
    const Doc = await company.findByIdAndDelete({
        _id: req.params.id,
        companyHR: req.user.id,
    });
    if (!Doc) return next(new AppError(404, "this company is not found"));

    await job.deleteMany({ addedBy: Doc.companyHR });
    res.status(200).json({
        status: "success",
        message: "deleted successfully ✅",
    });
});

export const GetACompany = CatchAsync(async (req, res, next) => {
    const companies = await company.findById(req.params.id);
    if (!companies) return next(new AppError(404, "this company is not found"));
    const jobs = await job.find({ addedBy: companies.companyHR });
    res.status(200).json({
        status: "success",
        data: {
            companies,
            jobs,
        },
    });
});

export const searchCompany = CatchAsync(async (req, res, next) => {
    const companies = company.findOne({
        companyName: { $regex: req.query.search },
    });
    res.status(200).json({
        status: "success",
        data: {
            companies,
        },
    });
});

export const getAllApplications = CatchAsync(async (req, res, next) => {
    const jobs = await job.find({ addedBy: req.user.id });
    let allApps = [];
    for (let i = 0; i < jobs.length; i++) {
        const apps = await applications
            .find({ jobId: jobs[i].id })
            .populate("userId jobId");
        allApps = allApps.concat(apps);
    }

    res.status(200).json({
        status: "success",
        message: "Done ✅",
        data: {
            applications: allApps,
        },
    });
});
