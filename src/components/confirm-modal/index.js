import React, { useContext } from "react";
import { SafeAreaView, ScrollView, StyleSheet, View, Text } from "react-native";
import { dimensions, fontSizes, fontWeights } from "../../styles";
import { useTranslation } from "react-i18next";
import { Button, Dialog, Portal } from "react-native-paper";
import { StoreContext } from "../../store";

export const ConfirmModal = ({
  titleModal = null,
  visible = false,
  showCancel = false,
  onPressOk = (e) => null, // ok button
  titleOk = "", // ok button
  onPressCancel = (e) => null, // cancel button
  titleCancel = "", // cancel button
  content = "AAAAAA", // content message
  notifyType = "info", //'info', 'error', warning
  item = null,
}) => {
  const { t } = useTranslation();
  const { colors } = useContext(StoreContext);

  return (
    <Portal>
      <Dialog   onDismiss={() => onPressCancel(false)} visible={visible} style={{ backgroundColor: "white" }}>
        <Dialog.Title style={{ textAlign: "center" }}>
          <Text
            style={{
              fontSize: fontSizes.xmedium,
              fontWeight: fontWeights.bold,
              textAlign: "center",
              color:
                notifyType == "info"
                  ? colors.NOTIFY__INFO
                  : notifyType == "warning"
                  ? colors.NOTIFY__WARN
                  : colors.NOTIFY__ERROR,
            }}
          >
            {titleModal ? titleModal : t("common_notify")}
          </Text>
        </Dialog.Title>

        <Dialog.Content>
          <SafeAreaView>
            <ScrollView style={styles.scrollView}>
              <Text
                style={{ color: colors.PRIMARY__CONTENT__COLOR }}
                variant="bodyMedium"
              >
                {content}
              </Text>
            </ScrollView>
          </SafeAreaView>
        </Dialog.Content>
        <Dialog.Actions>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            {showCancel ? (
              <View
                style={{
                  flex: 1,
                  marginRight: showCancel ? dimensions.moderate(5) : 0,
                }}
              >
                <Button
                  textColor={colors.PRIMARY__CONTENT__COLOR}
                  mode="outlined"
                  onPress={onPressCancel}
                >
                  {titleCancel ? titleCancel : t("cancel")}
                </Button>
              </View>
            ) : undefined}
            <View
              style={{
                flex: 1,
                marginLeft: showCancel ? dimensions.moderate(5) : 0,
              }}
            >
              <Button
                mode="contained"
                textColor={colors.ACTIVE__CONTENT__COLOR}
                buttonColor={
                  notifyType == "info"
                    ? colors?.NOTIFY__INFO
                    : notifyType == "warning"
                    ? colors.NOTIFY__WARN
                    : colors.NOTIFY__ERROR
                }
                onPress={() => onPressOk(item)}
              >
                {titleOk ? titleOk : t("ok")}
              </Button>
            </View>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: dimensions.moderate(200),
    paddingHorizontal: dimensions.moderate(10),
  },
});
