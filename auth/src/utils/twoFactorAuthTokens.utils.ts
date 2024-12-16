import { db } from "@/lib/db.lib";

export const getTwoFactorAuthTokenByEmail = async (email: string) => {
  try {
    const twoFactorAuthToken = await db.twoFactorAuthToken.findFirst({
      where: { email: email },
    });

    return twoFactorAuthToken;
  } catch (error) {
    return null;
  }
};

export const getTwoFactorAuthTokenByToken = async (token: string) => {
  try {
    const twoFactorAuthToken = await db.twoFactorAuthToken.findUnique({
      where: { token: token },
    });

    return twoFactorAuthToken;
  } catch (error) {
    return null;
  }
};
