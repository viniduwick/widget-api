import { Handler } from "aws-lambda";

import middy from "@middy/core";
import cors from "@middy/http-cors";
import headerNormalizer from "@middy/http-header-normalizer";
import jsonBodyParser from "@middy/http-json-body-parser";
import { logHandler } from "./LoggingLib";

export const middyfy = (handler: Handler) =>
  middy(handler).use([
    cors(),
    headerNormalizer(),
    logHandler(),
    jsonBodyParser(),
  ]);

export const middyfyStream = (handler: Handler) =>
  middy(handler).use([logHandler()]);
