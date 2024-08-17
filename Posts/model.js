import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("Posts", schema);
export default model;