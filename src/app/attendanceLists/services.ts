import { IAttendanceList } from "app/entities";
import { AttendanceListModel } from "app/models";
import { isEmpty } from "lodash";

export interface CreateAttendanceListDTO {
  name: string;
  users: string[];
  timeframes: string[];
}

let attendanceListServices = {
  create: async (body: CreateAttendanceListDTO) => {
    const newList = await AttendanceListModel.create(body);
    return newList;
  },

  //   get a paginated list of attendances list
  list: async (limit: number, page: number, search: string | null) => {
    /*implementing search 
      <Link> https://www.mongodb.com/docs/manual/reference/operator/query/regex/ */
    let querySearch = !isEmpty(search)
      ? { name: { $regex: search as string, $options: "i" } }
      : {};

    const attendanceLists = await AttendanceListModel.find(querySearch)
      .limit(limit ?? 0)
      .skip(page > 0 ? (page - 1) * limit : 0)
      .sort({
        createdAt: -1,
      });
    return attendanceLists;
  },

  //   get an attendance list by id
  retrieve: async (id: string) => {
    const attendanceList = await AttendanceListModel.findById(id);
    return attendanceList;
  },

  // update an attendance list
  update: async (id: string, body: Partial<IAttendanceList>) => {
    const updatedAttendanceList = await AttendanceListModel.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );
    return updatedAttendanceList;
  },

  //   delete an attendance list
  delete: async (id: string) => {
    await AttendanceListModel.findByIdAndDelete(id);
  },
};

export default attendanceListServices;
