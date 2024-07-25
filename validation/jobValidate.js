import joi from "joi";

const jobValidation = joi.object({
    jobTitle: joi.string().required(),
    jobLocation: joi.string().valid("onsite", "remotly", "hybrid"),
    workingTime: joi.string().valid("part-time", "full-time"),
    seniorityLevel: joi
        .string()
        .valid("Mid-level", "Senior", "team-Lead", "CTO"),
    jobDescription: joi.string(),
    technicalSkills: joi.array().items(joi.string()),
    softSkills: joi.array().items(joi.string()),
});

export default jobValidation;
