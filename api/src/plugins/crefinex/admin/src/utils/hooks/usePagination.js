import { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";

export const usePagination = () => {
  const search = useLocation().search;
  const params = new URLSearchParams(search);
  const [currentPage, setCurrentPage] = useState(params.get("page"));
  const [rowsPerPage, setRowsPerPage] = useState(params.get("pageSize"));
  const history = useHistory();

  useEffect(() => {
    setCurrentPage(params.get("page"));
    setRowsPerPage(params.get("pageSize"));
  }, [search]);

  return {
    currentPage,
    rowsPerPage,
    history,
  };
};
