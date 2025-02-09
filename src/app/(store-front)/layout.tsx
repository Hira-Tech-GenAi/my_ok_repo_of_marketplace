import { ReactNode } from "react";
import { Footer } from "@/components/store-front/Footer";
import Navbar from "@/components/store-front/Navbar";

export default function StoreFrontLayout({
   children ,
  }: { children: ReactNode;
    
   }){
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</main>
      <Footer />
    </>
  );
};


