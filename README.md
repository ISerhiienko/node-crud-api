## NODE CRUD API

Node CRUD API created with TypeScript.

### Installation

Clone the repository and install all the required dependencies.

```shell
git clone https://github.com/ISerhiienko/node-crud-api.git
cd node-crud-api
git checkout origin/dev
npm install
```

In the root directory create a file named `.env` and declare the `PORT` variable there. For example:

```text
PORT=5000
```

### Running

There are two modes to run the server: **development** and **production**.

To run the server in development mode using `ts-node-dev` use:

```shell
npm run start:dev
```

To run the server in production mode using `ts-node` use:

```shell
npm run start:prod
```

In case of success, you will see the message `Server is running on http://localhost:<PORT>`, where the `PORT` is the number that you declared in `.env` file.

### Users

All operations in this API are performed on the `user` entity. Each `user` is an `object` and has the following structure:

```json
{
  "id": string, // generated with uuid4
  "username": string,
  "age": number,
  "hobbies": array[string]
}
```

All the fields are **required**.

### Endpoints

- **GET** `/api/users` is used to get all the users
- **GET** `/api/users/{id}` is used to get the user by its `id`
- **POST** `/api/users` is used to create record about new user (JSON with all the required fields except for `id` is necessary)
- **PUT** `/api/users/{id}` is used to update existing user by its `id` (JSON with updated fields is necessary)
- **DELETE** `/api/users/{id}` is used to delete existing user by its `id`

### Tests

All the test is located in `/tests` directory and have `.test.ts` extension. To run the test use:

```shell
npm test
```
