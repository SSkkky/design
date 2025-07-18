"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import projects from "@/app/assets/data.json";

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project }: { project: (typeof projects)[0] }) {
  const { id, desc } = project;

  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        layoutId={`project-${project.id}`}
        className="cursor-pointer overflow-hidden border border-gray-200 hover:border-white"
      >
        <img
          src={`/assets/projects/${id}/thumb.png`}
          alt={desc}
          className="w-full break-inside-avoid grayscale hover:grayscale-0 hover:scale-110 transition duration-300"
        />
      </motion.div>
    </Link>
  );
}

export default function SectionProjects({ ref }: any) {
  const [selectedYear, setSelectedYear] = useState(-1); // ALL 지정
  const sectionRef = useRef(null);
  const sortedYears = [...new Set(projects.map((item) => item.year))].sort(
    (a, b) => b - a
  ); // 최신순 정렬
  // console.log("Sorted Years:", sortedYears);
  const yearGroups = [-1, ...sortedYears];
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  useEffect(() => {
    if (!sectionRef.current) return;
  }, []);

  // 이미 선택된 년도 클릭시 초기화
  const clickButtonHandler = (year: number) => () => {
    setSelectedYear(year === selectedYear ? -1 : year);
  };

  const filteredProjects =
    selectedYear === -1
      ? projects // -1이면 전체 (ALL)
      : projects.filter((project) => project.year === selectedYear);

  // console.log("Filtered Projects:", filteredProjects);

  return (
    <section
      className="px-6 py-16 bg-white text-black w-screen"
      ref={ref}
    >
      {/* 프로젝트를 년도로 필터링하는 메뉴 */}
      <ul className="flex gap-[4vw] m-[4vw] justify-center">
        {yearGroups.map((year, index) => (
          <li key={index}>
            <button
              role="tab"
              aria-selected="true"
              onClick={clickButtonHandler(year)}
              className={`relative font-bold text-gray-400 cursor-pointer hover:text-black transition
              ${selectedYear == year ? "text-black!" : ""}
              before:absolute before:bottom-0 before:left-0 before:h-[1px] before:bg-black 
    before:transition-all before:duration-300 before:ease-in-out
        ${hoveredIndex === index ? "before:w-full" : "before:w-0"}
`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(-1)}
            >
              {year === -1 ? "ALL" : year}
            </button>
          </li>
        ))}
      </ul>
      <div className="columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
        {/* 프로젝트 카드들 */}
        <AnimatePresence mode="wait">
          {" "}
          {/* AnimatePresence exit : 퇴장 애니메이션까지 적용 가능 */}
          {filteredProjects.map((project, index) => (
            <motion.div
              key={`${project.slug}-${selectedYear}`} // 등장 애니메이션 재실행 강제
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.1 }} // 순차적 등장 (딜레이)
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
