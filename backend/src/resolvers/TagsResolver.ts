import { Arg, Field, ID, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Tag, TagInput } from "../entities/Tag";
import { validate } from "class-validator";

@Resolver(Tag)
export class TagResolver {
  @Query(() => [Tag])
  async findAllTags(): Promise<Tag[]> {
    const tags = await Tag.find({
      relations: {
        ads: true,
      }
    });
    console.log(tags);
    return tags;
  }

 @Mutation(() => Tag)
  async createTag(@Arg("data", () => TagInput) data: TagInput): Promise<Tag> {
    const newTag = new Tag();
    // newTag.name = name;
    Object.assign(newTag, data);

    const errors = await validate(newTag);
    if (errors.length === 0) {
      await newTag.save();
      return newTag;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }


}

export default TagResolver;

