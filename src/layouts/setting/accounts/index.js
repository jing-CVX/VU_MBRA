import React, { useEffect, useContext, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  PermissionsAndroid,
  Alert
} from "react-native";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { dimensions, fontSizes, color, fontWeights } from "../../../styles";
import { ButtonComp } from "../../../basic-components";
import { Divider, Snackbar } from "react-native-paper";
import { TextComp } from "../../../basic-components";
import { HeaderLR, HeaderTitle, NotifyAuto } from "../../../components";
import { StoreUserInfo } from "../../../store-user-info";

import { screens, glb_sv, socket_sv, serviceList } from "../../../utils";
import { ModalChangePassword } from "../../../project-components/modal-change-password";
import { IO } from "../../../utils/sendRequest";
import { StoreContext } from "../../../store";
import Geolocation from 'react-native-geolocation-service';

export default function AccountScreen({ navigation, route }) {
  const { t } = useTranslation();
  //-- information of cart in StoreContext
  const { colors } = useContext(StoreContext);
  const { userInfo } = useContext(StoreUserInfo);
  const [isShowChangePassword, setShowChangePassword] = useState(false);
  const [notify, setNotify] = useState({ show: false, titleModal: '', iconLeft: '', color: '' });
  const password_new = useRef('');
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const iconHeaderPress = () => {
    navigation.navigate({
      name: screens.ADMINIST,
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <HeaderTitle title={t("account")} />,
      headerLeft: () => (
        <HeaderLR
          isRight={false}
          icon_nm={"chevron-left"}
          title={t("administrator")}
          onPress={iconHeaderPress}
        />
      ),
    });
  }, [navigation]);

  const logout = async () => {
    IO.sendRequest(
      serviceList.logout_auth,
      [userInfo.user_id],
      callBackSubmit,
      true,
      timeOutFunct,
      10000
    );
  };

  const callBackSubmit = async (reqInfoMap, result) => {
    await AsyncStorage.removeItem("0101X10");
    await AsyncStorage.removeItem("0101X12");
    navigation.navigate(screens.LOGIN);
  };

  const timeOutFunct = (reqInfo) => {
    navigation.navigate(screens.LOGIN);
  };



  const onChangPassword = (isShow, password) => {
    if (!isShow) {
      setShowChangePassword(false);
      return;
    }
    password_new.current = password;
    IO.send({
      token: serviceList.CHANGE_PASSWORD,
      data: {
        id: +(userInfo?.user_id),
        password: password
      }
    });
  }

  const changePasswordCallBack = (response) => {
    setShowChangePassword(false);
    if (response.status == 1) {
      setShowChangePassword(false);
      if (response.status == 1) {
        setNotify({ show: true, titleModal: 'change_password_success', iconLeft: 'user', color: color.LIGHT.GREEN_1 });
        setOldSession();
        return;
      }
      if (response.message) setNotify({ show: true, titleModal: response.message, iconLeft: 'cancel', color: color.LIGHT.ORANGE_1 });
    }
  };

  const setOldSession = async () => {
    const userStr = await AsyncStorage.getItem("0101X11");
    if (!userStr) return;
    const userObj = JSON.parse(userStr);
    if (!userObj) return;
    try {
      const acnt = { usr: userObj.usr, pass: password_new.current };
      await AsyncStorage.setItem("0101X11", JSON.stringify(acnt));
    } catch {

    }
  };

  useEffect(() => {
    getCurrentLocation();
    requestLocationPermission();
}, []);

const requestLocationPermission = async () => {
    if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'Chúng tôi cần quyền truy cập vị trí để hiển thị vị trí của bạn.',
                buttonNegative: 'Hủy',
                buttonPositive: 'OK',
            }
        );
        getCurrentLocation();
        // if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //     getCurrentLocation();
        // } else {
        //     Alert.alert('Quyền bị từ chối', 'Bạn cần cấp quyền truy cập vị trí để sử dụng tính năng này.');
        // }
    } else {
        getCurrentLocation();
    }
};

const getCurrentLocation = () => {
  
    Geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            
            setLocation({ latitude, longitude });
        },
        (error) => {
            console.error(error);
            Alert.alert('Lỗi', 'Không thể lấy vị trí hiện tại.');
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
};


  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor:colors.BG__SCREEN }}>

        <ScrollView style={styles.container}>

          <View style={{ display: 'flex', alignItems: 'center' }}>
            <Image
              source={require("../../../assets/images/logo/logo-vina.png")}
              alt={"vn"}
              resizeMode={"center"}
              style={{
                objectFit: 'contain'
              }}
            />
               <TextComp style={{textAlign:"center"}} value={userInfo.company_nm} fontWeight={fontWeights.bold} textColor={colors.TEXT__PRIMARY} fontSize={fontSizes.small}></TextComp>
          <TextComp style={{textAlign:"center"}} value={userInfo.branch_nm} fontWeight={fontWeights.bold} textColor={colors.TEXT__PRIMARY} fontSize={fontSizes.small}></TextComp>
          <TextComp style={{textAlign:"center"}} value={userInfo.agency_nm} fontWeight={fontWeights.bold} textColor={colors.TEXT__PRIMARY} fontSize={fontSizes.small}></TextComp>
        
          </View>
          <View style={styles.viewAccount}>

            <View style={styles.rowItem}>
              <TextComp
              textColor={colors.TEXT__SCREEN}
                style={styles.title}
                value={t("register_email") + ": "}
              />
              <TextComp     textColor={colors.TEXT__SCREEN} style={styles.content} value={userInfo?.email} />
            </View>

            <View style={styles.rowItem}>
              <TextComp     textColor={colors.TEXT__SCREEN} style={styles.title} value={t("accountName") + ": "} />
              <TextComp     textColor={colors.TEXT__SCREEN} style={styles.content} value={userInfo?.user_nm} />
            </View>

      
            <Divider
              style={{
                marginTop: dimensions.indent,
                marginBottom: dimensions.indent,
                marginLeft: dimensions.indent,
                marginRight: dimensions.indent,
                color: color.LIGHT.PRIMARY__CONTENT__COLOR,
              }}
            />

            <View style={[styles.rowItem, { justifyContent: "flex-end" }]}>

              <ButtonComp
                icon_name={"home"}
                mode="text"
                buttonColor={color.LIGHT.PRIMARY__BG__COLOR}
                textColor={color.LIGHT.BLUE__BG__COLOR}
                onPress={() => {
                  navigation.navigate(screens.HOME);
                }}
                text={t("home")}
                style={{
                  borderColor: color.LIGHT.BLUE__BG__COLOR,
                  borderWidth: 1,
                  marginRight: dimensions.indent / 2,
                  flex: 1,
                  borderRadius: dimensions.moderate(10),
                }}
              />
              <ButtonComp
                icon_name={"logout"}
                mode="text"
                buttonColor={color.LIGHT.PRIMARY__BG__COLOR}
                textColor={color.LIGHT.ORANGE_1}
                style={{
                  flex: 1,
                  borderColor: color.LIGHT.ORANGE_1,
                  borderWidth: 1,
                  marginLeft: dimensions.indent / 2,
                  borderRadius: dimensions.moderate(10),
                }}
                onPress={() => logout()}
                text={t("logout")}
              />
            </View>
          </View>

          <View style={{ marginTop: dimensions.vertical(10)}}>
          <TextComp  fontSize={fontSizes.small}    textColor={colors.TEXT__SCREEN} style={styles.title} value={t("Vị trí hiện tại") + ": "} />
          </View>

          <View style={styles.rowItem}>
              <TextComp     textColor={colors.TEXT__SCREEN} style={styles.title} fontSize={fontSizes.small} value={t("Vĩ độ") + ": "} />
              <TextComp     textColor={colors.TEXT__SCREEN} style={styles.content} fontSize={fontSizes.small} value={location.latitude || 0} />
            </View>
            <View style={styles.rowItem}>
              <TextComp     textColor={colors.TEXT__SCREEN} style={styles.title} fontSize={fontSizes.small} value={t("Kinh độ") + ": "} />
              <TextComp     textColor={colors.TEXT__SCREEN} style={styles.content} fontSize={fontSizes.small} value={location.longitude || 0} />
            </View>
        </ScrollView>
        {/* <View style={{ borderColor: color.LIGHT.WHITE, display: 'flex', flexDirection: 'row', padding: dimensions.moderate(10), backgroundColor: color.LIGHT.BLUE__BG__COLOR, borderTopWidth: 1, }}>
                  <View style={{ flex: 1,   backgroundColor: color.LIGHT.BLUE__BG__COLOR, justifyContent:'center', alignItems:'center' , flexDirection:'row'}}>
                    <ButtonComp onPress={()=>{
                        navigation.navigate({
                          name: screens.HOME,
                        });
                    }} text={t('home')} icon_name={'home'} buttonColor={color.LIGHT.BLUE__BG__COLOR} style={{borderWidth:1, borderColor:color.LIGHT.BLUE_1}}></ButtonComp>
                  </View>
                </View> */}
        <ModalChangePassword closeModal={onChangPassword} btnIcon={'check'} btnColor={color.LIGHT.GREEN_1} title={t('change_pass')} visibleModal={isShowChangePassword}></ModalChangePassword>
        <NotifyAuto close={() => {
          setNotify({ show: false, titleModal: '', iconLeft: '', color: '' })
        }} titleModal={t(notify.titleModal)} textColor={notify.color} iconLeft={notify.iconLeft} show={notify.show}></NotifyAuto>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: dimensions.indent,
    marginRight: dimensions.indent,
    marginBottom: dimensions.moderate(70),
    marginTop: dimensions.indent,
    flex:1
  },
  viewAccount: {
    borderRadius: dimensions.moderate(10),
    flexDirection: "column", // with mobile flex Direction has always is column
    borderColor: color.LIGHT.TABBAR__INACTIVE__COLOR,
    borderWidth: 1,
    padding: dimensions.moderate(10),
  },
  rowItem: {
    flexDirection: "row",
    marginBottom: dimensions.indent / 3,
    marginTop: dimensions.indent / 3,
  },
  title: {
    flex: 2,
    fontSize: fontSizes.normal,
    color: color.LIGHT.SECOND__CONTENT__COLOR,
  },
  content: {
    flex: 3,
    fontSize: fontSizes.normal,
  },
  cardModal: {
    backgroundColor: "white",
    borderRadius: dimensions.moderate(10),
    overflow: "hidden",
    // backgroundColor: 'red',
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: color.LIGHT.SECOND__BG__COLOR,
  },
  contentStyle: {
    marginLeft: dimensions.indent,
    marginRight: dimensions.indent,
    // marginBottom: "60%",
  },
});
