import { AnySchema } from "yup";

export const cast = <T extends AnySchema>(
  data: any,
  schema: T,
  stripUnknown = true
) => {
  return schema.cast(data, { stripUnknown });
};
