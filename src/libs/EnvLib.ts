import { InferType, object, string } from "yup";
import { cast } from "./YupLib";

export const EnvSchema = object({
  BUCKET: string().default(process.env.BUCKET),
});

export type EnvData = InferType<typeof EnvSchema>;

export const env: EnvData = cast({}, EnvSchema);
