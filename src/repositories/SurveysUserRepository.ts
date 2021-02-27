import { EntityRepository, Repository } from "typeorm";
import { SurveysUser } from "../models/SurveysUser";

@EntityRepository(SurveysUser)
export class SurveysUserRepository extends Repository<SurveysUser>{
}
