import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { SurveysController } from "./controllers/SurveysController";
import { SendMailController } from "./controllers/SendMailController";

const router = Router();

// Controllers
const userController = new UserController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();

router.post("/users", userController.create);
router.get("/surveys", surveysController.show);
router.post("/surveys", surveysController.create);
router.post("/send-mail", sendMailController.execute);


export { router };