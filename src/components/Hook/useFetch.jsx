import { useEffect, useState } from 'react'

const useFetch = (url) => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [refetch, setRefetch] = useState(0);

    const refetchingFunction = () => {
        setRefetch((prev) => prev + 1);
    };

    useEffect(() => {

        const controller = new AbortController();
        const signal = controller.signal;

        const fetchData = async () => {

            if (!url) return;

            try {
                setIsLoading(true);
                setError(null);
                let response = await fetch(url, { signal });
                if (!response.ok) {
                    throw new Error("Something went wrong while fetching the data");
                };
                let result = await response.json();
                setData(result);
            } catch (error) {
                if (error.name !== "AbortError") {
                    setError(error.message || "Something went wrong");
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => controller.abort();
    }, [url , refetch])

    return { data, isLoading, error , refetchingFunction }
}

export default useFetch