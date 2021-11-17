import * as mongoose from "mongoose";
import * as mongoosePaginate from "mongoose-paginate-v2";

export const applyPlugins = (
  schema: mongoose.Schema<mongoose.Document<any, any, any>>
) => {
  mongoosePaginate(schema);
  return schema;
};
