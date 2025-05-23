import React, { useContext } from "react";
import { Checkbox } from "react-native-paper";
import { View, TouchableOpacity } from "react-native";
import { fontSizes } from "../../styles";
import { StoreContext } from "../../store";
import { TextComp } from "../text";

export const CheckboxComp = ({
  type = "item", // 'item', 'checkbox'
  checked = false, // boolean: checked -> true, unchecked -> false
  disabled = false, // boolean
  checkedColor = "", // Custom color for checkbox
  uncheckedColor = "", // Custom color for checkbox when uncheck
  onPress = (e) => null, // Function to execute on press.
  label = "", // Label to be displayed on the item.
  reverse = false, // label and check box will be row-reverse or not
  labelStyle = null, // Style for the title.
  style = null, // Type: StyleProp<ViewStyle>
  textColor = "",
  ...props
}) => {
  const { colors } = useContext(StoreContext);
  return (
    <>
      {type == "item" ? (
        <Checkbox.Item
          status={checked ? "checked" : "unchecked"}
          disabled={disabled}
          label={label}
          labelStyle={
            labelStyle
              ? labelStyle
              : {
                  fontSize: fontSizes.normal,
                  color: colors.SECOND__CONTENT__COLOR,
                }
          }
          color={checkedColor ? checkedColor : colors.BUTTON__PRIMARY}
          uncheckedColor={
            uncheckedColor ? checkedColor : colors.BUTTON__WHITE
          }
          onPress={onPress}
          style={style}
          {...props}
        />
      ) : (
        <TouchableOpacity activeOpacity={1} onPress={onPress}>
          <View
            style={{
              flexDirection: reverse ? "row-reverse" : "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              disabled={disabled}
              color={checkedColor || colors.INPUT__OUTLINE__PRIMARY__ACTIVE}
              uncheckedColor={
                uncheckedColor || colors.INPUT__OUTLINE__PRIMARY
              }
            style={[style]}
              {...props}
            />
            {label ? (
              <TextComp
                style={labelStyle}
                fontSize={fontSizes.normal}
                textColor={colors.TEXT__SCREEN}
                value={label}
              />
            ) : null}
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};
