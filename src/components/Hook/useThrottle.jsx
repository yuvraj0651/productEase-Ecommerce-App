import { useEffect, useRef, useState } from 'react'

const useThrottle = (value, delay) => {

    const [throttleValue, setThrottleValue] = useState(value);
    const lastCalled = useRef(Date.now());

    useEffect(() => {
        const now = Date.now();

        if (now - lastCalled.current >= delay && value !== throttleValue) {
            setThrottleValue(value);
            lastCalled.current = now;
        };
    }, [value, delay]);

    return throttleValue
}

export default useThrottle