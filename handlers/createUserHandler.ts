import { IncomingMessage, OutgoingHttpHeaders, ServerResponse } from "http";
import { v4 as uuidv4 } from "uuid";
import { User, users } from "../controllers/userController";
import { CONTENT_TYPE, sendResponse } from "../helpers/helpers";

const validateBody = (user: Partial<User>): boolean => {
  return "username" in user && "age" in user && "hobbies" in user;
};

export const createUserHandler = (
  req: IncomingMessage,
  res: ServerResponse,
): void => {
  let data: string = "";

  req.on("data", (chunk: any): void => {
    data += chunk;
  });

  req.on("end", (): void => {
    try {
      const userData: Partial<User> = JSON.parse(data);

      if (validateBody(userData)) {
        const newUser: User = {
          id: uuidv4(),
          username: userData.username!,
          age: userData.age!,
          hobbies: userData.hobbies!,
        };

        users.push(newUser);
        sendResponse(res, 201, CONTENT_TYPE, newUser);
      } else {
        sendResponse(res, 400, CONTENT_TYPE, {
          error: "Request body does not contain valid user data",
        });
      }
    } catch (error) {
      sendResponse(res, 400, CONTENT_TYPE, {
        error: "Invalid JSON data",
      });
    }
  });
};
