import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Category, CategoryInput } from "../entities/Category";
import { validate } from "class-validator";

@Resolver(Category)
export class CategoryResolver {
  @Query(() => [Category])
  async allCategories(): Promise<Category[]> {
    const Categories = await Category.find({
      relations: {
        ads: true,
      }
    });
    console.log(Category);
    return Categories;
  }

  @Mutation(() => Category)
    async createCategory(@Arg("data", () => CategoryInput) data: CategoryInput): Promise<Category> {
        const newCategory = new Category();
        Object.assign(newCategory, data);
    
        const errors = await validate(newCategory);
        if (errors.length === 0) {
        await newCategory.save();
        return newCategory;
        } else {
        throw new Error(`Error occured: ${JSON.stringify(errors)}`);
        }
    }
}