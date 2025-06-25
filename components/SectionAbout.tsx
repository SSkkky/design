import localFont from "next/font/local";
import { Alex_Brush } from "next/font/google";

const AlexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
});

export default function SectionAbout() {
  // 공통 스타일 변수
  const articleCommonStyles =
    "h-[50vw] xl:h-[50vh] flex flex-col justify-end p-[2vw]";
  const subTitleStyles = "font-bold text-[20px] mb-[2vw]";

  const SkillListComponents = () => {
    const skillList = [
      "HTML",
      "CSS",
      "JS",
      "TS",
      "REACT",
      "NEXT.JS",
      "STYLED COMPONENTS",
      "TAILWIND",
      "GIT",
    ];
    const lists = skillList.map((skill, index) => (
      <li className="border border-black font-bold rounded-full px-3 py-1 flex hover:bg-gray-700 hover:text-white  transition-colors duration-200 cursor-default hover:border-white" key={index}>
        {skill}
      </li>
    ));

    return <ul className="flex flex-wrap gap-2">{lists}</ul>;
  };

  return (
    <section
      className="
        grid w-screen
        grid-cols-2       /* 기본: 2열 (md 포함) */
        grid-rows-auto
        xl:grid-cols-4    /* xl 이상에서 4열로 */
      "
    >
      <article
        className={`${articleCommonStyles} justify-center! col-span-2 xl:col-span-2 border-r border-b`}
      >
        <h2 className="font-bold text-[10vw] xl:text-[5vw] uppercase tracking-tighter">
          Hello,{" "}
          <span className={`${AlexBrush.className} text-[14vw] xl:text-[7vw]`}>
            w
          </span>
          orld
        </h2>
        <p>
          안녕하세요! <br />
          즐겁게 개발하는 개발자 손하늘입니다.
        </p>
      </article>
      <article className={`${articleCommonStyles} col-span-2 xl:col-span-2 border-r border-b`}>
        <h3 className={`${subTitleStyles}`}>SKILLS</h3>
        <SkillListComponents />
      </article>
      <article className={`${articleCommonStyles} border-r`}>5</article>
      <article className={`${articleCommonStyles} border-r`}>6</article>
      <article
        className={`${articleCommonStyles} col-span-2 xl:col-span-2 border-t xl:border-none`}
      >
        7-8
      </article>
    </section>
  );
}
