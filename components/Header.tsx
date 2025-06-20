"use client";

import { useRouter } from 'next/navigation';
import gsap from 'gsap';   
import { useEffect } from 'react';

export default function Header({isIntro}) { 
  const router = useRouter();

  const clickLogoHandler = () => {
    router.push('/');  
  }

  return (
    <header className="fixed flex items-center top-0 left-0 w-full text-black z-50 font-bold">
      <a className='flex-1'>
        <h1 className={`${isIntro ? "text-white" : "text-black"} text-3xl p-4 transition`} >
            <span className='cursor-pointer' onClick={clickLogoHandler}>Sky Archive</span>
        </h1>
      </a>
        <ul className='p-4 flex gap-4 text-xl'>
            <li className='text-gray-400'>INTRO</li>
            <li className='text-gray-400'>ABOUT</li>
            <li className='text-gray-400'>PROJECTS</li>
        </ul>
        <div className={`${isIntro ? "text-white" : "text-black"} flex-1 text-right transition`}>
          <a href="mailto:sonhaneul96@gmail.com" className='p-4 text-xl'>sonhaneul96@gmail.com</a>
        </div>
    </header>
  );
}