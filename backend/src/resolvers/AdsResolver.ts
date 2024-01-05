import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Int,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Ad, AdCreateInput, AdUpdateInput, AdsWhere } from "../entities/Ad";
import { validate } from "class-validator";
import { In, LessThanOrEqual, Like, MoreThanOrEqual } from "typeorm";
import { merge } from "../utils";
import { ContextType } from "../auth";

export function getAdQueryWhere(graphqlWhere?: AdsWhere): {
  [key: string]: unknown;
} {
  const where: any = {};

  if (graphqlWhere?.categoryIn) {
    where.category = { id: In(graphqlWhere.categoryIn) };
  }

  if (graphqlWhere?.searchTitle) {
    where.title = Like(`%${graphqlWhere.searchTitle}%`);
  }

  if (graphqlWhere?.priceGte) {
    where.price = MoreThanOrEqual(Number(graphqlWhere.priceGte));
  }

  if (graphqlWhere?.priceLte) {
    where.price = LessThanOrEqual(Number(graphqlWhere.priceLte));
  }

  return where;
}

@Resolver(Ad)
export class AdResolver {
  @Query(() => [Ad])
  async allAds(
    @Arg("where", { nullable: true }) where?: AdsWhere,
    @Arg("take", () => Int, { nullable: true }) take?: number,
    @Arg("skip", () => Int, { nullable: true }) skip?: number
  ): Promise<Ad[]> {
    const queryWhere = getAdQueryWhere(where);
    const ads = await Ad.find({
      take: take ?? 50,
      skip,
      where: queryWhere,
      //order,
      relations: {
        category: true,
        tags: true,
        createdBy: true,
      },
    });
    return ads;
  }

  @Query(() => Int)
  async allAdsCount(
    @Arg("where", { nullable: true }) where?: AdsWhere
  ): Promise<number> {
    const queryWhere: any = {};

    if (where?.categoryIn) {
      queryWhere.category = { id: In(where.categoryIn) };
    }

    if (where?.searchTitle) {
      queryWhere.title = Like(`%${where.searchTitle}%`);
    }

    if (where?.priceGte) {
      queryWhere.price = MoreThanOrEqual(Number(where.priceGte));
    }

    if (where?.priceLte) {
      queryWhere.price = LessThanOrEqual(Number(where.priceLte));
    }

    const count = await Ad.count({
      where: queryWhere,
    });
    return count;
  }

  @Authorized()
  @Query(() => Ad, { nullable: true })
  async adById(@Arg("id", () => ID) id: number): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: {
        id: id /* première id = id de la bdd, deuxième id = id de la requête */,
      },
      relations: {
        tags: true,
        category: true,
        createdBy: true,
      },
    });
    return ad;
  }

  @Authorized()
  @Mutation(() => Ad)
  async createAd(
    @Ctx() ctx: ContextType,
    @Arg("data", () => AdCreateInput) data: AdCreateInput
  ): Promise<Ad> {
    const newAd = new Ad();
    Object.assign(newAd, data, {
      createdBy: ctx.user,
    });

    const errors = await validate(newAd);
    if (errors.length === 0) {
      await newAd.save();
      return newAd;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }

  @Authorized()
  @Mutation(() => Ad, { nullable: true })
  async updateAd(
    @Ctx() context: ContextType,
    @Arg("id", () => ID) id: number,
    @Arg("data") data: AdUpdateInput
  ): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: { id: id },
      relations: { tags: true, createdBy: true },
    });

    if (ad && ad.createdBy.id === context.user?.id) {
      merge(ad, data);

      const errors = await validate(ad);
      if (errors.length === 0) {
        await Ad.save(ad);
        return await Ad.findOne({
          where: { id: id },
          relations: {
            category: true,
            tags: true,
          },
        });
      } else {
        throw new Error(`Error occured: ${JSON.stringify(errors)}`);
      }
    } else {
      return null;
    }
  }

  @Authorized()
  @Mutation(() => Ad, { nullable: true })
  async deleteAd(@Arg("id", () => ID) id: number): Promise<Ad | null> {
    const ad = await Ad.findOne({
      where: {
        id: id /* première id = id de la bdd, deuxième id = id de la requête */,
      },
    });
    if (ad) {
      await ad.remove();
      ad.id = id; /* ici on force notre ad en bdd à avoir l'id de la requête */
    } else {
      throw new Error(`Ad not found`);
    }
    return ad;
  }
}

export default AdResolver;
