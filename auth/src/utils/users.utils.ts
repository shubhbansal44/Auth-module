import { db } from "@/lib/db.lib";

export const getUserByEmail = async (Email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email: Email } });
    return user;
  } catch {
    return null;
  }
}

export const getUserById = async (Id: string) => {
  try {
    const user = await db.user.findUnique({ where: { id: Id } });
    return user;
  } catch {
    return null;
  }
}

export const getSafeUser = async (Id: string) => {
  try {
    const user = await db.user.findUnique({
      where: { id: Id },
      select: {
        email: true,
        name: true,
        id: true,
        emailVerified: true,
        image: true,
        createdAt: true,
        updatedAt: true,
        
      }
    });
    return user;
  } catch {
    return null;
  }
}