import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showLoader } from "../store/layoutSlice";

const useLoader = (isLoading) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(showLoader(isLoading));
  }, [isLoading]);
};

export default useLoader;
