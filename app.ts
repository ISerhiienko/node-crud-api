import http, { IncomingMessage, ServerResponse } from "http";
import dotenv from "dotenv";
import { getUsers } from "./handlers/getUsersHandler";
import { getUserById } from "./handlers/getUserByIdHandler";
import { createUserHandler } from "./handlers/createUserHandler";
import { updateUserHandler } from "./handlers/updateUserHandler";

dotenv.config();

const server: http.Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse): void => {
    const url = req.url;

    if (req.method === "GET") {
      getUsers(req, res, url);
    } else if (url && url.startsWith("/api/users/")) {
      getUserById(req, res, url);
    } else if (req.method === "POST" && url === "/api/users") {
      createUserHandler(req, res);
    } else if (req.method === "PUT" && req.url?.startsWith("/api/users")) {
      updateUserHandler(req, res, req.url);
    } else {
      res.writeHead(405, { "Content-Type": "text/plain" });
      res.end("Method Not Allowed");
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
