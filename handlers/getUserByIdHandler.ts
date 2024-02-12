import http, {
  OutgoingHttpHeaders,
  IncomingMessage,
  ServerResponse,
} from "http";
import { validate } from "uuid";
import { users } from "../controllers/userController";
import { CONTENT_TYPE, sendResponse } from "../helpers/helpers";

export const getUserById = (
  req: IncomingMessage,
  res: ServerResponse,
  url: string | undefined,
): void => {
  if (url && url.startsWith("/api/users/")) {
    const userId: string = url.split("/").pop() || "";

    if (validate(userId)) {
      const user = users.find((user) => user.id === userId);

      if (user) {
        sendResponse(res, 200, CONTENT_TYPE, user);
      } else {
        sendResponse(res, 404, CONTENT_TYPE, { error: "User not found" });
      }
    } else {
      sendResponse(res, 400, CONTENT_TYPE, { error: "Invalid user ID" });
    }
  } else {
    sendResponse(res, 404, CONTENT_TYPE, { error: "Endpoint not found" });
  }
};
