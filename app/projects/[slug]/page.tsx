"use client";

import { useRouter, useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import dataJSON from "@/app/assets/data.json";
import { deviceUtils } from "@/app/utils/deviceUtils";
import { viewportUtils } from "@/app/utils/viewportUtils";

export default function ProjectDetailPage() {
  const { scrollYProgress } = useScroll();

  const background = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "linear-gradient(to right, #f2709c, #ff9472)", // 시작 색
      "linear-gradient(to right, #00c6ff, #0072ff)", // 끝 색
    ]
  );

  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX: scrollYProgress,
          position: "fixed",
          zIndex: 10000,
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          originX: 0,
          background,
        }}
      />
      <Content />
    </>
  );
}

export function Content() {
  const router = useRouter();
  const { slug } = useParams(); // title
  const services = ["title", "date", "member", "year", "desc"];
  const [onMouse, setOnMouse] = useState(false);

  const data: any = dataJSON.find((el) => el.slug === slug);

  // 데이터가 없을때 notFound로 이동
  if (!data) {
    return notFound();
  }

  const handleBack = () => {
    // 이전 방문 페이지가 main이면 뒤로가기
    // slug페이지
    const from = document.referrer;
    router.back();
  };

  return (
    <motion.div
      //  layoutId={`project-${data.id}`}
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="page-wrapper min-h-screen"
    >
      {/*         1. 메인          */}
      <section
        className="w-screen h-screen flex flex-row
      max-md:flex-col-reverse
      max-md:justify-end
      max-md:text-sm"
      >
        <div
          className="texts w-1/2 p-12
        max-md:p-4 max-md:w-full"
        >
          <h2
            className="text-8xl font-bold mt-[20vh] mb-4
          max-lg:text-6xl
          max-md:hidden"
          >
            {data.title}
          </h2>
          <section
            className="mt-[15vh] flex gap-10 font-bold
          max-md:flex-col
          max-md:gap-4
          max-md:mt-[0px]"
          >
            <h3 className="">Service</h3>
            <ul>
              {services.map((item, key) => (
                <li key={key} className="flex border-t-1 p-1">
                  <h4 className="w-[90px]">{item}</h4>
                  <p className="flex-1 font-normal break-words">{data[item]}</p>
                </li>
              ))}
              <li className="flex border-t-1 p-1">
                <h3 className="w-[90px]">tags</h3>
                <ul className="flex-1 flex flex-wrap gap-1 font-normal">
                  {data.tags.map((text: string, key: number) => (
                    <li
                      key={key}
                      className="bg-gray-200 rounded-full px-3 text-sm"
                    >{`#${text}`}</li>
                  ))}
                </ul>
              </li>
            </ul>
          </section>
        </div>
        <img
          src={`/assets/projects/${data.id}/thumb.png`}
          alt={data.desc}
          className="w-1/2 h-[calc(100%-128px)] mt-[64px] object-cover object-top rounded-tl-2xl rounded-bl-2xl
          max-md:w-full max-md:h-[calc(50%-64px)] max-md:rounded-tl-none max-md:rounded-bl-none"
        />
      </section>
      {/*         2. overview          */}
      <section className="w-screen h-screen flex bg-black">
        <img
          src={`/assets/projects/${data.id}/thumb.png`}
          alt={data.desc}
          className="w-full h-full object-cover"
        />
      </section>
      {/*         3. features          */}
      <section className="w-screen h-screen flex bg-black">
        <img
          src={`/assets/projects/${data.id}/thumb.png`}
          alt={data.desc}
          className="w-full h-full object-cover"
        />
      </section>
    </motion.div>
  );
}
