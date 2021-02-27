import { Request, Response } from "express";
import { getCustomRepository, IsNull, Not } from "typeorm";
import { SurveysUserRepository } from "../repositories/SurveysUserRepository";

export class NetPromoterScoreController{
  async execute(req: Request, res: Response){
    const {surveys_id} = req.params;

    const surveysUserRepository = getCustomRepository(SurveysUserRepository);

    const surveysUser = await surveysUserRepository.find({
      surveys_id,
      value: Not(IsNull())
    });

    const detractor = surveysUser.filter(surveys => (surveys.value >= 0 && surveys.value <= 6)).length;
    const passive = surveysUser.filter(surveys => (surveys.value >= 7 && surveys.value <= 8)).length;
    const promotors = surveysUser.filter(surveys => (surveys.value >= 9 && surveys.value <= 10)).length;

    const totalAnswer = surveysUser.length;

    const calculateNps = Number((((promotors - detractor) / totalAnswer) * 100).toFixed(2));

    return res.json({
      detractor,
      passive,
      promotors,
      totalAnswer,
      nps: calculateNps
    })
  }
}