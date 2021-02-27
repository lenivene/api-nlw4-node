import { EntityRepository, Repository } from "typeorm";
import { Surveys } from "../models/Surveys";

@EntityRepository(Surveys)
export class SurveysRepository extends Repository<Surveys>{

}