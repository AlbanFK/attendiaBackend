import mongoose, { Schema } from "mongoose";
import { IAttendanceList } from "../entities";

const attendanceListSchema = new Schema<IAttendanceList>(
  {
    name: { type: String, required: true },
    users: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        addedAt: String,
      },
    ],
    timeframes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Timeframe",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AttendanceList", attendanceListSchema);
