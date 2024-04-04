import mongoose, { Schema } from "mongoose";
import { IUser, UserRole } from "../entities";

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: [true, "first name is required"] },
    lastName: { type: String, required: [true, "last name is required"] },
    role: {
      type: String,
      enum: {
        values: Object.values(UserRole),
        message: "{VALUE} is not supported",
      },
      default: () => UserRole.MEMBER,
    },
    email: { type: String, required: [true, "email is required"] },
    password: { type: String, required: [true, "password is required"] },
    phoneNumber: String,
    profilePic: String,
    organizationPosition: String,
    organizationId: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: [true, "organization id is required"],
    },
    attendanceLists: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "AttendanceList",
        },
        addedAt: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
