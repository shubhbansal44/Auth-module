import { db } from "@/lib/db.lib";
import { getResetPasswordTokenByToken } from "@/utils/resetPasswordTokens.utils";
import { getUserByEmail } from "@/utils/users.utils";
import { genSalt, hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { passwords, token } = reqBody;
    const { newPassword, confirmPassword } = passwords

    if(!token) {
      return NextResponse.json(
        {
          message: "Unauthorized request!",
          status: 400,
          success: false,
        },
        { status: 400 }
      );
    }

    if(newPassword !== confirmPassword) {
      return NextResponse.json(
        {
          message: "Passwords don't match!",
          status: 400,
          success: false,
        },
        { status: 400 }
      );
    }

    const existingToken = await getResetPasswordTokenByToken(token)

    if(!existingToken) {
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

    const existingUser = await getUserByEmail(existingToken.email)

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

    const salt = await genSalt(10);
    const _password = await hash(newPassword, salt);

    await db.user.update({
      where: { id: existingUser.id },
      data: {
        password: _password,
      },
    });

    await db.resetPasswordToken.delete({
      where: { id: existingToken.id },
    });

    return NextResponse.json(
      {
        message: "Password changed!",
        success: true,
        status: 200,
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
