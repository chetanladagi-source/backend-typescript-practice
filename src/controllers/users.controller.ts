import { Request, Response } from "express";
import { getUsers } from "../services/users.service";

export function fetchUsers(req: Request, res: Response) {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = getUsers(page, limit);

  res.json(result);
}
