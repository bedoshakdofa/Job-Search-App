import user from "../models/userModule.js";
import AppError from "../utils/AppError.js";
import CatchAsync from "../utils/CatchAsync.js";
import jwt from "jsonwebtoken";
import { promisify } from "util";

const protect = CatchAsync(async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) return next(new AppError(401, "you are not logged In"));

    const decode = await promisify(jwt.verify)(token, process.env.SECRET_KEY);

    const currantuser = await user.findById(decode.id);

    if (!currantuser)
        return next(new AppError(401, "invaild email or password"));

    req.user = currantuser;
    next();
});

export default protect;
