import {
  Arg,
  Authorized,
  Ctx,
  ID,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { validate } from "class-validator";
import { User, UserCreateInput } from "../entities/User";
import argon2 from "argon2";
import JWT from "jsonwebtoken";
import Cookies from "cookies";
import { ContextType, getUserFromReq } from "../auth";

@Resolver(User)
export class UsersResolver {
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    const users = await User.find();
    return users;
  }

  @Query(() => User, { nullable: true })
  async getUser(@Arg("id", () => ID) id: number): Promise<User | null> {
    const user = await User.findOne({
      where: { id: id },
    });
    return user;
  }

  @Query(() => User, { nullable: true })
  async me(@Ctx() context: ContextType): Promise<User | null> {
    return getUserFromReq(context.req, context.res);
  }

  @Mutation(() => User)
  async signUp(
    @Arg("data", () => UserCreateInput) userData: UserCreateInput
  ): Promise<User> {
    const errors = await validate(userData);
    if (errors.length !== 0) {
      throw new Error(`User already exists`);
    }
    const newUser = new User();
    const hashedPassword = await argon2.hash(userData.password);
    Object.assign(newUser, {
      email: userData.email,
      hashedPassword,
    });
    await newUser.save();
    return newUser;
  }

  @Mutation(() => User, { nullable: true })
  async signIn(
    @Ctx() ctx: { req: any; res: any },
    @Arg("email") email: string,
    @Arg("password") password: string
  ): Promise<User | null> {
    const existingUser = await User.findOneBy({
      email: email,
    });
    if (!existingUser) {
      throw new Error("User not found");
    } else {
      if (await argon2.verify(existingUser.hashedPassword, password)) {
        // authentication successful
        const token = JWT.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
            userId: existingUser.id,
          },
          process.env.JWT_SECRET || "supersecret"
        );
        const cookies = new Cookies(ctx.req, ctx.res);
        cookies.set("token", token, {
          httpOnly: true,
          secure: false,
          maxAge: 1000 * 60 * 60 * 24,
        });
        return existingUser;
      }
      return null;
    }
  }

  @Mutation(() => Boolean)
  async signOut(@Ctx() ctx: ContextType): Promise<boolean> {
    const cookies = new Cookies(ctx.req, ctx.res);
    cookies.set("token", "", {
      httpOnly: true,
      secure: false,
      maxAge: 0,
    });
    return true;
  }
}

export default UsersResolver;
