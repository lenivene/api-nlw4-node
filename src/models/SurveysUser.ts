import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Surveys } from "./Surveys";
import { User } from "./User";

@Entity("surveys_users")
export class SurveysUser{
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({name: "user_id"})
  user: User

  @Column()
  surveys_id: string;

  @ManyToOne(() => Surveys)
  @JoinColumn({name: "surveys_id"})
  surveys: Surveys

  @Column()
  value:number;

  @CreateDateColumn()
  created_at: Date;

  constructor(){
    if(!this.id){
      this.id = uuid()
    }
  }
}