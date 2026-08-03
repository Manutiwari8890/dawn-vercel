import { useEffect } from "react";
import { useLoader } from "../context/LoaderContext";

export default function FallbackLoader() {
  const { startLoading, stopLoading } = useLoader();

  useEffect(() => {
    startLoading();

    return () => {
      stopLoading();
    };
  }, []);

  return null;
}
