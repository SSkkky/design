'use client';
import { useEffect } from 'react';

import fluidCursor from './useFluidCursor';

const FluidCursor = () => {
  useEffect(() => {
    fluidCursor();
  }, []);

  return (
    <div className='fixed top-0 left-0 z-2 !pointer-events-none grayscale'>
      <canvas id='fluid' className='w-screen h-screen !pointer-events-none'></canvas>
    </div>
  );
};
export default FluidCursor;