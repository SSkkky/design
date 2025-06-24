"use client";

import LogoComponent from "./Logo";

interface HeaderProps {
  isIntro: boolean;
}

export default function Header({ isIntro }: HeaderProps) {
  return (
    <header className="fixed flex items-center top-0 left-0 w-full text-black z-50 font-bold bg-white ">
      <LogoComponent isIntro={isIntro} />
      <ul className="p-4 flex gap-4 text-xl">
        <li className="text-gray-400">INTRO</li>
        <li className="text-gray-400">ABOUT</li>
        <li className="text-gray-400">PROJECTS</li>
      </ul>
      <div className="flex-1 text-right text-black">
        <a href="mailto:sonhaneul96@gmail.com" className="p-4 text-xl">
          sonhaneul96@gmail.com
        </a>
      </div>
    </header>
  );
}
