"use client";

import { useRouter } from "next/navigation";
import { gsap } from "@/app/lib/gsap"
import { ArrowUpwardRounded } from "@mui/icons-material";


export default function Aside({ activeSection }:any) {
  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0, autoKill: false },
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  return (
    <aside
      className={`
        floating w-16 h-16 bg-black rounded-full shadow-lg 
        fixed bottom-4 right-4 z-50 
        flex items-center justify-center cursor-pointer 
        hover:bg-gray-700 transition-all duration-500 ease-in-out
        ${activeSection === "INTRO" 
          ? 'opacity-0 translate-y-4 pointer-events-none' 
          : 'opacity-100 translate-y-0 pointer-events-auto'
        }
      `}
      onClick={scrollToTop}
    >
      <ArrowUpwardRounded className="text-white" style={{ fontSize: "2rem" }} />
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