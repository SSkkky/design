"use client";

import { useRouter, useSelectedLayoutSegments } from "next/navigation";
import { useEffect } from "react";
import { gsap } from "@/app/lib/gsap";


export default function Logo() {
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
      <h1 className="p-3 md:p-4 text-black">
        <span className="cursor-pointer" onClick={clickLogoHandler}>
          Sky Archive
        </span>
      </h1>
    </a>
  );
}
