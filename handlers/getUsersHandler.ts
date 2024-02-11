import http, {
  OutgoingHttpHeaders,
  IncomingMessage,
  ServerResponse,
} from "http";
import { validate } from "uuid";
import { users } from "../controllers/userController";

const CONTENT_TYPE: OutgoingHttpHeaders = {
  "Content-Type": "application/json",
};

const sendResponse = (
  res: http.ServerResponse,
  code: number,
  contentType: OutgoingHttpHeaders,
  data: object | undefined,
): void => {
  const jsonData = JSON.stringify(data);
  res.writeHead(code, contentType);
  res.end(jsonData);
};

export const getUsers = (
  req: IncomingMessage,
  res: ServerResponse,
  url: string | undefined,
): void => {
  if (url === "/api/users") {
    sendResponse(res, 200, CONTENT_TYPE, users);
  } else if (url && url.startsWith("/api/users/")) {
    const id: string = url.split("/").pop() || "";

    if (validate(id)) {
      const user = users.find((user) => user.id === id);

      if (user) {
        sendResponse(res, 200, CONTENT_TYPE, user);
      } else {
        sendResponse(res, 404, CONTENT_TYPE, { error: "User is not found" });
      }
    } else {
      sendResponse(res, 400, CONTENT_TYPE, { error: "User ID is incorrect" });
    }
  } else {
    sendResponse(res, 404, CONTENT_TYPE, { error: "Endpoint is not found" });
  }
};
