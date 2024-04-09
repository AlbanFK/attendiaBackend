import { IOrganization } from "app/entities";
import { OrganizationModel } from "../models";
import { isEmpty } from "lodash";

let organizationServices = {
  create: async (body: { name: string }) => {
    const newOrganization = await OrganizationModel.create(body);
    return newOrganization;
  },

  //   get a paginated list of organizations
  list: async (limit: number, page: number, searchParam: string | null) => {
    /*implementing search 
    <Link> https://www.mongodb.com/docs/manual/reference/operator/query/regex/ */
    let querySearch = !isEmpty(searchParam)
      ? { name: { $regex: searchParam as string, $options: "i" } }
      : {};

    const organizationsList = await OrganizationModel.find(querySearch)
      .limit(limit ?? 0)
      .skip(page > 0 ? (page - 1) * limit : 0)
      .sort({
        createdAt: -1,
      });
    return organizationsList;
  },

  //   get an organization by id
  retrieve: async (id: string) => {
    const organization = await OrganizationModel.findById(id);
    return organization;
  },

  // update an organization
  update: async (id: string, body: Partial<IOrganization>) => {
    const updatedOrganization = await OrganizationModel.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );
    return updatedOrganization;
  },

  //   delete an organization
  delete: async (id: string) => {
    await OrganizationModel.findByIdAndDelete(id);
  },
};

export default organizationServices;
