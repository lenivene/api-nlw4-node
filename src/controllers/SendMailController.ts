import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { UserRepository } from "../repositories/UserRepository";
import { SurveysUserRepository } from "../repositories/SurveysUserRepository";
import { sendMailService } from "../services/SendMailService";
import { GetRequestDomain } from "../utils/GetRequestDomain";

export class SendMailController{
  async execute(req: Request, res: Response){
    const data = req.body;
    const domainUrl = GetRequestDomain(req);

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

    const user = userAlreadyExists;
    const surveys = surveysAlreadyExists;

    const surveysUserAlreadyExists = await surveysUserRepository.findOne({
      where: {user_id: user.id, value: null},
      relations: ["user", "surveys"]
    });

    const sendMail = async (email: string, subject: string) => {
      const mailData = {
        name: user.name,
        title: surveys.title,
        description: surveys.description,
        link: `${domainUrl}/answers`,
        user_id: user.id
      }

      await sendMailService.execute(email, subject, mailData, "no-reply.hbs");
    }

    if(surveysUserAlreadyExists){
      await sendMail(data.email, surveys.title);

      return res.json(surveysUserAlreadyExists);
    }

    const surveysUser = surveysUserRepository.create({
      user_id: userAlreadyExists.id,
      surveys_id: surveysAlreadyExists.id
    })

    await surveysUserRepository.save(surveysUser);

    await sendMail(data.email, surveys.title);

    return res.json(surveysUser);
  }
}