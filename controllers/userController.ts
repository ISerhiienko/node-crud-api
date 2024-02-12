import { v4 as uuidv4 } from "uuid";

export interface User {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export const users: User[] = [
  {
    id: uuidv4(),
    username: "user1",
    age: 20,
    hobbies: ["sport", "music"],
  },
  {
    id: uuidv4(),
    username: "user2",
    age: 30,
    hobbies: ["cars", "girls"],
  },
  {
    id: uuidv4(),
    username: "user3",
    age: 40,
    hobbies: ["food", "nature"],
  },
];
