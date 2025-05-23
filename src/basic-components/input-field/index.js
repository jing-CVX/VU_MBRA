import React, { useState, useContext } from "react";
import { FormatNumber } from "../../utils";
import { color, dimensions, fontSizes } from "../../styles";
import { TextInput } from "react-native-paper";
import { StoreContext } from "../../store";

export const InputField = ({
  type = "text", // text, number, password
  mode = "outlined", // 'flat' | 'outlined'
  disabled = false,
  height = null,
  label = "",
  placeholder = "",
  onChangeText = (e) => null, // Callback when user type inputing
  onPressIn = (e) => null, // Callback that is called when a touch is engaged
  onPressOut = (e) => null, // Callback that is called when a touch is released
  left_icon = "", // MaterialCommunityIcons: Icon name, which will shown of the left, (https://callstack.github.io/react-native-paper/docs/guides/icons/#4-use-custom-icons)
  right_icon = "", // MaterialCommunityIcons: Icon name, which will shown of the right
  on_press_left_icon = (e) => null, // Called when left icon was on press
  on_press_right_icon = (e) => null, // Called when right icon was on press
  selectionColor = null, // string
  outlineColor = null, // string
  activeOutlineColor = null, // string
  textColor = null, // string
  backgroundColor = null, // string
  multiline = false, // boolean
  numberOfLines = 1, // just for android
  onFocus = (e) => null, // Callback that is called when the text input is focused
  onBlur = (e) => null, // Callback that is called when the text input is blurred
  value = "",
  showSoftInputOnFocus = true,
  innerRef,
  fontSize = null,
  clearButton = false, // if true, it's will shown on the right
  contentStyle = null, // Style css, Overrides input style Example: paddingLeft,..
  ...props
}) => {
  const [eyeStatus, setEyeStatus] = useState(type === "password");
  const { colors } = useContext(StoreContext);
  // console.log("colors", colors);

  if (type === "number") {
    value = FormatNumber(value);
  }

  return (
    <>
      {type !== "password" ? (
        <TextInput showSoftInputOnFocus={!showSoftInputOnFocus?false:true}
          style={{
            width: "100%",
            height: height,
            fontSize: fontSize ? fontSize : fontSizes.normal,
            marginBottom: dimensions.moderate(6),
            backgroundColor: backgroundColor
              ? backgroundColor
              : colors.INPUT__BG__PRIMARY,
          }}
          outlineStyle={{ borderRadius: dimensions.moderate(8) }}
          mode={mode}
          label={label}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChangeText={onChangeText}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          selectionColor={ selectionColor || colors.INPUT__CONTENT__PRIMARY }
          outlineColor={outlineColor || colors.INPUT__OUTLINE__PRIMARY}
          activeOutlineColor={activeOutlineColor || colors.INPUT__OUTLINE__PRIMARY__ACTIVE}
          textColor={textColor || colors.INPUT__CONTENT__PRIMARY}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={onFocus}
          onBlur={onBlur}
          contentStyle={contentStyle}
          ref={innerRef}
          left={
            left_icon ? (
              <TextInput.Icon icon={left_icon} onPress={on_press_left_icon} />
            ) : null
          }
          right={
            right_icon || clearButton ? (
              <TextInput.Icon
                icon={clearButton ? "close" : right_icon}
                onPress={() =>
                  clearButton ? onChangeText("") : on_press_right_icon()
                }
              />
            ) : null
          }
          {...props}
        />
      ) : (
        <TextInput
          style={{
            width: "100%",
            fontSize: fontSize ? fontSize : fontSizes.normal,
            marginBottom: dimensions.moderate(6),
            backgroundColor: backgroundColor || colors.INPUT__BG__PRIMARY,
          }}
          outlineStyle={{ borderRadius: dimensions.moderate(8) }}
          mode={mode}
          label={label}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChangeText={onChangeText}
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          selectionColor={
            selectionColor ? selectionColor : colors.INPUT__CONTENT__PRIMARY
          }
          outlineColor={outlineColor || colors.INPUT__OUTLINE__PRIMARY}
          activeOutlineColor={ activeOutlineColor || colors.INPUT__OUTLINE__PRIMARY__ACTIVE }
          textColor={textColor || colors.INPUT__CONTENT__PRIMARY}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onFocus={onFocus}
          onBlur={onBlur}
          contentStyle={contentStyle}
          ref={innerRef}
          secureTextEntry={eyeStatus}
          right={
            <TextInput.Icon
              icon={eyeStatus ? "eye" : "eye-off"}
              onPress={() => setEyeStatus(!eyeStatus)}
            />
          }
          left={left_icon ? <TextInput.Icon icon={left_icon} /> : null}
          {...props}
        />
      )}
    </>
  );
};
