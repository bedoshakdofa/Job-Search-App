import joi from "joi";
const companyValidation = joi.object({
    companyName: joi.string().required(),
    description: joi.string().required(),
    industry: joi.string().required(),
    address: joi.string().required(),
    numberOfEmployees: joi
        .string()
        .valid(
            "1-10",
            "11-20",
            "21-50",
            "51-100",
            "101-200",
            "201-500",
            "501-1000",
            "1001-5000",
            "5001-10000",
            "10001+"
        )
        .required(),
    companyEmail: joi.string().email().required(),
});

export default companyValidation;
