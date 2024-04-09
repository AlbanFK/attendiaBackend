import mongoose, { Schema } from "mongoose";
import { IAttendanceList } from "../entities";

const attendanceListSchema = new Schema<IAttendanceList>(
  {
    name: { type: String, required: true },
    users: {
      type: [
        {
          id: {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
          addedAt: String,
        },
      ],
      required: true,
    },
    timeframes: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Timeframe",
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AttendanceList", attendanceListSchema);
