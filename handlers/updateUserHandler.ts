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

const validateUpdateBody = (user: object): boolean => {
  return "username" in user || "age" in user || "hobbies" in user;
};
export const updateUserHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  url: string,
): void => {
  let data: string = "";

  req.on("data", (chunk: string): void => {
    data += chunk;
  });

  req.on("end", (): void => {
    const newUser: User = JSON.parse(data);
    console.log(newUser);

    if (validateUpdateBody(newUser)) {
      const id: string = url?.split("/").slice(-1)[0];

      if (validate(id)) {
        const userIndex: number = users.findIndex((u) => u.id === id);

        if (userIndex !== -1) {
          users[userIndex] = { ...users[userIndex], ...newUser };

          // console.log("users", users);
          // console.log("userIndex", userIndex);
          // console.log("newUser", newUser);

          sendResponse(res, 200, CONTENT_TYPE, users[userIndex]);
        } else {
          sendResponse(res, 404, CONTENT_TYPE, { error: "User is not found" });
        }
      } else {
        sendResponse(res, 400, CONTENT_TYPE, { error: "User ID is incorrect" });
      }
    } else {
      sendResponse(res, 400, CONTENT_TYPE, {
        error: "Request body does not contain required fields",
      });
    }
  });
};
