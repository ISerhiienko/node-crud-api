import http, {
  IncomingMessage,
  ServerResponse,
  OutgoingHttpHeaders,
} from "http";
import dotenv from "dotenv";
import { getUsers } from "./handlers/getUsersHandler";
import { getUserById } from "./handlers/getUserByIdHandler";
import { createUserHandler } from "./handlers/createUserHandler";
import { updateUserHandler } from "./handlers/updateUserHandler";
import { deleteUserHandler } from "./handlers/deleteUserHandler";
import { CONTENT_TYPE, sendResponse } from "./helpers/helpers";

dotenv.config();

const server: http.Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse): void => {
    const url = req.url;

    if (req.method === "GET") {
      try {
        getUsers(req, res, url);
      } catch {
        sendResponse(res, 500, CONTENT_TYPE, {
          error: "Internal server error",
        });
      }
    } else if (url && url.startsWith("/api/users/")) {
      try {
        getUserById(req, res, url);
      } catch {
        sendResponse(res, 500, CONTENT_TYPE, {
          error: "Internal server error",
        });
      }
    } else if (req.method === "POST" && url === "/api/users") {
      try {
        createUserHandler(req, res);
      } catch {
        sendResponse(res, 500, CONTENT_TYPE, {
          error: "Internal server error",
        });
      }
    } else if (req.method === "PUT" && req.url?.startsWith("/api/users")) {
      try {
        updateUserHandler(req, res, req.url);
      } catch {
        sendResponse(res, 500, CONTENT_TYPE, {
          error: "Internal server error",
        });
      }
    } else if (req.method === "DELETE" && req.url?.startsWith("/api/users")) {
      try {
        deleteUserHandler(res, req.url);
      } catch {
        sendResponse(res, 500, CONTENT_TYPE, {
          error: "Internal server error",
        });
      }
    } else {
      sendResponse(res, 404, CONTENT_TYPE, {
        error: "Method is not allowed or URL is not found!",
      });
    }
  },
);

const PORT: string | undefined = process.env.PORT;

if (PORT) {
  server.listen(parseInt(PORT, 10), () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
} else {
  console.log("Error while reading .env occurred");
  console.log(
    ".env should contain the number of a port in the format PORT={number}",
  );
}
