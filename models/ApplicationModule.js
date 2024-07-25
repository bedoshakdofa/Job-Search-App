import mongoose from "mongoose";

const AppSchema = mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "job",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    userTechSkills: [{ type: String }],
    userSoftSkills: [{ type: String }],
    userResume: String,
});

const Application = mongoose.model("Application", AppSchema);

export default Application;
