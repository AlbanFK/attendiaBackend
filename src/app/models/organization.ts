import mongoose, { Schema } from "mongoose";
import { IOrganization } from "../entities";

const organizationSchema = new Schema<IOrganization>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Organization", organizationSchema);
