import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysUserRepository } from "../repositories/SurveysUserRepository";

export class AnswerController{
  async execute(req: Request, res: Response){
    const {value} = req.params;
    const {u: surveyesUserId } = req.query;

    const surveysUserRepository = getCustomRepository(SurveysUserRepository);

    const surveysUser = await surveysUserRepository.findOne({
      id: String(surveyesUserId)
    });

    if(!surveysUser){
      return res.status(400).json({
        message: "Surveys user doesn't exists!"
      });
    }
    else if(surveysUser && surveysUser.value !== null){
      return res.status(400).json({
        message: "Surveys has already been evaluated!"
      });
    }

    surveysUser.value = Number(value);

    await surveysUserRepository.save(surveysUser);

    return res.json(surveysUser);
  }
}