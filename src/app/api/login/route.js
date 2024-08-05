"use server";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/libs/prisma";
import { generateToken } from "@/libs/jwt";
import { cookies } from "next/headers";

export async function POST(request) {
  try {
    const data = await request.json();
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          isLoggedIn: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return NextResponse.json(
        {
          isLoggedIn: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }
    const dataToken = {
      id: user.user_id,
      username: user.username,
      image: user.user_img,
    };
    const createToken = generateToken(dataToken);
    

    // // Set HttpOnly cookie
    // const response = NextResponse.json({
    //   isLoggedIn: true,
    //   message: "Login successful",
    // });

    // // const oneHour = 24 * 60 * 60 * 1000;
    // cookies().set({
    //   name: "token",
    //   value: createToken,
    //   httpOnly: true,
    //   path: "/",
    //   // expires: Date.now() - oneHour,
    // });

    return NextResponse.json(
      {
        message: "Login successful",
        isLoggedIn: true,
        token: createToken,
      }
    );
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      {
        isLoggedIn: false,
        message: "An error occurred during login",
        errorMeassage: error.message,
      },
      { status: 500 }
    );
  }
}
