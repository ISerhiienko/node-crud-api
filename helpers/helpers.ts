import { OutgoingHttpHeaders, ServerResponse } from "http";

export const CONTENT_TYPE: OutgoingHttpHeaders = {
  "Content-Type": "application/json",
};
export const sendResponse = (
  res: ServerResponse,
  code: number,
  contentType: OutgoingHttpHeaders,
  data: object | undefined,
): void => {
  const jsonData: string = JSON.stringify(data);
  res.writeHead(code, contentType);
  res.end(jsonData);
};
