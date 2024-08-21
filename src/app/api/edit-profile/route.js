import { generateToken, verifyToken } from "@/libs/jwt";
import prisma from "@/libs/prisma";
import { Storage } from "@google-cloud/storage";
import { log } from "console";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
const path = require("path");

export async function GET(request) {
  const authHeader = headers().get("Authorization");

  //validation ketika tidak ada header auth
  if (!authHeader) {
    return NextResponse.json({ error: "Unauthorized", isTokenVerified: false });
  }

  try {
    //mengambil token & verifikasi token
    const token = authHeader.split(" ")[1];
    const isTokenVerified = verifyToken(token);

    // mengambil data user dari database
    const getUserDatas = await prisma.user.findUnique({
      where: {
        user_id: isTokenVerified.id,
      },
      select: {
        username: true,
        user_img: true,
        alamat: true,
        kota: true,
        deskripsi: true,
        fb_link: true,
        ig_link: true,
        phone_number: true,
        wa_link: true,
      },
    });

    return NextResponse.json({ data: getUserDatas, isTokenVerified: true });
  } catch (error) {
    return NextResponse.json({
      error: error.message,
      isTokenVerified: false,
    });
  }
}

export async function PUT(request) {
  const authHeader = headers().get("Authorization");
  const token = authHeader.split(" ")[1];

  //mengambil data dari body formData
  const formData = await request.formData();
  const username = formData.get("username");
  const deskripsi = formData.get("deskripsi");
  const kondisi = formData.get("alamat");
  const harga = formData.get("kota");
  const kategori = formData.get("phoneNumber");

  const instagram = formData.get("ig_link");
  const facebook = formData.get("fb_link");
  const whatsapp = formData.get("wa_link");

  const image = formData.get("image");
  

  try {
    // verifikasi token dan validasi token
    const verifikasiToken = verifyToken(token);
    if (!verifikasiToken) {
      return NextResponse.json({
        message: "token tidak valid",
        isUpdated: false,
      });
    }

    const userId = verifikasiToken.id;

    let imageUrl = image;

    // validasi ketika gambar user diperbarui
    if (image !== verifikasiToken.image) {
        
      //set up cloud storage dengan key json file
      // const storage = new Storage({
      //   projectId: "web-ukm-427815",
      //   keyFilename: path.join(
      //     process.cwd(),
      //     "public/gcp-key/key-cloudstorage.json"
      //   ),
      // });

      const storage = new Storage({
        projectId: process.env.GCP_PROJECT_ID,
        credentials: {
          client_email: process.env.GCP_CLIENT_EMAIL,
          private_key: process.env.GCP_PRIVATE_KEY.replace(/\\n/g, "\n"),
        },
      });

      //menghubungkan ke folder cloud storage
      const bucketName = "goritmix-web-ukm";
      const folderName = "user-images";
      // const imageUrls = [];
      const dateName = Date.now().toString();

      const originalFileName = image.name;
      const sanitizedFileName = originalFileName.replace(/\s+/g, "_"); //handle jika nama terdapat spasi

      const bucket = storage.bucket(bucketName);

      const defaultUserImage =
        "https://storage.cloud.google.com/goritmix-web-ukm/user-images/defaultavatar1.jpg";
      
      // menghapus gambar lama dari gcp
      if (verifikasiToken.image !== defaultUserImage) {
        const oldImageUrl = verifikasiToken.image;
        const oldFileName = oldImageUrl.split("/").pop();
        
        const oldFile = bucket.file(`${folderName}/${oldFileName}`);
        

        try {
          await oldFile.delete();
        } catch (err) {
          console.error(`Gagal menghapus gambar lama: ${err.message}`);
        }
      }
      
      // upload gambar ke cloud storage
      const filename = `${folderName}/usr${dateName}-${sanitizedFileName}`;
      const fileUpload = bucket.file(filename);
      const buffer = Buffer.from(await image.arrayBuffer());
      const mimeType = image.type;

      await fileUpload.save(buffer, {
        contentType: mimeType,
        metadata: {
          cacheControl: "public, max-age=31536000",
        },
      });

      imageUrl = `https://storage.cloud.google.com/goritmix-web-ukm/user-images/usr${dateName}-${sanitizedFileName}`;
    }

    // update data user di database
    await prisma.user.update({
      where: { user_id: userId },
      data: {
        username: username,
        user_img: imageUrl,
        deskripsi: deskripsi,
        alamat: kondisi,
        kota: harga,
        phone_number: kategori,
        fb_link: facebook,
        ig_link: instagram,
        wa_link: whatsapp,
      },
    });

    const dataToken = {
      id: userId,
      username: username,
      image: imageUrl,
    };
    const createToken = generateToken(dataToken);

    return NextResponse.json({
      message: "Profile berhasil diupdate",
      isUpdated: true,
      token: createToken,
    });
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return NextResponse.json({
      message: "profile gagal diupdate",
      errorMessage: error.message,
      isUpdated: false,
    });
  }
}
