import { IUser, UserRole } from "app/entities";
import { UserModel } from "../models";
import { isEmpty } from "lodash";

export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  role: UserRole;
  email?: string;
  password?: string;
  phoneNumber?: string;
  profilePic?: string;
  userPosition?: string;
  organizationId: string;
  attendanceLists?: [{ id: string; addedAt: string }];
}

let userServices = {
  create: async (body: CreateUserDTO[]) => {
    const newUser = await UserModel.insertMany(body);
    return newUser;
  },

  //   get a paginated list of user
  list: async (
    limit: number,
    page: number,
    name: string | null,
    userId: string | null
  ) => {
    /*implementing search 
    <Link> https://www.mongodb.com/docs/manual/reference/operator/query/regex/ */
    let querySearch = !isEmpty(name)
      ? !isEmpty(userId)
        ? {
            $or: [
              { firstName: { $regex: name as string, $options: "i" } },
              { lastName: { $regex: name as string, $options: "i" } },
              { userId: { $regex: userId as string } },
            ],
          }
        : {
            $or: [
              { firstName: { $regex: name as string, $options: "i" } },
              { lastName: { $regex: name as string, $options: "i" } },
            ],
          }
      : !isEmpty(userId)
      ? { userId: { $regex: userId as string } }
      : {};

    const userList = await UserModel.find(querySearch)
      .limit(limit ?? 0)
      .skip(page > 0 ? (page - 1) * limit : 0)
      .sort({
        createdAt: -1,
      });
    return userList;
  },

  //   get a user by id
  retrieve: async (id: string) => {
    const user = await UserModel.findById(id);
    return user;
  },

  // update an user
  update: async (id: string, body: Partial<IUser>) => {
    const updatedUser = await UserModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    return updatedUser;
  },

  //   delete an user
  delete: async (id: string) => {
    await UserModel.findByIdAndDelete(id);
  },
};

export default userServices;
