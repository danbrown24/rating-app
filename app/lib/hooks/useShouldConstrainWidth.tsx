import { useLayoutEffect, useState } from "react";
import { Platform } from "react-native";

const useShouldConstrainWidth = (maxWidth: number) => {
  if (Platform.OS !== "web") {
    return false;
  }
  const getShouldConstrain = () => window.innerWidth > maxWidth;
  const [shouldConstrain, setShouldConstrain] = useState(getShouldConstrain());

  useLayoutEffect(() => {
    const handleResize = () => setShouldConstrain(getShouldConstrain());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return shouldConstrain;
};

export default useShouldConstrainWidth;
