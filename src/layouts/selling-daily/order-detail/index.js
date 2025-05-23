import React from "react";
import { View, StyleSheet } from "react-native";
import { Divider, Modal, IconButton } from "react-native-paper";
import { SettlDetailList } from "../../../project-components";
import { dimensions, color, fontSizes } from "../../../styles";
import { useTranslation } from "react-i18next";
import { TextComp } from "../../../basic-components";

export function SettlDtDetail({
  visible = false,
  closeModal,
  orderValue,
  orderId,
  data = [],
  isRepay = "Y",
  confirm_payment,
  processing,
}) {
  const { t } = useTranslation();
  return (
    <Modal
      visible={visible}
      onDismiss={closeModal}
      style={{ margin: dimensions.indent }}
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
              <TextComp fontSize={fontSizes.medium} value={t("order_detail")} />
            </View>
            <IconButton
              icon="close"
              style={{ margin: 0 }}
              onPress={closeModal}
            />
          </View>
          <Divider />

          <View
            style={{
              flexDirection: "column",
              marginLeft: dimensions.indent,
              marginRight: dimensions.indent,
              marginBottom: dimensions.indent,
            }}
          >
            <SettlDetailList
              isRepay={isRepay}
              data={data}
              orderValue={orderValue}
              orderId={orderId}
              confirm_payment={confirm_payment}
              processing={processing}
            />
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
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: color.LIGHT.SECOND__BG__COLOR,
  },
  rowContent: {
    marginTop: dimensions.indent / 3,
    backgroundColor: color.LIGHT.FOURTH__BG__COLOR,
    padding: dimensions.indent / 3,
    borderColor: color.LIGHT.FOURTH__CONTENT__COLOR,
    borderWidth: 1,
    borderRadius: dimensions.moderate(10),
    maxHeight: (30 / 100) * dimensions.HEIGHT,
    minHeight: (16 / 100) * dimensions.HEIGHT,
  },
  viewRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
});
