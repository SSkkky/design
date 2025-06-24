"use client";

import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ArrowUpwardRounded } from "@mui/icons-material";

export default function Footer() {
  const scrollToTop = () => {
    gsap.to(window, {
      scrollTo: { y: 0, autoKill: false },
      duration: 0.5,
      ease: "power2.inOut",
    });
  };

  return (
    <aside
      className="floating w-16 h-16 bg-black rounded-full shadow-lg fixed bottom-4 right-4 z-50 flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors duration-200"
      onClick={scrollToTop}
    >
        <ArrowUpwardRounded className="text-white" style={{ fontSize: "2rem" }} />
      <style jsx>{`
        .floating {
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          transition: transform 0.3s ease;
        }
        .floating:hover {
          transform: translateY(-5px);
        }
      `}</style>
    </aside>
  );
}
