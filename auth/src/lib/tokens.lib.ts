import { db } from "@/lib/db.lib";
import { v4 as uuid } from "uuid";
import crypto from "crypto";
import { getVerificationTokenByEmail } from "@/utils/verificationTokens.utils";
import { getResetPasswordTokenByEmail } from "@/utils/resetPasswordTokens.utils";
import { getTwoFactorAuthTokenByEmail } from "@/utils/twoFactorAuthTokens.utils";

interface verificationTokenOptions {
  email: string;
  name: string;
}

export const generateVerificationToken = async ({
  email,
  name,
}: verificationTokenOptions) => {
  try {
    const token = uuid();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour

    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
      await db.verificationToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const verificationToken = await db.verificationToken.create({
      data: {
        name: name,
        email: email,
        token: token,
        expires: expires,
      },
    });

    return verificationToken;
  } catch {
    return null;
  }
};

interface resetPasswordTokenOptions {
  email: string;
  name: string;
}

export const generateResetPasswordToken = async ({
  email,
  name,
}: resetPasswordTokenOptions) => {
  try {
    const token = uuid();
    const expires = new Date(new Date().getTime() + 900 * 1000); // 15 minutes

    const existingToken = await getResetPasswordTokenByEmail(email);

    if (existingToken) {
      await db.resetPasswordToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const resetPasswordToken = await db.resetPasswordToken.create({
      data: {
        name: name,
        email: email,
        token: token,
        expires: expires,
      },
    });

    return resetPasswordToken;
  } catch {
    return null;
  }
};

interface twoFactorAuthTokenOptions {
  email: string;
  name: string;
}

export const generateTwoFactorAuthToken = async ({
  email,
  name,
}: twoFactorAuthTokenOptions) => {
  try {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expires = new Date(new Date().getTime() + 600 * 1000); // 10 minutes

    const existingToken = await getTwoFactorAuthTokenByEmail(email);

    if (existingToken) {
      await db.twoFactorAuthToken.delete({
        where: {
          id: existingToken.id,
        },
      });
    }

    const twoFactorAuthToken = await db.twoFactorAuthToken.create({
      data: {
        name: name,
        email: email,
        token: token,
        expires: expires,
      },
    });

    return twoFactorAuthToken;
  } catch {
    return null;
  }
};

interface twoFactorAuthConfirmationOptions {
  userId: string;
}

export const generateTwoFactorAuthConfirmation = async ({
  userId,
}: twoFactorAuthConfirmationOptions) => {
  try {
    const twoFactorAuthConfirmation = await db.twoFactorAuthConfirmation.create({
      data: {
        userId: userId,
      },
    });

    return twoFactorAuthConfirmation;
  } catch {
    return null;
  }
};
