import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { UserRepository } from "../repositories/UserRepository";
import { SurveysUserRepository } from "../repositories/SurveysUserRepository";
import { sendMailService } from "../services/SendMailService";

export class SendMailController{
  async execute(req: Request, res: Response){
    const data = req.body;

    const userRepository = getCustomRepository(UserRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUserRepository = getCustomRepository(SurveysUserRepository);

    const userAlreadyExists = await userRepository.findOne({email: data.email});

    if(!userAlreadyExists){
      return res.status(400).json({
        message: "User doesn't exists!"
      })
    }

    const surveysAlreadyExists = await surveysRepository.findOne({id: data.surveys_id});

    if(!surveysAlreadyExists){
      return res.status(400).json({
        message: "Surveys doesn't exists!"
      })
    }

    const surveysUser = surveysUserRepository.create({
      user_id: userAlreadyExists.id,
      surveys_id: surveysAlreadyExists.id
    })

    await surveysUserRepository.save(surveysUser);

    await sendMailService.execute(
      data.email,
      surveysAlreadyExists.title,
      {
        name: userAlreadyExists.name,
        title: surveysAlreadyExists.title,
        description: surveysAlreadyExists.description
      },
      "no-reply.hbs"
    );

    return res.json(surveysUser);
  }
}