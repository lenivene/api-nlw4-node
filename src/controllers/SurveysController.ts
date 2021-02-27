import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";

export class SurveysController{
  async create(req: Request, res: Response){
    const data = req.body;

    const surveysRepository = getCustomRepository(SurveysRepository);

    const surveys = surveysRepository.create(data);

    await surveysRepository.save(surveys);

    return res.status(201).json(surveys);
  }

  async show(req: Request, res: Response){
    const surveysRepository = getCustomRepository(SurveysRepository);

    const getAllSurveys = await surveysRepository.find();

    return res.json(getAllSurveys);
  }
}