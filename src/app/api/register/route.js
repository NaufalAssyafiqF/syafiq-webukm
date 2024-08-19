import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/libs/prisma";

export async function POST(request) {
  try {
    // const data = await request.json();
    // const { email, username, password } = data;

    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");

    // mengambil data user berdasarkan email
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    // validasi email sudah terpakai atau belum
    if (existingEmail) {
      return NextResponse.json(
        {
          isCreated: false,
          message: "Email already exists",
        },
        { status: 400 }
      );
    }

    // membuat hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userId = Date.now().toString();

    const userImg = "https://storage.cloud.google.com/goritmix-web-ukm/user-images/defaultavatar1.jpg"

    // membuat data baru user
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
