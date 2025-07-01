"use client";

import LogoComponent from "./Logo";

export default function Header({ props }: any) {
  const { sectionIds, activeSection, scrollToSection } = props;

  return (
    <header className="fixed flex items-center top-0 left-0 w-full text-black z-1000 font-bold backdrop-blur-sm text-xl md:text-2xl transform-gpu
">
      <LogoComponent />
      <ul className="p-4 flex gap-4">
        {sectionIds.map((item: string, index: number) => (
          <li
            key={index}
            className={`text-gray-400 transition-all duration-500 ease-in-out text-sm sm:text-base  md:text-xl ${
              item === activeSection ? "text-black!" : ""
            }`}
          >
            <button
              className="cursor-pointer"
              onClick={() => scrollToSection(item)}
            >
              {item}
            </button>
          </li>
        ))}
      </ul>
      <div className="flex-1 text-right text-black max-md:hidden">
        <a href="mailto:sonhaneul96@gmail.com" className="p-4">
          sonhaneul96@gmail.com
        </a>
      </div>
    </header>
  );
}
