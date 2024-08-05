import { generateToken, verifyToken } from "@/libs/jwt";
import prisma from "@/libs/prisma";
import sendEmailHandler from "@/libs/sendEmail";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const { email } = data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          message: "Email not found",
        },
        { status: 404 }
      );
    }
    const payload = {
      id : user.user_id,
      email : user.email
    }
    const createToken = generateToken(payload);

    const subject = "Forgot Password Link";
    const text = `http://localhost:3000/forgot-password/new-password?token=${createToken}`;
    await sendEmailHandler(email, subject, text);

    return NextResponse.json({
      sendEmail: true,
      message: "email has been sent, please check your email",
    });
  } catch (error) {
    return NextResponse.json(
        {
            message: "Internal Server Error",
        }
    )
  }
}
