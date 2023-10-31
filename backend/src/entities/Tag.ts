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
import { ObjectId } from "./ObjectId";

@Entity()
@ObjectType()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id!: number;

  @Column({ length: 100 })
  @Length(3, 100)
  @Field()
  name!: string;

  @ManyToMany(() => Ad, (ad) => ad.tags)
  @Field(() => [Ad])
  ads!: Ad[];
}


@InputType()
export class TagInput {
  
  @Field()
  name!: string;

  @Field(() => [ObjectId])
  ads!: ObjectId[];
}