import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Ad, AdInput } from "../entities/Ad";
import { validate } from "class-validator";

@Resolver(Ad)
export class AdResolver {
  @Query(() => [Ad])
  async allAds(): Promise<Ad[]> {
    const Ads = await Ad.find({
      relations: {
        tags: true,
        category: true,
      }
    });
    console.log(Ads);
    return Ads; //réponse de la requête
  }

  // this is a test

   @Mutation(() => Ad)
  async createAd(@Arg("data", () => AdInput) data: AdInput): Promise<Ad> {
    const newAd = new Ad();
    Object.assign(newAd, data);

    const errors = await validate(newAd);
    if (errors.length === 0) {
      await newAd.save();
      return newAd;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }
}

export default AdResolver;
