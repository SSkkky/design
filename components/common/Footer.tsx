"use client";

import { useRouter } from 'next/navigation';
import gsap from 'gsap';   

export default function Footer() { 
  return (
    <footer className='bg-gray-200 p-2 text-center' role="contentinfo">
      <p className='text-sm'>Copyright 2025. Son Haneul All rights reserved.</p>
    </footer>
  );
}