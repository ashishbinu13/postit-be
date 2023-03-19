import { db } from "../utils/db.server";
import { User } from "./users.types";

const listUsers = async (): Promise<User[]> => {
  return db.users.findMany({
    select: { id: true, name: true, userId: true, email: true },
  });
};

const getUser = async (userId: string): Promise<User | null> => {
  return db.users.findUnique({
    where: { userId },
  });
};

const checkUserExists = async (
  userId: string,
  password: string
): Promise<User | null> => {
  return db.users.findFirst({
    where: { userId, password },
  });
};

export { listUsers, getUser, checkUserExists };
