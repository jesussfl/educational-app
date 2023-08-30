import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

export const usePagination = () => {
  const search = useLocation().search;
  const params = new URLSearchParams(search);
  const [currentPage, setCurrentPage] = useState(Number(params.get("page")));
  const [rowsPerPage, setRowsPerPage] = useState(Number(params.get("pageSize")));
  const history = useHistory();

  useEffect(() => {
    setCurrentPage(Number(params.get("page")));
    setRowsPerPage(Number(params.get("pageSize")));
  }, [search]);

  return {
    currentPage,
    rowsPerPage,
    history,
  };
};
