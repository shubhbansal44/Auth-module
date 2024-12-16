import { db } from "@/lib/db.lib";

export const getTwoFactorAuthConfirmationByUserId = async (userId: string) => {
  try {
    const twoFactorAuthConfirmation = await db.twoFactorAuthConfirmation.findUnique({
      where: { userId: userId },
    });

    return twoFactorAuthConfirmation;
  } catch (error) {
    return null;
  }
};
