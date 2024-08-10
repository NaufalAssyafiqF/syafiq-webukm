import { verifyToken } from "@/libs/jwt";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const authHeader = headers().get("Authorization");

  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized", isTokenVerified: false });
  }
  try {
    const token = authHeader.split(" ")[1];
    const isTokenVerified = verifyToken(token);
    

    console.log(isTokenVerified.id);
    

    const getProductDatas = await prisma.Product.findMany({
      where: {
        user_id: isTokenVerified.id,
      },
      include: {
        image_urls: true,
        user: {
          select: {
            username: true,
            user_img: true,
            alamat: true,
          },
        },
      },
    });

    const getUserDatas = await prisma.user.findUnique({
      where: {
        user_id: isTokenVerified.id,
      },
      select: {
        username: true,
        user_img: true,
        alamat: true,
      },
    });

    return NextResponse.json({
      message: "data user berhasil didapat",
      dataUser: getUserDatas,
      data: getProductDatas,
    });
  } catch (error) {
    return NextResponse.json({
      message: "terhadi kesalahan pada server, coba dilain waktu",
      errorMessage: error.message
    })
  }
  
}
