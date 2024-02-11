import http, { IncomingMessage, ServerResponse } from "http";
import dotenv from "dotenv";
import { getUsers } from "./handlers/getUsersHandler";

dotenv.config();

const server: http.Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse): void => {
    if (req.method === "GET") {
      const url = req.url;
      getUsers(req, res, url);
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
