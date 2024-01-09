import { useState, useEffect } from "react";

export function useFetchData(url, parameter) {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const data = await response.json();
        setData(data);
      } catch (error) {
        setData(data);
      }
    }

    fetchData();
  }, [url, parameter]);

  return { data };
}
