import { generateResetPasswordToken } from "@/lib/tokens.lib";
import { ResetSchema } from "@/schemas/authSchema";
import { sendResetPasswordMail } from "@/utils/mailer.utils";
import { getUserByEmail } from "@/utils/users.utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const validate = ResetSchema.safeParse(reqBody);

    if (!validate.success) {
      return NextResponse.json(
        {
          message: "Invalid Credentials!",
          status: 400,
          success: false,
        },
        { status: 400 }
      );
    }

    const { email } = validate.data;

    const existingUser = await getUserByEmail(email);

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

    const resetPasswordToken = await generateResetPasswordToken({
      email: existingUser.email!,
      name: existingUser.name!,
    });

    if (!resetPasswordToken) {
      return NextResponse.json(
        {
          message: "Token generation failed.",
          status: 500,
          success: false,
        },
        { status: 500 }
      );
    }

    const mailInfo = sendResetPasswordMail({
      name: resetPasswordToken.name,
      email: resetPasswordToken.email,
      token: resetPasswordToken.token,
    });

    if (!mailInfo) {
      return NextResponse.json(
        {
          message: "Unable to send reset mail.",
          status: 500,
          success: false,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        message: "Reset mail sent!",
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
