import {Field, ID, InputType, ObjectType} from "type-graphql";

@InputType()
export class ObjectId {
    @Field(() => ID)
    id!: number;
}