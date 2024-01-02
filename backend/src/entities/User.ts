import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Length } from "class-validator";
import { Ad } from "./Ad";
import { Field, ID, InputType, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ length: 100 })
  @Length(3, 100)
  @Field()
  email!: string;

  @Column({ length: 100 })
  @Length(3, 100)
  @Field()
  hashedPassword!: string;
}

@InputType()
export class UserCreateInput {
  @Field()
  email!: string;

  @Field()
  password!: string;
}
