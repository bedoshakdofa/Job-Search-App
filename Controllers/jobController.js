import company from "../models/companyModule.js";
import job from "../models/jobModule.js";
import AppError from "../utils/AppError.js";
import CatchAsync from "../utils/CatchAsync.js";
import applications from "./../models/ApplicationModule.js";

export const addjob = CatchAsync(async (req, res, next) => {
    req.body.addedBy = req.user.id;
    await job.create(req.body);
    res.status(200).json({
        status: "success",
        message: "job added ✅",
    });
});

export const updatejob = CatchAsync(async (req, res, next) => {
    const updatedDoc = await company.findByIdAndUpdate(
        {
            _id: req.params.id,
            addedBy: req.user.id,
        },
        req.body,
        { new: true }
    );
    res.status(200).json({ status: "success", job: updatedDoc });
});

export const deletejob = CatchAsync(async (req, res, next) => {
    const Doc = await company.findByIdAndDelete({
        _id: req.params.id,
        addedBy: req.user.id,
    });

    if (!Doc) return next(new AppError(404, "this job is not found"));

    await applications.deleteMany({ jobId: Doc.id });
    res.status(200).json({
        status: "success",
        message: "deleted successfully ✅",
    });
});

export const GetAlljobs = CatchAsync(async (req, res, next) => {
    //find job with it companyinfo
    const jobs = await job.find(req.query);
    for (let i = 0; i < jobs.length; i++) {
        const companyinfo = await company.findOne({
            companyHR: jobs[i].addedBy,
        });
        jobs[i] = jobs[i].toObject(); // Convert the Mongoose document to a plain object
        jobs[i].companyinfo = companyinfo;
    }

    res.status(200).json({
        status: "success",
        jobs,
    });
});

export const getJobsForCompany = CatchAsync(async (req, res, next) => {
    let query;
    if (Object.keys(req.query).length == 0)
        return next(new AppError(303, "missing company name input"));
    query = req.query;
    const companyinfo = await company.findOne({ companyName: query.name });
    const jobs = await job.find({ addedBy: companyinfo.companyHR });
    res.status(200).json({
        status: "success",
        data: {
            jobs,
        },
    });
});

export const addApp = CatchAsync(async (req, res, next) => {
    req.body.userId = req.user.id;
    console.log(req.file);
    req.body.userResume = req.file.filename;
    req.body.jobId = req.params.id;
    await applications.create(req.body);
    res.status(200).json({
        status: "success",
        message: "application submited ✅",
    });
});
