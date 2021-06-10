import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStreamings } from "../features/streaming/streamingSlice";

const useFetchStreamings = () => {
  const { streamings } = useSelector((state) => state.streaming);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStreamings());
  }, []);

  return streamings;
};

export default useFetchStreamings;
