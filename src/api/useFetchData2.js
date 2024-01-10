import { useState, useEffect } from "react";

export function useFetchData2(url, parameter, callBack) {
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        callBack(data);
      } catch (error) {
        // callBack(error);
      }
    }

    fetchData();
  }, [url, parameter]);
}
