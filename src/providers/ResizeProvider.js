import { createContext, useEffect, useState } from "react";

const RESIZE_DATA = {
    height: window.innerHeight,
    width: window.innerWidth
};

export const ResizeContext = createContext(RESIZE_DATA);

export default function ResizeProvider({debounceTime = 100, children}) {
    const [resizeData, setResizeData] = useState(RESIZE_DATA);
    const [timer, setDebounceTimer] = useState(null);
    useEffect(() => {
        function onResize(e) {
            const { innerHeight, innerWidth } = window;
            clearTimeout(timer);
            setDebounceTimer(setTimeout(() => {
                setResizeData({width: innerWidth, height: innerHeight });
            }, debounceTime));
        }

        window.addEventListener('resize', onResize);
        return () => {
            window.removeEventListener('resize', onResize);
        }
    }, [debounceTime, timer, setDebounceTimer]);

    return (
        <ResizeContext.Provider value={resizeData}>
            {children}
        </ResizeContext.Provider>
    );
    
};