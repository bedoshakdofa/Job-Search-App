import AppError from "../utils/AppError.js";
const restrictTo = (...roles) => {
    return (req, res, next) => {
        req.user.role;
        if (roles.includes(req.user.role)) {
            return next();
        }
        return next(
            new AppError(403, "you don't have permision to make this operation")
        );
    };
};

export default restrictTo;
