import React, { useContext } from "react";
import { dimensions, fontSizes, color, fontWeights } from "../../styles";
import { View, Text, StyleSheet } from "react-native";
import { StoreContext } from "../../store";
import {
  InputField,
  ButtonComp,
  CheckboxComp,
  TextComp,
} from "../../basic-components";

export const CopyRight = ({ fontSize = null }) => {
  const { colors } = useContext(StoreContext);
  return (
    <View style={[stylesComp.copyright, {backgroundColor:colors.BG__SCREEN}]}>
      <TextComp
        value={"©2024"}
        fontSize={fontSize ? fontSize : fontSizes.verySmall}
        textColor={colors.TEXT__SCREEN}
      />
      <TextComp
        value={" Chips."}
        textColor={colors.ORANGE_1}
        fontWeight={fontWeights.bold}
        fontSize={fontSize ? fontSize : fontSizes.verySmall}
      />
      <TextComp
        value={" All rights reserved | Legal"}
        fontSize={fontSize ? fontSize : fontSizes.verySmall}
        textColor={colors.TEXT__SCREEN}
      />
    </View>
  );
};

const stylesComp = StyleSheet.create({
  copyright: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: dimensions.moderate(30),
  },
});
