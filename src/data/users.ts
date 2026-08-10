export interface User {
  id: number;
  name: string;
  email: string;
  age: string;
}

export const users: User[] = Array(100)
  .fill(null)
  .map((_, index) => {
    return {
      id: index + 1,
      name: `User ${index + 1}`,
      email: `user${index + 1}@gmail.com`,
      age: `${index + 1}`,
    };
  });

export const usersList: User[] = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: `User ${index + 1}`,
  email: `user${index + 1}@gmail.com`,
  age: `${index + 1}`,
}));
