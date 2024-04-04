import mongoose, { Schema } from "mongoose";
import { AttendanceStatus, IAttendance } from "../entities";

const attendanceSchema = new Schema<IAttendance>(
  {
    memberId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    checkerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    attendanceListId: {
      type: Schema.Types.ObjectId,
      ref: "AttendanceList",
      required: true,
    },
    timeframeId: {
      type: Schema.Types.ObjectId,
      ref: "Timeframe",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: Object.values(AttendanceStatus),
        message: "{VALUE} is not supported",
      },
      default: () => AttendanceStatus.PENDING,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Attendance", attendanceSchema);
