import { getVerificationTokenByEmail } from "@/utils/verificationTokens.utils";
import { v4 as uuid } from "uuid";
import { db } from "@/lib/db.lib";

interface tokenOptions {
  email: string;
  name: string
}

export const generateVerificationToken = async ({ email, name }: tokenOptions) => {
  try {
    const token = uuid();
    const expires = new Date(new Date().getTime() + 3600 * 1000);
  
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
    return null
  }
};
