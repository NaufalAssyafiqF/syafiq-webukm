import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import prisma from "@/libs/prisma";
import { verifyToken } from "@/libs/jwt";
import { headers } from "next/headers";


export async function GET() {
  const authHeader = headers().get("Authorization");

  if (!authHeader) {
    return NextResponse.json(
      { error: "Unauthorized", isTokenVerified: false },
      { status: 401 }
    );
  }
  const token = authHeader.split(" ")[1];
  try {

    const decodeToken = verifyToken(token);

    if(token) {

      return NextResponse.json({
        isTokenVerified: true,
        message: "data user berhasil didapat",
        data: decodeToken
      })
    } else {

      return NextResponse.json({
        isTokenVerified: false,
        message: "data user gagal didapat"
      })
    }
  } catch (error) {
    return NextResponse.json({
      isTokenVerified: false,
      message: "terhadi kesalahan pada server, coba dilain waktu",
      error: error.message,
    })
  }
}

export async function PUT(request) {
  try {
    // const data = await request.json();
    // const { email, password, token } = data;

    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("newPassword");
    const token = formData.get("token");
    console.log({email: email, password: password, token: token});

    const decodedToken = verifyToken(token);

    if (!decodedToken) {
      return NextResponse.json({
        isUpdated: false,
        message: "Invalid or expired token",
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    await prisma.user.update({
      where: { email: email },
      data: { password_hash: hashedPassword },
    });

    return NextResponse.json({
      isUpdated: true,
      message: "Reset password successfully",
    });
  } catch (error) {
    console.error("Error creating account:", error);
    return NextResponse.json(
      {
        isCreated: false,
        message: "Failed to create account. Please try again later.",
      },
      { status: 500 }
    );
  }
}
