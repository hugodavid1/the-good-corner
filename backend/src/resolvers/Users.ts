import {
  Arg,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Tag, TagCreateInput, TagUpdateInput } from "../entities/Tag";
import { validate } from "class-validator";
import { User, UserCreateInput } from "../entities/User";
import argon2 from "argon2";

@Resolver(User)
export class UsersResolver {
  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    const users = await User.find();
    return users;
  }

  @Mutation(() => User)
  async signUp(
    @Arg("data", () => UserCreateInput) userData: UserCreateInput
  ): Promise<User> {
    const newUser = new User();
    const hashedPassword = await argon2.hash(userData.password);

    newUser.email = userData.email;
    newUser.hashedPassword = hashedPassword;

    const errors = await validate(newUser);
    if (errors.length === 0) {
      await newUser.save();
      return newUser;
    } else {
      throw new Error(`Error occured: ${JSON.stringify(errors)}`);
    }
  }

  @Mutation(() => User, { nullable: true })
  async signIn(
    @Arg("data", () => UserCreateInput) loginData: UserCreateInput
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email: loginData.email } });

    if (!user) {
      throw new Error("User not found");
    }

    const valid = await argon2.verify(user.hashedPassword, loginData.password);
    if (!valid) {
      throw new Error("Invalid password");
    }

    return user;
  }
}

export default UsersResolver;
