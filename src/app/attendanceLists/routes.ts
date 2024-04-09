import express from "express";
import AttendanceListController from "./controllers";

const attendanceListRoutes = express.Router();

attendanceListRoutes
  .route("/api/v1/attendance_list")
  .post(AttendanceListController.create);

attendanceListRoutes
  .route("/api/v1/attendance_list")
  .get(AttendanceListController.getAttendanceLists);

attendanceListRoutes
  .route("/api/v1/attendance_list/:id")
  .get(AttendanceListController.retrieve);

attendanceListRoutes
  .route("/api/v1/attendance_list/:id")
  .patch(AttendanceListController.update);

attendanceListRoutes
  .route("/api/v1/attendance_list/:id")
  .delete(AttendanceListController.delete);

export default attendanceListRoutes;
