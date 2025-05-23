import React, { useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Divider } from "react-native-paper";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import LockIcon from "../../assets/images/common/lock.svg";
import { dimensions, fontSizes, fontWeights } from "../../styles";
import { glb_sv, eventList, screens } from "../../utils";
import { ButtonComp, TextComp } from "../../basic-components";
import { StoreContext } from "../../store";

export const NotAuthView = ({ navigation }) => {
  const { t } = useTranslation();
  const { colors } = useContext(StoreContext);
  useEffect(() => {
    const commonEvent = glb_sv.commonEvent.subscribe((msg) => {
      if (msg.type === eventList.EXPIRE_SESSION) {
        setTimeout(() => {
          navigation.navigate(screens.LOGIN);
         //   this.globals.localStorageUSER.logout.submit()
        }, 500);
    }
    });
    return () => {
      commonEvent.unsubscribe();
    };
  }, []);

  return (
    <View
      style={{
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          padding: dimensions.indent,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <View
            style={{
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <LockIcon />
          </View>
          <TextComp
            value={t("please_login")}
            fontSize={fontSizes.big}
            fontWeight={fontWeights.medium}
            style={{
              marginBottom: 8,
              textAlign: "center",
              marginTop: 20,
            }}
          />
          <TextComp
            value={t("notify_required_login")}
            fontSize={fontSizes.normal}
            textColor={colors.SECOND__CONTENT__COLOR}
            fontWeight={fontWeights.medium}
            style={{
              marginBottom: 8,
              textAlign: "center",
              paddingHorizontal: dimensions.moderate(5),
            }}
          />
          <ButtonComp
            labelStyle={{ fontWeight: fontWeights.bold }}
            text={t("login").toLocaleUpperCase()}
            onPress={() =>
              navigation.navigate({
                name: screens.LOGIN,
              })
            }
          />
          <Divider />
          <View style={styles.container}>
            <TextComp
              value={t("not_have_account_yet")}
              fontSize={fontSizes.normal}
              textColor={colors.SECOND__CONTENT__COLOR}
              fontWeight={fontWeights.medium}
              style={{
                marginBottom: 8,
                textAlign: "center",
                paddingHorizontal: dimensions.moderate(5),
              }}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate({
                  name: screens.SIGN_UP,
                })
              }
            >
              <TextComp
                value={t("regist_here")}
                fontSize={fontSizes.medium}
                textColor={colors.BLUE__COLOR}
                style={{
                  marginBottom: 8,
                  textAlign: "center",
                  paddingHorizontal: dimensions.moderate(5),
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: dimensions.moderate(16),
    flexDirection: "row", // with mobile flex Direction has always is column
    justifyContent: "center",
  },
});
