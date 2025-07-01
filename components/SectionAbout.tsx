import localFont from "next/font/local";
import { Alex_Brush } from "next/font/google";

const AlexBrush = Alex_Brush({
  subsets: ["latin"],
  weight: ["400"],
});

const datas = [
  {
    title: "CAREER",
    content: [
      {
        date: "2024.07~12",
        description: "피터패트 (프론트엔드 주니어 개발자)",
      },
      {
        date: "2019~2020",
        description: "제우메디컬 (퍼블리셔)",
      },
    ],
  },
  {
    title: "EDUCATION",
    content: [
      {
        date: "2023.10~2024.04",
        description: "그린 컴퓨터 아카데미 프론트엔드 교육과정",
      },
      {
        date: "2020~2024",
        description: "서울과학기술대학교 문화예술학과 졸업",
      },
    ],
  }
]

export default function SectionAbout({ref}:any) {
  // 공통 스타일 변수
  const articleCommonStyles =
    "h-[50vw] xl:h-[50vh] flex flex-col justify-end p-[2vw]";
  const subTitleStyles = "font-bold text-[20px] mb-[1.5vw]";

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
      ref={ref}
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
      {/*      career, education      */}
      { 
        datas.map((data, index) => (
          <article
            className={`${articleCommonStyles} border-r`}
            key={data.title}
          >
            <h3 className={`${subTitleStyles}`}>{data.title}</h3>
            <ul>
              {data.content.map((item, idx) => (
                <li key={idx}>
                  <b>{item.date}</b>
                  <span className="pl-2">{item.description}</span>
                </li>
              ))}
            </ul>
          </article>
          ))
      }
      <article
        className={`${articleCommonStyles} col-span-2 xl:col-span-2 border-t xl:border-none p-0! opacity-50`}
      >
        <img src="https://cdn.pixabay.com/photo/2017/09/03/10/52/white-cloud-2709896_1280.jpg" alt="Profile" className="w-full h-full object-cover" />
      </article>
    </section>
  );
}
