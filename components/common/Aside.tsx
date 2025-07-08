"use client";

import { useRouter } from "next/navigation";
import { gsap } from "@/app/lib/gsap"
import { ArrowUpwardRounded } from "@mui/icons-material";


export default function Aside({ asideProps }:any) {
  const {scrollToTop, asideVisible} = asideProps;

  return (
    <aside
      className={`
        floating w-9 h-9 bg-black rounded-full shadow-lg 
        fixed bottom-4 right-4 z-50 
        flex items-center justify-center cursor-pointer 
        hover:bg-gray-700 transition-all duration-500 ease-in-out
        md:w-16 md:h-16
        ${asideVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none' 
        }
      `}
      onClick={scrollToTop}
    >
      <ArrowUpwardRounded className="text-white text-xl" />
      <style jsx>{`
        .floating {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .floating:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </aside>
  );
}