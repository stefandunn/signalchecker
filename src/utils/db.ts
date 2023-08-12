import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type QueryCallback<T> = (prism: PrismaClient) => Promise<T>;

export const dbQuery = async <T = any>(queryCallback: QueryCallback<T>) => {
  const response = await queryCallback(prisma);
  await prisma.$disconnect();
  return response;
};
