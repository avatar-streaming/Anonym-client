import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchUsers } from "../features/search/searchSlice";

const useSearchUsers = () => {
  const { search } = useLocation();
  const { searchList } = useSelector((state) => state.search);

  useEffect(() => {
    searchUsers(search);
  }, [search]);

  return searchList;
};

export default useSearchUsers;
