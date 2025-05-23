import React, { useState } from "react";

export const StoreUserInfo = React.createContext(null);

export default ({ children }) => {
  const [token, setToken] = useState("");
  // userInfo
  const [userInfo, setUserInfo] = useState({
    block: "",
    email: "",
    last_login_time: "",
    partner_id: 0,
    phone: "",
    token: "",
    user_id: 0,
    user_level: "",
    user_nm: ''
  });

  const store = {
    userInfo,
    setUserInfo,
    token,
    setToken,
  };

  return (
    <StoreUserInfo.Provider value={store}>{children}</StoreUserInfo.Provider>
  );
};
