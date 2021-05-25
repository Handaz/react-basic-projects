import { useState, useEffect } from "react";
import paginate from "./utils";
const url = "https://api.github.com/users/john-smilga/followers?per_page=100";

export const useFetch = (page) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getProducts = async () => {
    const response = await fetch(url);
    const data = await response.json();
    const users = paginate(page, data);
    setData(users);
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, [page]);
  return { loading, data };
};
