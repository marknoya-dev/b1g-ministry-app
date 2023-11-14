"use client";
import Image from "next/image";
import React from "react";
const Navbar = (props) => {
  return (
    <div className="flex-row flex bg-white border-b border-gray-300 shadow-md shadow-slate-600/20 py-[16px] px-[24px]">
      <div className="flex flex-row gap-[12px] align-middle justify-center items-center">
        <Image src="/logo.png" width={40} height={40} alt="B1G logo" />
        <span className="font-bold">B1G Retreat App</span>
      </div>
    </div>
  );
};

export default Navbar;
