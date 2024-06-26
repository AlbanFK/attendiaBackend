import { Request, Response } from "express";
import organizationServices from "./services";

import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { isEmpty } from "lodash";
// import { OrganizationModel } from "app/models";

let OrganizationController = {
  create: async (req: Request, res: Response) => {
    const { name } = req.body;
    if (name) {
      try {
        const newOrganization = await organizationServices.create(req.body);

        res.status(StatusCodes.CREATED).json(newOrganization);
      } catch (error) {
        console.log({ error });
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    }
  },
  getOrganizations: async (req: Request, res: Response) => {
    try {
      const { limit, page, search } = req.query;
      const organizations = await organizationServices.list(
        ~~(limit ?? "0"),
        ~~(page ?? "0"),
        (search as string) ?? null
      );

      res.status(StatusCodes.OK).json(organizations);
    } catch (error) {
      console.log({ error });
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
  },
  retrieve: async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!isEmpty(id)) {
      try {
        const organizationFound = await organizationServices.retrieve(
          id as string
        );
        res.status(StatusCodes.OK).json(organizationFound);
      } catch (error) {
        console.log({ error });
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    }
  },
  update: async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!isEmpty(req.body?.name) && !isEmpty(id)) {
      try {
        const organizationUpdated = await organizationServices.update(
          id,
          req.body
        );
        res.status(StatusCodes.OK).json(organizationUpdated);
      } catch (error) {
        console.log({ error });
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    }
  },
  delete: async (req: Request, res: Response) => {
    const { id } = req.params;
    if (!isEmpty(id)) {
      try {
        await organizationServices.delete(id);
        res.status(StatusCodes.OK).send(ReasonPhrases.OK);
      } catch (error) {
        console.log({ error });
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    }
  },
};

export default OrganizationController;
