"use client";
import React, { useState } from "react";
import { FaWhatsapp, FaInstagram, FaFacebook } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
import {
  FacebookShareButton,
  InstapaperShareButton,
  WhatsappShareButton,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ShareProductButton = () => {
  const [isCopied, setIsCopied] = useState(false);

  const shareUrl = window.location.href;

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1500);
  };

  return (
    <div className="flex items-center">
      <h1 className="text-[#71717A] me-2">Sebar Produk Ini</h1>
      <div className="flex justify-center items-center gap-x-2">
        <div className="border border-[#2E5F9E] rounded-full w-8 h-8 flex items-center justify-center group hover:bg-[#2E5F9E] hover:text-white">
          <WhatsappShareButton url={shareUrl}>
            <FaWhatsapp className="text-xl text-[#2E5F9E] group-hover:text-white" />
          </WhatsappShareButton>
        </div>

        <div className="border border-[#2E5F9E] rounded-full w-8 h-8 flex items-center justify-center group hover:bg-[#2E5F9E]">
          <InstapaperShareButton url={shareUrl}>
            <FaInstagram className="text-xl text-[#2E5F9E] group-hover:text-white" />
          </InstapaperShareButton>
        </div>

        <div className="border border-[#2E5F9E] rounded-full w-8 h-8 flex items-center justify-center group hover:bg-[#2E5F9E]">
          <FacebookShareButton url={shareUrl}>
            <FaFacebook className="text-xl text-[#2E5F9E] group-hover:text-white" />
          </FacebookShareButton>
        </div>

        <CopyToClipboard text={shareUrl} onCopy={handleCopy}>
          <div className="relative border border-[#2E5F9E] rounded-full w-8 h-8 flex items-center justify-center group hover:bg-[#2E5F9E] cursor-pointer">
            <AiOutlineLink className="text-xl text-[#2E5F9E] group-hover:text-white" />
            {isCopied && (
              <span className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded-md">
                Copied!
              </span>
            )}
          </div>
        </CopyToClipboard>
      </div>
    </div>
  );
};

export default ShareProductButton;
