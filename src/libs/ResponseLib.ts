export const responseFormat = (body: any, statusCode = 200) => {
  return {
    statusCode,
    body: JSON.stringify({
      "@": Date.now(),
      ...body,
    }),
  };
};

export const responseFormatJSON = (
  data: any = undefined,
  extras: any = {},
  statusCode = 200
) => {
  return responseFormat(
    {
      status: true,
      data,
      ...extras,
    },
    statusCode
  );
};

export const responseFormatError = (errorMessage: string, statusCode = 200) => {
  return responseFormat(
    {
      status: false,
      error: errorMessage,
    },
    statusCode
  );
};
