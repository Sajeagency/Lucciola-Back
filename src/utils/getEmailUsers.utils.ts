import { PrismaClient } from "@prisma/client";
const { user } = new PrismaClient();
export const getEmailUsers = async (): Promise<string[]> => {
  const users = await user.findMany({
    where: {
      userRole: "user",
    },
    select: {
      email: true,
    },
  });
  return users.map((user) => user.email);
};
