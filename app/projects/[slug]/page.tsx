"use client";

import { useRouter, useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import dataJSON from "@/app/assets/data.json";
import { deviceUtils } from "@/app/utils/deviceUtils";
import { viewportUtils } from "@/app/utils/viewportUtils";
import ArrowOutward from "@mui/icons-material/ArrowOutward";

export default function ProjectDetailPage() {
  const { scrollYProgress } = useScroll();

  const background = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "linear-gradient(to right, #fff, #000)", // 끝 색
      "linear-gradient(to right, #000, #fff)", // 끝 색
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
  const services = ["date", "member", "website"];
  const details = ["challenge", "goal", "result"];
  const [onMouse, setOnMouse] = useState(false);
  const maxGallaryLength = 6;
  const gallaryLengthArray = Array.from(
    { length: maxGallaryLength },
    (_, i) => i + 1
  );

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

  const capitalizedText = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  return (
    <motion.div
      //  layoutId={`project-${data.id}`}
      initial={{ opacity: 0, scale: 0.98, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98, y: -10 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="page-wrapper min-h-screen max-w-[1920px] mx-auto"
    >
      {/*         1. 메인          */}
      <section className="px-12 py-24 mt-[64px]">
        <h2
          className="text-8xl font-bold mb-8
          max-lg:text-6xl
          max-md:hidden"
        >
          {data.title}
        </h2>
        <section
          className="texts flex gap-10
        max-md:p-4
        max-md:flex-col "
        >
          <p className="font-bold text-2xl flex-2 mt-3">{data.desc}</p>
          <article
            className="flex flex-1 gap-10 font-bold cursor-default justify-end
          max-md:gap-4"
          >
            <ul>
              {services.map((item, key) => (
                <li key={key} className="flex border-t-1 py-3 first:border-t-0">
                  <h4 className="w-[90px]">{item.toUpperCase()}</h4>
                  <p
                    className={`flex-1 text-right break-words
                    ${
                      item === "website" &&
                      "cursor-pointer transition duration-200 hover:text-blue-500"
                    }`}
                    onClick={
                      item === "website"
                        ? () => window.open(data[item], "_blank")
                        : undefined
                    }
                  >
                    {data[item]}
                  </p>
                </li>
              ))}
              <li className="flex border-t-1 py-3">
                <h3 className="w-[90px]">{String("tags").toUpperCase()}</h3>
                <ul className="flex-1 flex flex-wrap gap-1 font-normal">
                  {data.tags.map((text: string, key: number) => (
                    <li
                      key={key}
                      className="bg-black text-white font-bold rounded-full px-4 py-1 text-xs"
                    >
                      {text.toUpperCase()}
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </article>
        </section>
      </section>
      {/*         2. image overview          */}
      <section className="w-full flex bg-black">
        <img
          src={`/assets/projects/${data.id}/overview.png`}
          alt={data.desc}
          className="object-cover"
        />
      </section>
      {/*         3. details          */}
      <section className="px-8 py-24 flex gap-10">
        <section className="text-4xl font-bold border-r-1 flex-1 flex justify-between pr-10">
          <h3>Details</h3>
          <div className="rotate-90 w-[40px] h-[40px]">
            <ArrowOutward fontSize="inherit" />
          </div>
        </section>
        <section className="flex-2 flex flex-col gap-10 ">
          {details.map((item: any, key: number) => (
            <article
              key={key}
              className="text-xl border-t-1 first:border-t-0 pt-10 first:pt-0"
            >
              <b>{`(${capitalizedText(item)})`}</b>
              <h4 className="text-4xl font-bold py-4">
                {data.details[item].title}
              </h4>
              <p className="leading-8">{data.details[item].content}</p>
            </article>
          ))}
        </section>
      </section>
      {/*         4. Project Gallary          */}
      <section className="px-8 py-24 flex gap-10">
        <section className="text-4xl font-bold border-r-1 flex-1 flex justify-between pr-10">
          <h3>Project Gallary</h3>
          <div className="rotate-90 w-[40px] h-[40px]">
            <ArrowOutward fontSize="inherit" />
          </div>
        </section>
        <section className="flex-2 flex flex-wrap gap-10">
          {data.gallary.map((item: any, index: number) => (
            <article
              key={index}
              className="relative w-[calc(50%-20px)] aspect-square group overflow-hidden"
            >
              <img
                src={`/assets/projects/${data.id}/${item.image}`}
                alt={`Gallery ${index + 1}`}
                className="object-cover w-full h-full"
              />
              <div
                className="absolute bottom-0 left-0 w-full h-[50%] bg-[rgba(0,0,0,0.5)]
               translate-y-[100%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100
               transition-all duration-300 ease-in-out
               flex items-center justify-center text-white text-sm p-4"
              >
                {item.description}
              </div>
            </article>
          ))}
        </section>
      </section>
      {/*         4. Review          */}
      <section className="px-8 py-24 flex gap-10 mb-[64px]">
        <section className="text-4xl font-bold border-r-1 flex-1 flex justify-between pr-10">
          <h3>Review</h3>
          <div className="rotate-90 w-[40px] h-[40px]">
            <ArrowOutward fontSize="inherit" />
          </div>
        </section>
        <section className="flex-2 flex flex-wrap text-xl">
          <h4 className="text-4xl font-bold py-4">{data.review.title}</h4>
          <p className="leading-8">{data.review.content}</p>
        </section>
      </section>
    </motion.div>
  );
}
