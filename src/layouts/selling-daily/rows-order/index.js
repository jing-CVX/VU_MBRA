import { View, TouchableOpacity, StyleSheet } from "react-native";
import { TextComp } from "../../../basic-components";
import { dimensions, color, fontSizes } from "../../../styles";
import { FormatNumber, glb_sv } from "../.././../utils";
import React from "react";

export function RowItem({ index = 0, item, onPress }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: index % 2 == 0 ? color.LIGHT.SECOND__BG__COLOR : null,
      }}
      activeOpacity={0.8}
      onPress={() => onPress(item)}
    >
      <View style={styles.viewCol}>
        <View style={styles.viewRow}>
          <View style={styles.partLeftView}>
            <TextComp fontSize={fontSizes.medium} value={item.o_5} />
          </View>
          <View style={styles.partRightView}>
            <TextComp
              fontSize={fontSizes.small}
              value={"Số sp: " + FormatNumber(item.o_9) + ", bàn: " + item.o_16}
            />
            <TextComp
              fontSize={fontSizes.small}
              value={FormatNumber(item.o_10) + " đ"}
            />
          </View>
        </View>
        <View style={styles.viewRow}>
          <TextComp
            textColor={color.LIGHT.SECOND__CONTENT__COLOR}
            fontSize={fontSizes.verySmall}
            value={
              item.o_13 +
              " - " +
              item.o_15 +
              " - " +
              glb_sv.formatDate(item.o_14)
            }
          />
          {item.o_12 === "N" && (
            <TextComp
              textColor={color.LIGHT.NOTIFY__ERROR}
              fontSize={fontSizes.verySmall}
              value={"Còn nợ"}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  viewCol: {
    flexDirection: "column",
    marginBottom: dimensions.moderate(3),
    marginTop: dimensions.moderate(3),
  },
  viewRow: {
    flexDirection: "row",
    // width: dimensions.WIDTH - dimensions.indent * 2,
    justifyContent: "space-between",
    alignItems: "center",
  },
  partLeftView: {
    flexDirection: "column",
    marginRight: dimensions.moderate(5),
  },
  partRightView: {
    // flex: 1, //-- Item này sẽ tự động fill độ rộng full hết không gian còn lại
    flexDirection: "column",
    marginLeft: dimensions.moderate(5),
    alignItems: "flex-end",
    justifyContent: "center",
  },
});
