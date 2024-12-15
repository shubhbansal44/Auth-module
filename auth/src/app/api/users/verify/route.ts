import { db } from "@/lib/db.lib";
import { getUserByEmail } from "@/utils/users.utils";
import { getVerificationTokenByToken } from "@/utils/verificationTokens.utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    if (!token) {
      return NextResponse.json(
        {
          message: "Unauthorized request!",
          status: 400,
          success: false,
        },
        { status: 400 }
      );
    }

    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
      return NextResponse.json(
        {
          message: "Invalid Token!",
          status: 404,
          success: false,
        },
        { status: 404 }
      );
    }

    const isExpired = new Date(existingToken.expires) < new Date();

    if (isExpired) {
      return NextResponse.json(
        {
          message: "Token has expired!",
          status: 400,
          success: false,
        },
        { status: 400 }
      );
    }

    const existingUser = await getUserByEmail(existingToken.email);

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

    await db.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    await db.verificationToken.delete({
      where: { id: existingToken.id },
    });

    return NextResponse.json(
      {
        message: "User verified successfully!",
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
