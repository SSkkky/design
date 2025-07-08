"use client";

import { motion } from "framer-motion";
import { useRouter, useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import gsap from "gsap";
import dataJSON from "@/app/assets/data.json";
import { deviceUtils } from "@/app/utils/deviceUtils";
import { viewportUtils } from "@/app/utils/viewportUtils";

export default function ProjectDetailPage() {
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
      max-lg:flex-col
      max-lg:text-sm"
      >
        <div
          className="texts w-1/2 p-12
        max-lg:w-full max-lg:p-8
        max-md:p-4"
        >
          <h2 className="text-8xl font-bold mt-[20vh] mb-4
          max-lg:text-6xl
          max-md:text-4xl">{data.title}</h2>
          <section className="mt-[15vh] flex gap-10 font-bold">
            <h3>Service</h3>
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
          className="w-1/2 h-full p-4 object-cover"
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
