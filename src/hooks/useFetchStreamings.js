import { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchStreamings } from "../features/streaming/streamingSlice";

const useFetchStreamings = () => {
  const { streamings } = useSelector((state) => state.streaming);

  useEffect(() => {
    fetchStreamings();
  }, []);

  return streamings;
};

export default useFetchStreamings;
