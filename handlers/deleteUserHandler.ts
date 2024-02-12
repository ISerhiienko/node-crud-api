import { IncomingMessage, OutgoingHttpHeaders, ServerResponse } from "http";
import { validate, v4 as uuidv4 } from "uuid";
import { User, users } from "../controllers/userController";

const CONTENT_TYPE: OutgoingHttpHeaders = {
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

export const deleteUserHandler = (res: ServerResponse, url: string): void => {
  const id: string = url?.split("/").slice(-1)[0];

  if (validate(id)) {
    const userIndex: number = users.findIndex((u) => u.id === id);

    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      sendResponse(res, 204, CONTENT_TYPE, {});
    } else {
      sendResponse(res, 404, CONTENT_TYPE, { error: "User is not found" });
    }
  } else {
    sendResponse(res, 400, CONTENT_TYPE, { error: "User ID is incorrect" });
  }
};
