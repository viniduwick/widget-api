/**
 * Logging Lib
 *
 * - reduce chatter for logging, while still having debug info incase there is a problem
 * - output `info` immediately
 * - output `error` immediately - this is managed manually
 * - hold onto `debug` and only output them on an actual error that is not caught
 */

import { forEach, has } from "lodash";

import { MiddlewareObj } from "@middy/core";

import { responseFormatError } from "./ResponseLib";

interface LogEntry {
  funcName: string;
  props: any;
}

const logs: LogEntry[] = [];

let debugFlag = false;

export const logReset = () => {
  // empties the logs but keeps the original array
  logs.splice(0, logs.length);
};

export const logInfo = (
  funcName: string,
  props: object | undefined = undefined
) => {
  console.log(funcName, props); // eslint-disable-line no-console
  logs.push({ funcName, props }); // also publish on error to keep context
};

export const logInput = (props: object) => {
  // log the input of a handler
  console.log("input", props); // eslint-disable-line no-console
};

export const logDebug = (
  funcName: string,
  props: object | undefined = undefined
) => {
  // if debug, then output anyway
  if (debugFlag) console.log(funcName, props); // eslint-disable-line no-console
  logs.push({ funcName, props });
};

export const logOutputStoredLogs = () => {
  forEach(logs, ({ funcName, props }) => console.log(funcName, props)); // eslint-disable-line no-console
  logReset();
};

export const logError = (
  funcName: string,
  error: any,
  props: object | undefined = undefined
) => {
  // nb. this is for manually caught errors
  console.error(funcName, error, props); // eslint-disable-line no-console
};

export const logHandler = (setDebugFlag = false): MiddlewareObj => {
  const handleBefore = async (request: any) => {
    logReset();
    debugFlag =
      setDebugFlag || has(request, ["event", "queryStringParameters", "debug"]);
  };

  const handleAfter = async () => {
    // in case a lambda is reused
    logReset();
    debugFlag = false;
  };

  const handleError = async (request: any) => {
    // this is for an uncaught error
    const errorMessage = request?.error.toString() || "Unknown error";
    // simple message
    console.error("ERROR", errorMessage); // eslint-disable-line no-console
    logOutputStoredLogs();
    // error stack
    console.error("ERROR", request?.error); // eslint-disable-line no-console
    request.response = responseFormatError(errorMessage);
    request.statusCode = 200;
  };

  return {
    before: handleBefore,
    after: handleAfter,
    onError: handleError,
  };
};
