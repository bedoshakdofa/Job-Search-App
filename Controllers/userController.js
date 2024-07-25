import user from "./../models/userModule.js";
import jwt from "jsonwebtoken";
import CatchAsync from "./../utils/CatchAsync.js";
import AppError from "./../utils/AppError.js";
import Email from "../utils/SendEmail.js";
const sginToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: "90d",
    });
};

export const signup = async (req, res) => {
    await user.create(req.body);
    res.status(200).json({
        status: "success",
        message: "user Created ✅",
    });
};

export const sginIn = CatchAsync(async (req, res, next) => {
    const { identifier, password } = req.body;
    const currantUser = await user
        .findOne({
            $or: [
                { email: identifier },
                { mobileNumber: identifier },
                { recoveryEmail: identifier },
            ],
        })
        .select("+password");
    if (!currantUser)
        return next(new AppError(401, "invaild identifier or password"));

    if (
        !(await currantUser.checkPassword(password, currantUser.password)) ||
        !currantUser
    )
        return next(new AppError(401, "invaild identifier or password"));
    currantUser.status = "online";
    await currantUser.save({ valiadteBeforeSave: false });
    const token = sginToken(currantUser.id);

    res.status(200).json({
        status: "success",
        message: "loggedIn",
        token,
    });
});

export const UpdateAccount = CatchAsync(async (req, res, next) => {
    const updatedUser = await user.findByIdAndUpdate(req.user.id, req.body, {
        new: true,
    });
    res.status(200).json({
        status: "success",
        message: "account updated✅",
        updatedUser,
    });
});

export const DeleteAccount = CatchAsync(async (req, res, next) => {
    await user.deleteOne({ _id: req.user.id });
    res.status(200).json({
        status: "success",
        message: "account deleted ✅",
    });
});

export const GetUser = CatchAsync(async (req, res, next) => {
    const oneUser = await user.findById(req.user.id);
    res.status(200).json({ status: "success", user: oneUser });
});

export const getProfileData = CatchAsync(async (req, res, next) => {
    const profileData = await user.findById(req.query.userId);
    res.status(200).json({ status: "success", user: profileData });
});

export const updatePassword = CatchAsync(async (req, res, next) => {
    const { currantpass, newpassword } = req.body;

    const currantuser = await user.findById(req.user.id).select("+password");
    if (!currantuser.checkPassword(currantpass, newpassword))
        return next(new AppError(401, "your password doesn't match"));

    currantuser.password = newpassword;
    await currantuser.save();
    res.status(200).json({
        status: "success",
        message: "your password updated",
    });
});

export const forgetPassword = CatchAsync(async (req, res, next) => {
    const currantuser = await user.findOne({ email: req.body.email });
    if (!currantuser)
        return next(new AppError(404, "this account is not found"));

    const otp = currantuser.generateOTP();
    await currantuser.save({ valiadteBeforeSave: false });
    try {
        await new Email(currantuser, otp).SendEmail();
        res.status(200).json({
            status: "success",
            message: "check your inbox",
        });
    } catch (err) {
        currantuser.OTP = undefined;
        currantuser.OTPExp = undefined;
        await currantuser.save({ valiadteBeforeSave: false });
        return next(new AppError(500, "fail to send email please try again"));
    }
});

export const restpassword = CatchAsync(async (req, res, next) => {
    const { newpassword, OTP } = req.body;
    const currantuser = await user.findOne({
        OTP: OTP,
        OTPExp: { $gt: Date.now() },
    });
    if (!currantuser)
        return next(new AppError(404, "invaild code or time expired"));

    currantuser.password = newpassword;
    currantuser.OTP = undefined;
    currantuser.OTPExp = undefined;
    await currantuser.save();

    res.status(200).json({
        status: "success",
        message: "your password updated ✅",
    });
});

export const recoveryAccount = CatchAsync(async (req, res, next) => {
    const { recoveryEmail } = req.body;
    const account = await user.findOne({ recoveryEmail });
    if (!account)
        return next(
            new AppError(
                404,
                "no accounts associated to a specific this recovery Email "
            )
        );
    res.status(200).json({
        status: "success",
        account,
    });
});
