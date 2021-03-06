import { useState, useEffect } from "react";
import axios from "axios";

// axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";
axios.defaults.baseURL = "/";

const useAxios = ({ url, method, body = null, headers = null }) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);
  const [controller] = useState(new AbortController());

  useEffect(() => {
    const fetchData = () => {
      axios[method](
        url,
        {
          signal: controller.signal,
        },
        JSON.parse(headers),
        JSON.parse(body)
      )
        .then((res) => {
          setResponse(res.data);
        })
        .catch((err) => {
          setError(err);
        })
        .finally(() => {
          setloading(false);
        });
    };

    fetchData();
  }, [method, url, body, headers, controller.signal]);

  return { response, error, loading, controller };
};

export default useAxios;
