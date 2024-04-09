import { Request, Response } from "express";
import userServices from "./services";

import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { isEmpty } from "lodash";
// import { OrganizationModel } from "app/models";

let UserController = {
  create: async (req: Request, res: Response) => {
    // if (firstName && ) {
    try {
      const newUsers = await userServices.create(req.body);

      res.status(StatusCodes.CREATED).json(newUsers);
    } catch (error) {
      console.log({ error });
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
    // } else {
    //   res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST);
    // }
  },
  getUsers: async (req: Request, res: Response) => {
    try {
      const { limit, page, name, organizationId } = req.query;
      const users = await userServices.list(
        ~~(limit ?? "0"),
        ~~(page ?? "0"),
        (name as string) ?? null,
        (organizationId as string) ?? null
      );

      res.status(StatusCodes.OK).json(users);
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
        const userFound = await userServices.retrieve(id as string);
        res.status(StatusCodes.OK).json(userFound);
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
    if (!isEmpty(id)) {
      try {
        const userUpdated = await userServices.update(id, req.body);
        res.status(StatusCodes.OK).json(userUpdated);
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
        await userServices.delete(id);
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

export default UserController;
