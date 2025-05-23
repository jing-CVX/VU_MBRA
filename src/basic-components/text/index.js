import React, { useContext } from "react";
import { Text } from "react-native";
import { StoreContext } from "../../store";
import { FormatNumber } from "../../utils";
import { fontSizes, fontWeights } from "../../styles";

export const TextComp = ({
  value,
  valueType = "text", // text, number
  textColor = null, // string
  fontSize = fontSizes.normal,
  numberOfLines = null,
  fontWeight = fontWeights.normal,
  style = null,
}) => {
  const { colors } = useContext(StoreContext);
  return (
    <Text
      style={[
        style,
        {
          color: textColor ? textColor : colors.PRIMARY__CONTENT__COLOR,
          fontSize: fontSize,
          fontWeight: fontWeight,
        },
      ]}
      numberOfLines={numberOfLines}
    >
      {valueType == "number" ? FormatNumber(value) : value}
    </Text>
  );
};
