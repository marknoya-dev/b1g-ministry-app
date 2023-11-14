"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Navbar = (props) => {
  return (
    <div className="flex-row flex justify-center align-middle bg-white border-b border-gray-300 shadow-md shadow-slate-600/20 py-[16px] px-[24px]">
      <div>
        <span className="font-semibold">B1G Ministry</span>
      </div>

      <Tabs defaultValue="account" className="mx-auto">
        <TabsList>
          <TabsTrigger value="account">Embarkation</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default Navbar;
