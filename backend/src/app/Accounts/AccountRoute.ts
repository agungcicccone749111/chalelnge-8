import { Router } from "express";
import {AccountController} from "./AccountController";
const AccountRouter = Router()
const controller = new AccountController();
AccountRouter.route("/login").post(controller.login);
AccountRouter.route("/register").post(controller.signup);
export default AccountRouter;