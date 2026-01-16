import { useEffect, useState } from 'react'

const useWindowResize = () => {

    const [resizeValue, setResizeValue] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    });

    useEffect(() => {
        const handleResize = () => {
            setResizeValue({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return resizeValue;
}

export default useWindowResize