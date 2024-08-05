import React from "react";
import CardIcon from "./CardIcon";
import FooterComponent from "../FooterComponent";
import ProductSection from "./ProductSection";

const HomeMain = () => {
  return (
    <div className="bg-slate-100">
      <div className="w-full h-[280px] bg-blue-500 mt-10"></div>

      <div className="px-10 mt-14 mb-20">
        <h1 className="text-xl font-semibold text-[#3C6EBC] mb-5">
          Jelajahi Web UKM
        </h1>
        <div className="flex">
          <CardIcon icon="/images/jasa-icon.png" textIcon="Jasa" />
          <CardIcon
            icon="/images/elektronik-icon.png"
            textIcon="Elektronik & Gadget"
          />
          <CardIcon icon="/images/mobil-icon.png" textIcon="Mobil" />
          <CardIcon icon="/images/motor-icon.png" textIcon="Motor" />
          <CardIcon
            icon="/images/fashionpria-icon.png"
            textIcon="Fashion Pria"
          />
          <CardIcon
            icon="/images/fashionwanita-icon.png"
            textIcon="Fashion Wanita"
          />
          <CardIcon
            icon="/images/olahraga-icon.png"
            textIcon="Hobi & Olahraga"
          />
          <CardIcon icon="/images/properti-icon.png" textIcon="Properti" />
          <CardIcon
            icon="/images/jasa-icon.png"
            textIcon="Perlengkapan Bayi & anak"
          />
          <CardIcon icon="/images/all-icon.png" textIcon="Semua Kategori" />
        </div>
      </div>

      <ProductSection title={"Rekomendasi Jasa"} />
      <ProductSection title={"Rekomendasi Elektronik & Gadget"} />
      <ProductSection title={"Rekomendasi Mobil"} />
      <ProductSection title={"Rekomendasi Motor"} />
      <ProductSection title={"Rekomendasi Fashion Pria"} />
      <ProductSection title={"Rekomendasi Fashion Wanita"} />
      <ProductSection title={"Rekomendasi Olahraga & Hobi"} />
      <ProductSection title={"Rekomendasi Properti"} />
      <ProductSection title={"Rekomendasi Perlengkapan Bayi & Anak"} />

      <FooterComponent />
    </div>
  );
};

export default HomeMain;
