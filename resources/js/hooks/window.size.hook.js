import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const useWindowSize = () => {
  const { drawerOpen } = useSelector(state => state.app);
  const [tabContentSize, setTabContentSize] = useState({
    width: undefined,
    height: undefined,
  });
  const [indexTableSize, setIndexTableSize] = useState({
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
        width: window.innerWidth - 275,
        height: window.innerHeight - 150,
      });
      setIndexTableSize({
        width: window.innerWidth - 290,
        height: window.innerHeight - 150 - 80,
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


  return { tabContentSize: { ...tabContentSize, width: tabContentSize.width + Number(!drawerOpen) * 165 }, collectionTableSize, indexTableSize };
}