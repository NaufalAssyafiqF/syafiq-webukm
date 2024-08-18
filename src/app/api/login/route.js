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

    // mengambil data user berdasarkan email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // validasi user ditemukan atau tidak
    if (!user) {
      return NextResponse.json(
        {
          isLoggedIn: false,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    // validasi password
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

    // membuat token
    const dataToken = {
      id: user.user_id,
      username: user.username,
      image: user.user_img,
    };
    const createToken = generateToken(dataToken);

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
