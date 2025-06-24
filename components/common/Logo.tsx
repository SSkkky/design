"use client";

import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { useEffect } from "react";
import { gsap } from "@/app/lib/gsap";

interface LogoProps {
  isIntro: boolean;
}

export default function Logo({ isIntro }: LogoProps) {
  const router = useRouter();
  const segments = useSelectedLayoutSegments();

  const refreshRouter = () => {
    location.reload();
    // router.refresh(); = 페이지를 새로고침하지 않고 데이터를 다시 가져옴
  };

  const clickLogoHandler = () => {
    refreshRouter();
  };

  return (
    <a className="flex-1">
      <h1 className="text-3xl p-4 text-black">
        <span className="cursor-pointer" onClick={clickLogoHandler}>
          Sky Archive
        </span>
      </h1>
    </a>
  );
}
