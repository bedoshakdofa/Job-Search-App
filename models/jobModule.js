import mongoose from "mongoose";

const jobSchema = mongoose.Schema({
    jobTitle: {
        type: String,
        required: true,
    },
    jobLocation: {
        type: String,
        enum: ["onsite", "remotly", "hybrid"],
    },
    workingTime: {
        type: String,
        enum: ["part-time", "full-time"],
    },
    seniorityLevel: {
        type: String,
        enum: ["Mid-level", "Senior", "team-Lead", "CTO"],
    },
    jobDescription: String,
    technicalSkills: [{ type: String }],
    softSkills: [{ type: String }],
    addedBy: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
});

// jobSchema.pre(/^find/, function (next) {
//     this.populate("addedBy");
//     next();
// });

const job = mongoose.model("job", jobSchema);

export default job;
