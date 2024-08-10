import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/libs/prisma";

export async function POST(request) {
  try {
    const data = await request.json();
    const { email, username, password } = data;
    console.log(email, username, password);

    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        {
          isCreated: false,
          message: "Email already exists",
        },
        { status: 400 }
      );
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userId = Date.now().toString();

    const userImg = "https://storage.cloud.google.com/goritmix-web-ukm/user-images/defaultavatar1.jpg"

    await prisma.user.create({
      data: {
        user_id: userId,
        email: email,
        password_hash: hashedPassword,
        username: username,
        user_img: userImg,
      },
    });

    return NextResponse.json({
      isCreated: true,
      message: "Account created successfully!",
    });
  } catch (error) {
    console.error("Error creating account:", error);
    return NextResponse.json(
      {
        isCreated: false,
        message: "Failed to create account. Please try again later.",
        errorMessage: error.message,
      },
      { status: 500 }
    );
  }
}
