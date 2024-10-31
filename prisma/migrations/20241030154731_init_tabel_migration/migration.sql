-- CreateTable
CREATE TABLE "products" (
    "user_id" TEXT NOT NULL,
    "name_product" TEXT NOT NULL,
    "price_product" DOUBLE PRECISION NOT NULL,
    "description_product" TEXT,
    "condition" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_id" TEXT NOT NULL,
    "category" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "image_urls" (
    "image_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,

    CONSTRAINT "image_urls_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "user" (
    "user_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "user_img" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "alamat" TEXT,
    "deskripsi" TEXT,
    "fb_link" TEXT,
    "ig_link" TEXT,
    "kota" TEXT,
    "phone_number" TEXT,
    "wa_link" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE INDEX "products_user_id_fkey_unique" ON "products"("user_id");

-- CreateIndex
CREATE INDEX "image_urls_product_id_fkey_unique" ON "image_urls"("product_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "user"("email");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_urls" ADD CONSTRAINT "image_urls_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;
