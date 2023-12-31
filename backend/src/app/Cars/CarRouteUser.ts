import { Router } from "express";
import CarController from "./CarController";

const carRouteUser = Router()
const controller = new CarController();

carRouteUser.route("/car").get(controller.getAll)
carRouteUser.route('/car/:id').get(controller.getById);

export default carRouteUser;