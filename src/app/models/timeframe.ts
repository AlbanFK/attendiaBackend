import mongoose, { Schema } from "mongoose";
import { ITimeframe } from "../entities";

const timeframeSchema = new Schema<ITimeframe>(
  {
    name: { type: String, required: true },
    description: String,
    startDate: { type: String, required: true },
    endDate: { type: String, required: true },
    attendanceList: {
      type: Schema.Types.ObjectId,
      ref: "AttendanceList",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Timeframe", timeframeSchema);
