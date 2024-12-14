import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { LoginSchema } from "@/schemas/authSchema";
import { getSafeUser, getUserByEmail } from "@/utils/users.utils";

interface RequestBody {
  email: string,
  password: string,
}

export async function POST(request: NextRequest) {
  try {
    const reqBody: RequestBody = await request.json();
    const validate = LoginSchema.safeParse(reqBody)

    if(!validate.success) {
      return NextResponse.json({
        message: "Invalid Credentials!",
        status: 400,
        success: false,
      }, {status: 400})
    }

    const { password, email } = validate.data;

    const user = await getUserByEmail(email)

    if (!user || !user.password) {
      return NextResponse.json({
        message: "Login failed, user doesn't exists.",
        status: 404,
        success: false,
      }, {status: 404});
    }

    const isValid = await compare(password, user.password)

    if (!isValid) {
      return NextResponse.json({
        error: "Incorrect Password!",
        status: 400,
        success: false,
      }, {status: 400});
    }

    const returnUser = await getSafeUser(user.id)

    if(!returnUser) {
      return NextResponse.json({
        error: "Internal server error",
        status: 500,
        success: false,
      }, {status: 500});
    }

    return NextResponse.json({
      messsage: "Login successfull!",
      status: 200,
      success: true,
      user: returnUser,
    }, {status: 200});
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
      success: false,
    }, {status: 500});
  }
}