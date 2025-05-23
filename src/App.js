/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./translate/i18n";
import StoreContext from "./store";
import StoreUserInfo from "./store-user-info";
import { PaperProvider } from "react-native-paper";
import RootStackScreenMemo from "./navigation/AppNavigation";
//  import { OneSignal, LogLevel } from "react-native-onesignal";
import { socket_sv } from "./utils";
// OneSignal.initialize('');
// OneSignal.Debug.setLogLevel(LogLevel.Verbose);
// const checkHasPer = OneSignal.Notifications.hasPermission();
// if (!checkHasPer) {
//   OneSignal.Notifications.requestPermission(true);
// }

setTimeout(() => {
  socket_sv.setNewConnection();
}, 100);


function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <PaperProvider>
        {/* Lưu những thông tin chung nhất như theme, language,.. */}
        <StoreContext>
          {/* Lưu thông tin phiên làm việc: Cty, chi nhánh, user, giỏ hàng,... */}
          <StoreUserInfo>
            {/* <BackgroundSv /> */}
            <RootStackScreenMemo />
          </StoreUserInfo>
        </StoreContext>
      </PaperProvider>
    </I18nextProvider>
  );
}

export default App;
