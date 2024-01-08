import { useState, useEffect } from "react";

export function useFetchData(url, parameter) {
  const [data, setData] = useState(null);

  let param = url;

  if (parameter) {
    param = parameter;
  }

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
  }, [param]);

  return { data };
}
