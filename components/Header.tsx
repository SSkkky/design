"use client";

import { useRouter } from 'next/navigation';
import gsap from 'gsap';   

export default function Header() { 
  return (
    <header className="fixed top-0 left-0 w-full bg-white text-black shadow-md z-50">
        <h1 className="text-2xl font-bold p-4">
            <span>Sky Archive</span>
        </h1>
        <ul>
            <li>INTRO</li>
            <li>ABOUT</li>
            <li>PROJECTS</li>
        </ul>
        <a href="mailto:sonhaneul96@gmail.com">sonhaneul96@gmail.com</a>
    </header>
  );
}