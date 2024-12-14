import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash } from "bcryptjs";
import { getSafeUser, getUserByEmail } from "@/utils/users.utils";
import { RegisterSchema } from "@/schemas/authSchema";

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
        error: "Invalid credentials.",
        status: 400,
        success: false,
      }, {status: 400});
    }

    const { name, password, email } = validate.data;

    const existingUser = await getUserByEmail(email)

    if (existingUser) {
      return NextResponse.json({
        error: "Email already in use!",
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
        error: "unable to register new user!",
        status: 500,
        success: false,
      }, {status: 500})
    }

    const returnUser = await getSafeUser(registeredUser.id)

    if(!returnUser) {
      return NextResponse.json({
        error: "Internal server error!",
        status: 500,
        success: false,
      }, {status: 500});
    }

    return NextResponse.json({
      message: "User registered successfully!",
      success: true,
      status: 200,
      user: returnUser
    }, {status: 200});
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      success: false,
    }, {status: 500});
  }
}
