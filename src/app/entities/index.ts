import { Types } from "mongoose";
import { BaseData } from "./base.entities";

export enum UserRole {
  ADMIN = "admin",
  MODERATOR = "moderator",
  MEMBER = "member",
}

export enum AttendanceStatus {
  PRESENT = "present",
  ABSENT = "absent",
  PENDING = "pending",
}

export interface IOrganization extends BaseData {
  name: string;
}

export interface IAttendanceList extends BaseData {
  name: string;
  users: [{ id: Types.ObjectId; addedAt: string }];
  timeframes: [Types.ObjectId];
}

export interface IUser extends BaseData {
  firstName: string;
  lastName: string;
  role: UserRole;
  email?: string;
  password?: string;
  phoneNumber?: string;
  profilePic?: string;
  organizationPosition?: string;
  organizationId: Types.ObjectId;
  attendanceLists?: [{ id: Types.ObjectId; addedAt: string }];
}

export interface ITimeframe extends BaseData {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  attendanceList: Types.ObjectId;
}

export interface IAttendance extends BaseData {
  memberId: Types.ObjectId;
  checkerId: Types.ObjectId;
  attendanceListId: Types.ObjectId;
  timeframeId: Types.ObjectId;
  status: AttendanceStatus;
}
