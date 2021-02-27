import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { SurveysController } from "./controllers/SurveysController";
import { SendMailController } from "./controllers/SendMailController";
import { AnswerController } from "./controllers/AnswerController";
import { NetPromoterScoreController } from "./controllers/NetPromoterScoreController";

const router = Router();

// Controllers
const userController = new UserController();
const surveysController = new SurveysController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NetPromoterScoreController();

router.post("/users", userController.create);
router.get("/surveys", surveysController.show);
router.post("/surveys", surveysController.create);
router.post("/send-mail", sendMailController.execute);
router.get("/answers/:value(\\d+)", answerController.execute);
router.get("/nps/:surveys_id", npsController.execute);


export { router };