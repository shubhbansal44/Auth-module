import { db } from "@/lib/db.lib";
import { generateTwoFactorAuthConfirmation } from "@/lib/tokens.lib";
import { getTwoFactorAuthTokenByToken } from "@/utils/twoFactorAuthTokens.utils";
import { getUserByEmail } from "@/utils/users.utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    if (!token) {
      return NextResponse.json(
        {
          message: "Unauthorized access!",
          status: 400,
          success: false,
        },
        { status: 400 }
      );
    }

    const existingTwoFactorAuthToken = await getTwoFactorAuthTokenByToken(
      token
    );

    if (!existingTwoFactorAuthToken) {
      return NextResponse.json(
        {
          message: "Invalid OTP!",
          status: 404,
          success: false,
        },
        { status: 404 }
      );
    }

    const isExpired = new Date(existingTwoFactorAuthToken.expires) < new Date();

    if (isExpired) {
      return NextResponse.json(
        {
          message: "OTP has expired!",
          status: 400,
          success: false,
        },
        { status: 400 }
      );
    }

    const existingUser = await getUserByEmail(existingTwoFactorAuthToken.email);

    if (!existingUser) {
      return NextResponse.json(
        {
          message: "User doesn't exists!",
          status: 404,
          success: false,
        },
        { status: 404 }
      );
    }

    await db.twoFactorAuthToken.delete({
      where: { id: existingTwoFactorAuthToken.id }
    })

    const twoFactorAuthConfirmation = await generateTwoFactorAuthConfirmation({
      userId: existingUser.id,
    });

    if (!twoFactorAuthConfirmation) {
      return NextResponse.json(
        {
          message: "Internal server error.",
          status: 500,
          success: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "User authenticated successfully!",
        status: 200,
        success: true,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
        status: 500,
        success: false,
      },
      { status: 500 }
    );
  }
}
