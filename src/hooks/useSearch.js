import { useEffect, useState } from "react";
import { useHistory } from "react-router";

const useSearch = (inputValue) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  useEffect(() => {
    const trimed = inputValue.trim();

    setIsSubmit(false);

    if (isSubmit && trimed.length) {
      history.push(`/search?term=${trimed}`);
    }
  }, [inputValue, isSubmit, history]);

  return handleSubmit;
};

export default useSearch;
