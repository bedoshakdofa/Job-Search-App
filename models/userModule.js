import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "node:crypto";
const userSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            maxlength: [20],
            minlength: [2],
        },
        lastName: {
            type: String,
            required: true,
            maxlength: [20],
            minlength: [2],
        },
        username: {
            type: String,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        recoveryEmail: String,
        DOB: Date,
        mobileNumber: {
            type: String,
            unique: true,
            minlength: [10],
            maxlength: [11],
        },
        role: {
            type: String,
            enum: ["user", "Company_HR"],
            default: "user",
        },
        status: {
            type: String,
            enum: ["online", "offline"],
            default: "offline",
        },
        OTP: String,
        OTPExp: String,
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", function (next) {
    this.username = `${this.firstName} ${this.lastName}`;
    next();
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.checkPassword = async function (enterdPass, password) {
    return await bcrypt.compare(enterdPass, password);
};

userSchema.methods.generateOTP = function () {
    const otp = crypto.randomInt(100000, 999999).toString();
    this.OTP = otp;
    this.OTPExp = Date.now() + 10 * 60 * 1000;
    return otp;
};
const user = mongoose.model("user", userSchema);

export default user;
