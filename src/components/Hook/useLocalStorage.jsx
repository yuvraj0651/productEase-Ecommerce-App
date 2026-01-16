import { useEffect, useState } from 'react'

const useLocalStorage = (key, initialState = null) => {

    const [value, setValue] = useState(() => {

        if (typeof window === "undefined") return initialState;

        const storedData = localStorage.getItem(key);
        try {
            return storedData ? JSON.parse(storedData) : initialState;
        } catch (error) {
            console.error("Invalid localStorage JSON", error);
            return initialState;
        }
    });

    useEffect(() => {
        if (typeof window === "undefined") return;
        localStorage.setItem(key, JSON.stringify(value));
    }, [value, key]);

    return { value, setValue }
}

export default useLocalStorage