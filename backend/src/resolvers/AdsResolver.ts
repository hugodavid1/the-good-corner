import {Arg, ID, Int, Mutation, Query, Resolver} from "type-graphql";
import {Ad, AdCreateInput, AdUpdateInput, AdsWhere} from "../entities/Ad";
import {validate} from "class-validator";
import {In, LessThanOrEqual, Like, MoreThanOrEqual} from "typeorm";
import {merge} from "../utils";

@Resolver(Ad)
export class AdResolver {
    @Query(() => [Ad])
    async allAds(
        @Arg("where", {nullable: true}) where?: AdsWhere,
        @Arg("take", () => Int, {nullable: true}) take?: number,
        @Arg("skip", () => Int, {nullable: true}) skip?: number
    ): Promise<Ad[]> {
        const queryWhere: any = {};

        if (where?.categoryIn) {
            queryWhere.category = {id: In(where.categoryIn)};
        } /* si on a une catégorie dans la requête, on la met dans le where */

        if (where?.searchTitle) {
            queryWhere.title = Like(`%${where.searchTitle}%`);
        } /* Si searchTitle est set on ajoute son contenu dans au champ title de la base de donnée */

        if (where?.priceGte) {
            queryWhere.price = MoreThanOrEqual(Number(where.priceGte));
        } /* Si priceGte est set on ajoute son contenu dans au champ price de la base de donnée */

        if (where?.priceLte) {
            queryWhere.price = LessThanOrEqual(Number(where.priceLte));
        } /* Si priceLte est set on ajoute son contenu dans au champ price de la base de donnée */

        /* const order: any = {};
        if (
          typeof req.query.orderByTitle === "string" &&
          ["ASC", "DESC"].includes(req.query.orderByTitle)
        ) {
          order.title = req.query.orderByTitle; // req.query.orderByTitle = ASC | DESC
        }

        if (
          typeof req.query.orderByPrice === "string" &&
          ["ASC", "DESC"].includes(req.query.orderByPrice)
        ) {
          order.price = req.query.orderByPrice; // req.query.orderByTitle = ASC | DESC
        } */

        const ads = await Ad.find({
            take: take ?? 15,
            skip: skip ?? 0,
            where: queryWhere, /* il faut ajouter le filtre à la requete en bdd */
            //order,
            relations: {
                category: true,
                tags: true,
            },
        });
        return ads;
    }

    @Query(() => Ad, {nullable: true})
    async adById(@Arg("id", () => ID) id: number): Promise<Ad | null> {
        const ad = await Ad.findOne({
            where: {
                id: id /* première id = id de la bdd, deuxième id = id de la requête */
            },
            relations: {
                tags: true,
                category: true,
            }
        });
        return ad;
    }

    @Mutation(() => Ad)
    async createAd(@Arg("data", () => AdCreateInput) data: AdCreateInput): Promise<Ad> {
        const newAd = new Ad();
        Object.assign(newAd, data);

        const errors = await validate(newAd);
        if (errors.length === 0) {
            await newAd.save();
            return await Ad.findOneOrFail({
                where: {
                    id: newAd.id /* première id = id de la bdd, deuxième id = id de la requête */
                },
                relations: {
                    tags: true,
                    category: true,
                }
            });

        } else {
            throw new Error(`Error occured: ${JSON.stringify(errors)}`);
        }
    }

    @Mutation(() => Ad)
    @Mutation(() => Ad, {nullable: true})
    async updateAd(
        @Arg("id", () => ID) id: number,
        @Arg("data") data: AdUpdateInput
    ): Promise<Ad | null> {
        const ad = await Ad.findOne({
            where: {id: id},
            relations: {tags: true},
        });

        if (ad) {
            merge(ad, data);

            const errors = await validate(ad);
            if (errors.length === 0) {
                await Ad.save(ad);
                return await Ad.findOne({
                    where: {id: id},
                    relations: {
                        category: true,
                        tags: true,
                    },
                });
            } else {
                throw new Error(`Error occured: ${JSON.stringify(errors)}`);
            }
        }
        return ad;
    }

    @Mutation(() => Ad, {nullable: true})
    async deleteAd(@Arg("id", () => ID) id: number): Promise<Ad | null> {
        const ad = await Ad.findOne({
            where: {
                id: id /* première id = id de la bdd, deuxième id = id de la requête */
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
