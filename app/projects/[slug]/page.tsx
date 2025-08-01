"use client";

import { useRouter, useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import dataJSON from "@/app/assets/data.json";
import { deviceUtils } from "@/app/utils/deviceUtils";
import { viewportUtils } from "@/app/utils/viewportUtils";
import ArrowOutward from "@mui/icons-material/ArrowOutward";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Close from "@mui/icons-material/Close";
import ZoomableImage from "@/components/ZoomableImage";

export default function ProjectDetailPage() {
  const { scrollYProgress } = useScroll();

  const background = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "linear-gradient(to right, #fff, #000)", // 끝 색
      "linear-gradient(to right, #000, #000)", // 끝 색
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

const Content = () => {
  const router = useRouter();
  const { slug } = useParams(); // title
  const services = ["date", "member", "website"];
  const details = ["problem", "goal"];
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // S : 모달 오픈시 스크롤 잠금 효과
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";

    return () => {
      document.body.style.overflow = "auto"; // 안전하게 해제
    };
  }, [isOpen]);
  // E : 모달 오픈시 스크롤 잠금 효과

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

  // S : 갤러리 모달 관련
  const openModal = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? data.gallary.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setCurrentIndex((prev) =>
      prev === data.gallary.length - 1 ? 0 : prev + 1
    );
  };
  // E : 갤러리 모달 관련

  // S : 데이터 상세 내용 컴포넌트
  // 데이터가 문자열인 경우와 배열인 경우를 처리
  const DataDetailContents = ({
    item,
    content,
  }: {
    item: string;
    content: string[];
  }) => {
    if (item === "problem") {
      return <p className="leading-8 max-[430px]:text-base">{content}</p>;
    }

    if (item === "goal") {
      return (
        <ol className="list-decimal leading-8 max-[430px]:text-base pl-6">
          {content.map((text, key) => (
            <li key={key}>{text}</li>
          ))}
        </ol>
      );
    }

    return null; // fallback
  };
  // E : 데이터 상세 내용 컴포넌트

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
      <section className="px-12 py-24 mt-[64px] max-md:px-4 max-md:py-12">
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
          <p className="font-bold text-2xl flex-2 mt-3">
            {data.desc.split("/n").map((it:string, idx:number) => (
              <span key={idx}>
                {it}
                <br />
              </span>
            ))}
          </p>
          <article
            className="flex flex-1 gap-10 font-bold cursor-default justify-end
          max-md:gap-4"
          >
            <ul>
              {services.map((item, key) => (
                <li
                  key={key}
                  className="flex border-t-1 py-3 first:border-t-0 flex-wrap"
                >
                  <h4 className="w-[90px]">{item.toUpperCase()}</h4>
                  <p
                    className={`flex-1 text-right break-words
                    ${
                      item === "website" &&
                      data["website"] !== "none" &&
                      "cursor-pointer transition duration-200 hover:text-blue-500"
                    }`}
                    onClick={
                      item === "website" && data["website"] !== "none"
                        ? () => window.open(data["website"], "_blank")
                        : undefined
                    }
                  >
                    {data[item] === "none" ? "없음" : data[item]}
                  </p>
                </li>
              ))}
              <li className="flex border-t-1 py-3">
                <h3 className="w-[90px]">{String("tags").toUpperCase()}</h3>
                <ul className="flex-1 flex flex-wrap gap-1 font-normal justify-end">
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
      <section className="w-full flex bg-gray-200 h-[40vh]">
        <img
          src={`/assets/projects/${data.id}/overview.png`}
          alt={data.desc}
          className="object-cover w-full object-top"
        />
      </section>
      {/*         3. scope          */}
      <section
        className="px-8 py-24 flex gap-10
      max-md:flex-col max-md:px-4 max-md:py-12"
      >
        <section
          className="text-4xl font-bold border-r-1 flex-1 flex justify-between pr-10
        max-md:border-r-0 max-md:pr-0"
        >
          <h3 className="max-[430px]:text-3xl">Scope of Work</h3>
          <div className="rotate-90 w-[40px] h-[40px]">
            <ArrowOutward fontSize="inherit" />
          </div>
        </section>
        <section className="flex-2 flex flex-col gap-10 ">
          <article className="text-xl border-t-1 first:border-t-0 pt-10 first:pt-0">
            <h4 className="text-4xl font-bold py-4 max-[430px]:text-3xl">
              이런 업무를 담당했습니다
            </h4>
            <ol className="list-disc leading-8 max-[430px]:text-base pl-6">
              {data.scope.map((text:string, key:number) => (
                <li key={key}>{text}</li>
              ))}
            </ol>
          </article>
        </section>
      </section>
      {/*         4. details          */}
      <section
        className="px-8 py-24 flex gap-10
      max-md:flex-col max-md:px-4 max-md:py-12"
      >
        <section
          className="text-4xl font-bold border-r-1 flex-1 flex justify-between pr-10
        max-md:border-r-0 max-md:pr-0"
        >
          <h3 className="max-[430px]:text-3xl">Details</h3>
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
              <h4 className="text-4xl font-bold py-4 max-[430px]:text-3xl">
                {data.details[item].title}
              </h4>
              <DataDetailContents
                item={item}
                content={data.details[item].content}
              />
            </article>
          ))}
        </section>
      </section>
      {/*         5. Project Gallary          */}
      <section
        className="px-8 py-24 flex gap-10
      max-md:flex-col max-md:px-4 max-md:py-12"
      >
        <section
          className="text-4xl font-bold border-r-1 flex-1 flex justify-between pr-10
        max-md:border-r-0 max-md:pr-0 max-md:flex-0"
        >
          <h3 className="max-[430px]:text-3xl">Project Gallary</h3>
          <div className="rotate-90 w-[40px] h-[40px]">
            <ArrowOutward fontSize="inherit" />
          </div>
        </section>
        <section
          className="flex-2 flex flex-wrap gap-10
        max-md:flex-0 max-md:gap-4"
        >
          {data.gallary.map((item: any, index: number) => (
            <article
              key={index}
              className="relative w-[calc(50%-20px)] aspect-square group overflow-hidden cursor-pointer border-1 border-black max-md:w-[calc(50%-8px)]"
              onClick={() => openModal(index)}
            >
              <img
                src={`/assets/projects/${data.id}/${item.image}`}
                alt={`${index + 1}번째 이미지`}
                className="object-cover object-top object-center w-full h-full transition-transform duration-300 ease-in-out group-hover:scale-105"
              />
              <div
                className="absolute bottom-0 left-0 w-full h-[50%] bg-[rgba(0,0,0,0.5)]
               translate-y-[100%] opacity-0 group-hover:translate-y-0 group-hover:opacity-100
               transition-all duration-300 ease-in-out
               flex items-center justify-center text-xl text-white p-4"
              >
                {item.description}
              </div>
            </article>
          ))}
        </section>
      </section>
      {/*         6. gallary modal          */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10000 bg-[rgba(0,0,0,0.5)] flex flex-col items-center justify-center backdrop-blur-sm"
          onClick={closeModal}
        >
          <h4 className="text-white font-bold text-xl text-center">
            {data.gallary[currentIndex].description}
          </h4>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            className="absolute top-5 right-5 text-white text-4xl p-4 z-10 border-1 border-[rgba(0,0,0,0)] hover:border-white transition duration-200 cursor-pointer rounded-full w-[50px] h-[50px] flex items-center justify-center"
          >
            <Close />
          </button>
          {/* 확대 이미지 */}
          <ZoomableImage
            src={`/assets/projects/${data.id}/${data.gallary[currentIndex].image}`}
          />

          {/* 페이지 인덱스, 좌우 이동 버튼 */}
          <div
            className="absolute bottom-[5vw] flex justify-center items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={prevImage}
              className="text-white text-4xl p-4 z-10 border-1 border-[rgba(0,0,0,0)] hover:border-white transition duration-200 cursor-pointer rounded-full w-[50px] h-[50px] flex items-center justify-center"
            >
              <ArrowBack />
            </button>
            <p className="text-white font-bold">
              {currentIndex + 1} / {data.gallary.length}
            </p>
            <button
              onClick={nextImage}
              className="text-white text-4xl p-4 z-10 border-1 border-[rgba(0,0,0,0)] hover:border-white transition duration-200 cursor-pointer rounded-full w-[50px] h-[50px] flex items-center justify-center"
            >
              <ArrowForward />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};
