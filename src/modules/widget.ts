import { isUndefined } from "lodash";
import { env } from "../libs/EnvLib";
import { s3ListObjects$ } from "../libs/S3Lib";

export const widgetList$ = async () => {
  if (isUndefined(env.BUCKET)) throw new Error("No bucket name provided");

  const response = await s3ListObjects$(env.BUCKET);
  return response;
};
