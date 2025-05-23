import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Appearance } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { color } from "./styles";

import { glb_sv, storeKey } from "./utils";
export const StoreContext = React.createContext(null);
const colorScheme = Appearance.getColorScheme();

export default ({ children }) => {
  const { i18n } = useTranslation();
  const { t } = useTranslation();

  const [language, setLanguage] = useState("vi");
  const [connected, setConnected] = useState(true);
  const [appError, setAppError] = useState("");
  const [theme, setTheme] = useState(colorScheme === "dark" ? "DARK" : "LIGHT");
  const [colors, setColors] = useState(
    colorScheme === "dark" ? { ...color["DARK"] } : { ...color["LIGHT"] }
  );

  const [loadingGlobal, setLoadingGlobal] = useState({
    status: false,
    message: t("processing"),
  });
  //-- cart information --
  const [cart, setCart] = useState(null);
  const [lastTimeOrder, setLastTimeOrder] = useState(null);
  const [orderValues, setOrderValues] = useState(0);
  const [orderTotalItem, setOrderTotalItem] = useState(0);
  const [currentCust, setCurrentCust] = useState({ id: 0, name: "" });
  const [currenTable, setCurrenTable] = useState(0);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const langStore = await AsyncStorage.getItem(storeKey.LANGAGE);
    if (langStore) {
      setLanguage(langStore);
      i18n.changeLanguage(langStore);
      glb_sv.language = langStore;
    } else {
      setLanguage("vi");
      i18n.changeLanguage("vi");
      glb_sv.language = "vi";
    }

    const timeoutConnectStore = await AsyncStorage.getItem(
      storeKey.TIMEOUT_CONNECT
    );
    if (timeoutConnectStore) {
      // setTimeoutConnect(timeoutConnectStore);
      glb_sv.timeoutConnect = timeoutConnectStore;
    }
  };

  const store = {
    language,
    setLanguage,
    connected,
    setConnected,
    appError,
    setAppError,
    loadingGlobal,
    setLoadingGlobal,
    theme,
    setTheme,
    colors,
    setColors,
    cart,
    setCart,
    orderValues,
    setOrderValues,
    orderTotalItem,
    setOrderTotalItem,
    currentCust,
    setCurrentCust,
    currenTable,
    setCurrenTable,
    lastTimeOrder,
    setLastTimeOrder,
  };
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
