import joi from "joi";

export const sginupValidation = joi.object({
    firstName: joi.string().min(2).max(20).required(),
    lastName: joi.string().min(2).max(20).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    passwordConfirm: joi.valid(joi.ref("password")).required(),
    recoveryEmail: joi.string().email().optional(),
    DOB: joi.date().optional(),
    mobileNumber: joi.string().optional(),
    role: joi.string().valid("user", "Company_HR").default("user"),
    status: joi.string().valid("online", "offline").default("offline"),
});

export const sginInValidation = joi.object({
    identifier: joi.string().required(),
    password: joi.string().required(),
});
