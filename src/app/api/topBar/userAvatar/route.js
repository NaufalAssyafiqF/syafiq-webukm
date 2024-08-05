import { verifyToken } from "@/libs/jwt";
import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
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
    const verifikasiToken = verifyToken(token)
    
    if(verifikasiToken) {
        return NextResponse.json({
            isTokenVerified: true,
            message: "data user berhasil didapat",
            data: verifikasiToken
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
    });
  }
}
