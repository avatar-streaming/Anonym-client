import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchUsers } from "../features/search/searchSlice";

const useSearchUsers = () => {
  const { search } = useLocation();
  const { searchList } = useSelector((state) => state.search);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchUsers(search));
  }, [search, dispatch]);

  return searchList;
};

export default useSearchUsers;
