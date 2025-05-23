import React, { useEffect, useRef, useState } from "react";
import { InputField, ButtonComp, TextComp } from "../../basic-components";
import { dimensions, fontSizes, color } from "../../styles";
import { useTranslation } from "react-i18next";
import { glb_sv, screens, serviceList, sendRequest } from "../../utils";
import { Modal, IconButton, Divider } from "react-native-paper";
import { View, StyleSheet } from "react-native";

export function ModalResetPass({ navigation, visibleModal, closeModal }) {
  const { t } = useTranslation();
  const [userid, setUserid] = useState("");
  const [registEmail, setRegistEmail] = useState("");
  const [freshing, setFreshing] = useState(false);
  const userResetRef = useRef(null);
  const emailRessetPassRef = useRef(null);
  const resetPassFlag = useRef(false);

  useEffect(() => {
    if (visibleModal) {
      resetModal();
      setFreshing(false);
      resetPassFlag.current = false;
    }
  }, [visibleModal]);

  const resetPassFunct = (Reset) => {
    //-- call service lưu size
    if (resetPassFlag.current) return;
    if (!userid || userid.trim() === "") {
      navigation.navigate(screens.ALERT_MODAL, {
        notifyType: "warning",
        errCode: "",
        content: t("user_id_is_required"),
      });
      if (userResetRef) {
        setTimeout(() => {
          userResetRef.current.focus();
        }, 100);
        return;
      }
    }
    if (
      !registEmail ||
      registEmail.trim() === "" ||
      !glb_sv.validateEmail(registEmail.trim())
    ) {
      navigation.navigate(screens.ALERT_MODAL, {
        notifyType: "warning",
        errCode: "",
        content: t("email_incorrect"),
      });
      if (emailRessetPassRef)
        setTimeout(() => {
          emailRessetPassRef.current.focus();
        }, 100);
      return;
    }
    resetPassFlag.current = true;
    setFreshing(true);
    const InVal = [userid.trim(), registEmail.trim()];
    sendRequest(
      serviceList.ADMIN_RESET_PASS,
      InVal,
      resetPassResultProc,
      true,
      timeOutFunct
    );
  };

  const resetPassResultProc = (reqInfoMap, message) => {
    resetPassFlag.current = false;
    setFreshing(false);
    if (message["PROC_STATUS"] == 0) {
      navigation.navigate(screens.ALERT_MODAL, {
        notifyType: "error",
        errCode: message["PROC_CODE"],
        content: message["PROC_MESSAGE"],
      });
      return;
    }
    closeModal();
    navigation.navigate(screens.ALERT_MODAL, {
      notifyType: "info",
      errCode: "",
      content: t("reset_pass_success"),
    });
  };

  const timeOutFunct = (reqInfo) => {
    resetPassFlag.current = false;
    setFreshing(false);
    navigation.navigate(screens.ALERT_MODAL, {
      notifyType: "warning",
      content: t("cannot_receive_answer_from_server"),
    });
  };

  const resetModal = () => {
    setRegistEmail("");
    setTimeout(() => {
      if (userResetRef) userResetRef.current.focus();
    }, 100);
  };

  return (
    <Modal
      visible={visibleModal}
      onDismiss={() => closeModal()}
      contentContainerStyle={styles.contentStyle}
    >
      <View style={styles.cardModal}>
        <View>
          <View style={styles.cardHeader}>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                marginLeft: dimensions.indent,
                justifyContent: "center",
              }}
            >
              <TextComp
                value={t("reset_password")}
                style={{ marginLeft: dimensions.indent }}
                fontSize={fontSizes.medium}
              />
            </View>
            <IconButton
              icon="close"
              style={{ margin: 0 }}
              onPress={() => closeModal()}
            />
          </View>
          <Divider />

          <View
            style={{
              flexDirection: "column",
              margin: dimensions.indent,
            }}
          >
            <InputField
              value={userid}
              label={t("login_user_id")}
              left_icon="account-circle"
              clearButton={true}
              innerRef={userResetRef}
              onChangeText={(x) => setUserid(x.toLowerCase())}
            />
            <InputField
              type="text"
              value={registEmail}
              innerRef={emailRessetPassRef}
              left_icon="email"
              label={t("register_email")}
              clearButton={true}
              onChangeText={(x) => setRegistEmail(x.toLowerCase())}
            />
            <View
              style={{
                flex: 1,
                marginTop: dimensions.indent / 2,
                marginBottom: dimensions.indent / 2,
              }}
            >
              <Divider />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <ButtonComp
                icon_name={"cancel"}
                mode="text"
                buttonColor={color.LIGHT.PRIMARY__BG__COLOR}
                textColor={color.LIGHT.SECOND__CONTENT__COLOR}
                style={{
                  flex: 1,
                  marginTop: dimensions.moderate(5),
                  borderRadius: dimensions.moderate(10),
                  marginRight: dimensions.moderate(5),
                  borderColor: color.LIGHT.THIRD__CONTENT__COLOR,
                  borderWidth: 1,
                }}
                onPress={() => closeModal()}
                text={t("cancel")}
              />
              <ButtonComp
                icon_name={"send"}
                mode="text"
                loading={freshing}
                style={{
                  flex: 1,
                  marginTop: dimensions.moderate(5),
                  borderRadius: dimensions.moderate(10),
                  marginLeft: dimensions.moderate(5),
                }}
                onPress={() => resetPassFunct()}
                text={t("send_request")}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
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
  remember_block: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    // marginTop: dimensions.moderate(5),
    marginBottom: dimensions.moderate(5),
  },
  text_link: {
    fontSize: fontSizes.normal,
    color: color.LIGHT.BLUE__COLOR,
    fontWeight: fontSizes.bold,
    paddingHorizontal: dimensions.moderate(5),
  },
  contentStyle: {
    margin: dimensions.indent,
    marginBottom: "90%",
  },
});
