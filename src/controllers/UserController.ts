import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository";
import { Yup } from "../utils/Yup";

export class UserController {
  async create(req: Request, res: Response){
    try{
      const nameLimit = "O nome deve ter entre 3 e 60 caracteres.";

      const schema = Yup.object().shape({
        email: Yup.string()
          .email("Insira um email válido.")
          .required("O email é obrigatório."),
        name: Yup.string()
          .min(3, nameLimit)
          .max(60, nameLimit)
          .required("O nome é obrigatório."),
      });


      const data = req.body;

      await schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
      });
      
      const usersRepository = getCustomRepository(UserRepository)
      
      const userAlreadyExists = await usersRepository.findOne({email: data.email});
      
      if(userAlreadyExists){
        return res.status(400).json({
          message: 'User already exists!'
        })
      }
      
      const user = usersRepository.create(data);
      
      await usersRepository.save(user);
      
      return res.status(201).json(user);
    }
    catch(error){
      if (error instanceof Yup.ValidationError) {
        let objError: any = {};

        error.inner.forEach((returnError) => {
          if(returnError.path){
            objError[returnError.path] = returnError.message;
          }
        });

        return res.status(400).json(objError);
      }

      return res.status(500).json({
        message: 'Internal server error!'
      })
    }
  }
}