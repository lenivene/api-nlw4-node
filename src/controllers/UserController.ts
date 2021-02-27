import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { User } from "../models/User";

export class UserController {
  async create(req: Request, res: Response){
    const data = req.body;

    const usersRepository = getRepository(User);

    const userAlreadyExists = await usersRepository.findOne({email: data.email});

    if(userAlreadyExists){
      return res.status(400).json({
        message: 'User already exists!'
      })
    }

    const user = usersRepository.create(data);

    await usersRepository.save(user);

    return res.json(user);
  }
}