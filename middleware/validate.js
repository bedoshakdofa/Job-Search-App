import AppError from "../utils/AppError.js";
const validate = (Schema) => {
    return (req, res, next) => {
        let Allobj = { ...req.body, ...req.params };
        let { error } = Schema.validate(Allobj, { abortEarly: false });
        if (error?.details) {
            let ErrorMsg = error.details.map((msgs) => msgs.message);
            return next(new AppError(ErrorMsg, 400));
        } else next();
    };
};

export default validate;
