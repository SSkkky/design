import { useEffect } from 'react';
import fluidCursor from 'hooks/useFluidCursor';
const FluidCursor = () => {
    useEffect(() => {
        fluidCursor();
    }, []);
    return (
        <div className="fluid-cursor">
            <canvas id="fluid" className="w-screen h-screen" />
        </div>
    );
};
export default FluidCursor;