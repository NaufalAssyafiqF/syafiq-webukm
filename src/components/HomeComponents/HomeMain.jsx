import React from "react";
import CardIcon from "./CardIcon";
import FooterComponent from "../FooterComponent";
import ProductSection from "./ProductSection";
import CarouselHero from "./CarouselHero";

const HomeMain = () => {
  return (
    <div className="bg-slate-100">
      <CarouselHero />

      <div className="px-10 mt-14 mb-20">
        <h1 className="text-xl font-semibold text-[#3C6EBC] mb-5">
          Jelajahi Web UKM
        </h1>
        <div className="flex">
          <CardIcon icon="/images/jasa-icon.png" textIcon="Jasa"/>
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

      <ProductSection />

      <FooterComponent />
    </div>
  );
};

export default HomeMain;
