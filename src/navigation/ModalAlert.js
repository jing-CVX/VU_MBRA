import React, { useContext } from "react";
import {
  View,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  InteractionManager,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NotifyModal } from "../components";
import { glb_sv, screens } from "../utils";
import { StoreUserInfo } from "../store-user-info";

//-- Modal hiển thị các thông báo chung của hệ thống (VD: hết phiên làm việc,...)
export default function ModalAlertScreen({ navigation, route: { params } }) {
  const { setUserInfo } = useContext(StoreUserInfo);
  const handleConfirm = () => {
    navigation.pop();
    InteractionManager.runAfterInteractions(() => {
      if (params?.errCode === "XXX4" || params?.errCode === "0XX1") {
        glb_sv.authFlag = false;
        glb_sv.sessionInfo = {};
        setUserInfo(null);
        AsyncStorage.removeItem("0101X10");
        navigation.navigate({
          name: screens.LOGIN,
        });
      }
    });
  };

  const handleCancel = () => {
    navigation.pop();
    InteractionManager.runAfterInteractions(() => {
      if (params?.onPressCancel) {
        params.onPressCancel();
      } else if (!params.showCancel) {
        if (params?.onPressOk) params.onPressOk();
      }
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => handleCancel()}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <KeyboardAvoidingView behavior="padding">
          <ScrollView showsVerticalScrollIndicator={false}>
            <NotifyModal
              onPressOk={() => handleConfirm()}
              onPressCancel={() => handleCancel()}
              showCancel={params.showCancel}
              visible={true}
              titleModal={params.titleModal}
              titleCancel={params.titleCancel}
              titleOk={params.titleOk}
              notifyType={params.notifyType} // 'info', 'error', warning
              content={params.content}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
}
