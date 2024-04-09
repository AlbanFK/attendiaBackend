import { Request, Response } from "express";
import attendanceListServices from "./services";

import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { isEmpty } from "lodash";

let AttendanceListController = {
  create: async (req: Request, res: Response) => {
    const { name, timeframes, users } = req.body;
    if (!isEmpty(name) && !isEmpty(timeframes) && !isEmpty(users)) {
      try {
        const newAttendanceList = await attendanceListServices.create(req.body);

        res.status(StatusCodes.CREATED).json(newAttendanceList);
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
  getAttendanceLists: async (req: Request, res: Response) => {
    try {
      const { limit, page, search } = req.query;
      const lists = await attendanceListServices.list(
        ~~(limit ?? "0"),
        ~~(page ?? "0"),
        (search as string) ?? null
      );

      res.status(StatusCodes.OK).json(lists);
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
        const attendanceListFound = await attendanceListServices.retrieve(
          id as string
        );
        res.status(StatusCodes.OK).json(attendanceListFound);
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
        const attendanceListUpdated = await attendanceListServices.update(
          id,
          req.body
        );
        res.status(StatusCodes.OK).json(attendanceListUpdated);
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
        await attendanceListServices.delete(id);
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

export default AttendanceListController;
