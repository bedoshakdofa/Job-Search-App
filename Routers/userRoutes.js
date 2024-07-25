import { Router } from "express";
import {
    DeleteAccount,
    forgetPassword,
    getProfileData,
    GetUser,
    recoveryAccount,
    restpassword,
    sginIn,
    signup,
    UpdateAccount,
    updatePassword,
} from "../Controllers/userController.js";
import protect from "../middleware/protect.js";
import validate from "./../middleware/validate.js";
import {
    sginInValidation,
    sginupValidation,
} from "../validation/userValidate.js";

const userRouter = Router();

userRouter.post("/signup", validate(sginupValidation), signup);
userRouter.post("/sginIn", validate(sginInValidation), sginIn);
userRouter.get("/profile", getProfileData);
userRouter.post("/forgetpassword", forgetPassword);
userRouter.patch("/restpassword", restpassword);
userRouter.get("/accounts", recoveryAccount);
userRouter.use(protect);
userRouter.patch("/updateAccount", UpdateAccount);
userRouter.delete("/deleteAccount", DeleteAccount);
userRouter.get("/Me", GetUser);
userRouter.patch("/updatePass", updatePassword);

export default userRouter;
