import http from 'http';
import dotenv from 'dotenv';

dotenv.config();

const server: http.Server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse): void => {

});

const PORT: string | undefined = process.env.PORT;

if (PORT) {
    server.listen(parseInt(PORT, 10), () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
} else {
    console.log('Error while reading .env occurred');
    console.log('.env should contain the number of a port in the format PORT={number}');
}