import { db } from "@/lib/db.lib";
import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash } from "bcryptjs";
import { getSafeUser, getUserByEmail } from "@/utils/users.utils";
import { RegisterSchema } from "@/schemas/authSchema";
import { generateVerificationToken } from "@/lib/tokens.lib";
import { sendVerificationEmail } from "@/utils/mailer.utils";

interface RequestBody {
  name: string;
  password: string;
  email: string;
}

export async function POST(request: NextRequest) {
  try {
    const reqBody: RequestBody = await request.json();
    const validate = RegisterSchema.safeParse(reqBody);

    if(!validate.success) {
      return NextResponse.json({
        message: "Invalid credentials.",
        status: 400,
        success: false,
      }, {status: 400});
    }

    const { name, password, email } = validate.data;

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return NextResponse.json({
        message: "Email already in use!",
        status: 400,
        success: false,
      }, {status: 400});
    }

    const salt = await genSalt(10);
    const _password = await hash(password, salt);

    const registeredUser = await db.user.create({
      data: {
        name,
        email,
        password: _password,
      },
    });

    if(!registeredUser) {
      return NextResponse.json({
        message: "unable to register new user!",
        status: 500,
        success: false,
      }, {status: 500})
    }

    const returnUser = await getSafeUser(registeredUser.id)

    if(!returnUser) {

      await db.user.delete({
        where: {
          id: registeredUser.id
        }
      })

      return NextResponse.json({
        message: "Internal server error!",
        status: 500,
        success: false,
      }, {status: 500});
    }

    const verificationToken = await generateVerificationToken({ email, name })

    if(!verificationToken) {

      await db.user.delete({
        where: {
          id: returnUser.id
        }
      })

      return NextResponse.json({
        message: "Token generation failed.",
        status: 500,
        success: false,
      }, {status: 500});
    }

    const mailInfo = await sendVerificationEmail({
      name: verificationToken.name,
      email: verificationToken.email,
      token: verificationToken.token
    })

    if(!mailInfo) {

      await db.user.delete({
        where: {
          id: returnUser.id
        }
      })

      return NextResponse.json({
        message: "Unable to send verification mail.",
        status: 500,
        success: false,
      }, {status: 500});
    }

    return NextResponse.json({
      message: "Verification mail sent!",
      success: true,
      status: 200,
      user: returnUser
    }, {status: 200});
  } catch (error: any) {
    return NextResponse.json({
      message: error.message,
      status: 500,
      success: false,
    }, {status: 500});
  }
}
