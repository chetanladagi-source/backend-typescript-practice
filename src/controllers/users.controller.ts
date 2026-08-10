import { Request, Response } from "express";
import { getUsers } from "../services/users.service";

export async function fetchUsers(req: Request, res: Response) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = getUsers(page, limit);

  res.json(result);
}
