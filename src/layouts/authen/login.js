import React, { useEffect, useState, useRef, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  Image,
  Platform,
} from "react-native";

import { screens, glb_sv, serviceList } from "../../utils";

import { color, dimensions, fontSizes, fontWeights } from "../../styles";
import { InputField, ButtonComp, CheckboxComp, TextComp } from "../../basic-components";
import { CopyRight } from "../../components";
import { StoreUserInfo } from "../../store-user-info";
import { IO } from "../../utils/sendRequest";
import { StoreContext } from "../../store";
import { TypeLevelUser } from "../../utils/constant/key";

export default function LoginScreen({ navigation, route }) {
  const { t } = useTranslation();
  const { colors } = useContext(StoreContext);
  const passRef = useRef(null);
  const userRef = useRef(null);
  const [password, setPassword] = useState("");
  const [userid, setUserid] = useState("");
  const [saveLogin, setSaveLogin] = useState(true);
  const remmemRef = useRef(true);
  const loginFlag = useRef(false);
  const [loading, setLoading] = useState(false);
  const { setUserInfo } = useContext(StoreUserInfo);

  const { userInfo } = useContext(StoreUserInfo);
  //-- modal reset password --
  const user_id = useRef("");
  const pass = useRef("");

  useEffect(() => {
    user_id.current = userid.trim();
    pass.current = password;
  }, [userid, password]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setOldSession();
    });
    return unsubscribe;
  }, [navigation]);

  const setOldSession = async () => {
    const userStr = await AsyncStorage.getItem("0101X11");
    if (userStr) {
      const userObj = JSON.parse(userStr);
      if (userObj) {
        setUserid(userObj.usr);
        setPassword(userObj.pass);
      } else {
        if (userRef)
          setTimeout(() => {
            userRef.current?.focus();
          }, 100);
      }
    }
  };

  const onLoginDemo = () => {
    navigation.navigate({
      name: screens.HOME,
    });

    return
  }

  const onLoginPress = () => {



    Keyboard.dismiss();
    if (loginFlag.current) return;
    if (!userid || userid.trim() === "") {
      navigation.navigate(screens.ALERT_MODAL, {
        notifyType: "warning", //'info', 'error', warning
        onPressOk: () => userRef.current?.focus(),
        content: t("user_id_is_required"),
      });
      return;
    }
    if (!password || password.trim() === "") {
      navigation.navigate(screens.ALERT_MODAL, {
        notifyType: "warning",
        onPressOk: () => passRef.current?.focus(),
        content: t("user_pass_is_required"),
      });
      return;
    }
    setLoading(true);
    loginFlag.current = true;
    let data = {
      email: userid.toLowerCase().trim(),
      password: password,
    };

    IO.sendRequest(
      serviceList.login_auth,
      Object.values(data),
      loginCallBack,
      true,
      timeOutFunct,
      15000,
      "login_auth"
    );
  };

  const loginCallBack = (requestInfo, result) => {
    loginFlag.current = false;
    setLoading(false);
    if (result["proc_status"] == 1) {
      // storeNotify(response["data"]);
      const data = result["proc_data"]["rows"] || {};
      if (data.user_level != TypeLevelUser.farmer && data.user_level !=TypeLevelUser.agency) {
        navigation.navigate(screens.ALERT_MODAL, {
          notifyType: "error",
          onPressClose: () => {
            userRef.current?.focus();
          },
          content: 'Ứng dụng dùng cho đội sản xuất và hộ khoán',
        });
        return;
      }
      storeUserInfo(data);

    } else {
      navigation.navigate(screens.ALERT_MODAL, {
        notifyType: "error",
        onPressClose: () => {
          userRef.current?.focus();
        },
        content: result["proc_message"],
      });
    }
  };

  const timeOutFunct = (reqInfo) => {
    loginFlag.current = false;
    setLoading(false);
  };

  // const storeNotify = async (userInfo) => {
  //   try {
  //     const notify = await AsyncStorage.getItem("0101X12");
  //     const notify_info = !notify ? null : JSON.parse(notify);
  //     if (
  //       notify_info &&
  //       notify_info.user_name == userInfo.email &&
  //       notify_info.key == userInfo.key
  //     )
  //       return;
  //     if (notify_info && notify_info.key) OneSignal.logout(notify_info.key);
  //     OneSignal.login(userInfo.key);
  //     await AsyncStorage.setItem(
  //       "0101X12",
  //       JSON.stringify({ user_name: userInfo.email, key: userInfo.key })
  //     );
  //   } catch { }
  // };

  const storeUserInfo = async (data) => {
    //    return;
    glb_sv.authFlag = true;
    glb_sv.sessionInfo = data;
    setUserInfo(glb_sv.sessionInfo);

    // await AsyncStorage.setItem("token", userInfo["token"]); //-- lưu token do server trả lên
    await AsyncStorage.setItem("0101X10", JSON.stringify(glb_sv.sessionInfo)); //-- lưu user info of this session
    if (remmemRef.current) {

      try {
        const acnt = { usr: user_id.current, pass: pass.current };
        await AsyncStorage.setItem("0101X11", JSON.stringify(acnt));
      } catch (error) {
        //    console.log("Error saving data: " + error);
      }
    } else {
      try {
        await AsyncStorage.removeItem("0101X11");
      } catch (error) {
        //     console.log("Error removeItem data: " + error);
      }
    }

    glb_sv.authFlag = true;
    navigation.navigate({
      name: screens.HOME,
    });
  };

  const checkRemmeUserInfo = (e) => {
    setSaveLogin(!saveLogin);
    remmemRef.current = !remmemRef.current;
  };

  return (
    // KeyboardAvoidingView => Thành phần này sẽ tự động điều chỉnh chiều cao, vị trí hoặc phần đệm dưới dựa trên chiều cao bàn phím để vẫn hiển thị trong khi bàn phím ảo được hiển thị
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, flexDirection: "column", justifyContent: "center", backgroundColor: colors.BG__SCREEN }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -100}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={stylesComp.container}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Image
                source={require("../../assets/images/logo/logo-vina.png")}
                alt={"chips"}
                width={dimensions.moderate(500)}
                resizeMode={"center"}
                style={{
                  marginTop: dimensions.moderate(50),
                }}
              />
            </View>
            <InputField
              value={userid}
              label={t("login_user_id")}
              left_icon="account-circle"
              clearButton={true}
              innerRef={userRef}
              onChangeText={(x) => setUserid(x.toLowerCase())}
            />
            <InputField
              type="password"
              value={password}
              left_icon="lock"
              label={t("login_user_password")}
              innerRef={passRef}
              onChangeText={(x) => setPassword(x)}
            />
            <View style={stylesComp.remember_block}>
              <CheckboxComp
                type="checkbox"
                checked={saveLogin}
                textColor={colors.TEXT__SCREEN}
                onPress={checkRemmeUserInfo}
                label={t("login_remember")}
              />
            </View>
            <ButtonComp
              icon_name="login-variant"
              onPress={onLoginPress}
              buttonColor={colors.BUTTON__PRIMARY}
              loading={loading}
              text={t("login").toLocaleUpperCase()}
            />
          </View>

          {/* <View style={{ marginLeft: dimensions.moderate(20) }}>
            <TextComp value={'Tên đăng nhập: admin@chips.vn'} fontSize={fontSizes.medium} fontWeight={fontWeights.medium} textColor={colors.TEXT__SCREEN}></TextComp>
            <TextComp value={'Mật khẩu: 123456'} fontSize={fontSizes.medium} fontWeight={fontWeights.medium} textColor={colors.TEXT__SCREEN}></TextComp>
          </View> */}

          {/* <View style={{ width: '100%', display: 'flex', alignItems: 'center', marginTop:dimensions.vertical(40) }}>
            <ButtonComp
              icon_name="login-variant"
              onPress={onLoginDemo}
              buttonColor={colors.BUTTON__SUCCESS}
              loading={loading}
              text={t("Xem Demo")}
            />
          </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
      <CopyRight />
    </>
  );
}

const stylesComp = StyleSheet.create({
  container: {
    padding: dimensions.indent,
    flexDirection: "column", // with mobile flex Direction has always is column
  },
  textColor: {
    color: "red",
    fontWeight: "bold",
  },
  remember_block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: dimensions.moderate(5),
    marginBottom: dimensions.moderate(10),
  },
  register_block: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: dimensions.moderate(40),
    marginLeft: dimensions.moderate(10),
    marginRight: dimensions.moderate(10),
  },
});
