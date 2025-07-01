"use client";

import LogoComponent from "./Logo";

export default function Header({ props }: any) {
  const { sectionIds, activeSection, scrollToSection } = props;

  return (
    <header className="fixed flex items-center top-0 left-0 w-full text-black z-50 font-bold backdrop-blur-sm">
      <LogoComponent />
      <ul className="p-4 flex gap-4 text-xl">
        {sectionIds.map((item: string, index: number) => (
          <li
            key={index}
            className={`text-gray-400 transition-all duration-500 ease-in-out ${
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
      <div className="flex-1 text-right text-black">
        <a href="mailto:sonhaneul96@gmail.com" className="p-4 text-xl">
          sonhaneul96@gmail.com
        </a>
      </div>
    </header>
  );
}
