import { APIGatewayProxyEvent } from "aws-lambda";
import { responseFormatError, responseFormatJSON } from "../libs/ResponseLib";
import { widgetList$ } from "../modules/widget";
import { middyfy } from "@libs/MiddyLib";

export const route$ = async (event: APIGatewayProxyEvent) => {
  if (event.httpMethod === "GET" && event.path === "/") {
    const response = await widgetList$();
    return responseFormatJSON(response);
  }

  throw new Error(`Unimplemented HTTP method: ${event.httpMethod}`);
};

export const handler$ = middyfy(async (event: APIGatewayProxyEvent) => {
  try {
    return await route$(event);
  } catch (error: any) {
    console.error(error);
    return responseFormatError(error);
  }
});
