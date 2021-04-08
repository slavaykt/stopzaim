import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [tabContentSize, setTabContentSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [collectionTableSize, setCollectionTableSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setTabContentSize({
        width: window.innerWidth - 290,
        height: window.innerHeight - 150,
      });
      setCollectionTableSize({
        width: window.innerWidth - 290,
        height: window.innerHeight - 150 - 200,
      });
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { tabContentSize, collectionTableSize };
}