import mongoose from "mongoose";

const companySchema = mongoose.Schema({
    companyName: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    numberOfEmployees: {
        type: String,
        enum: [
            "1-10",
            "11-20",
            "21-50",
            "51-100",
            "101-200",
            "201-500",
            "501-1000",
            "1001-5000",
            "5001-10000",
            "10001+",
        ],
        required: true,
    },
    companyEmail: {
        type: String,
        unique: true,
        required: true,
    },
    companyHR: {
        type: mongoose.Types.ObjectId,
        ref: "user",
    },
});

const company = mongoose.model("company", companySchema);

export default company;
