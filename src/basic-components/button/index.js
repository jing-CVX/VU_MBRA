import React, { useContext } from "react";
import { Button } from "react-native-paper";
import { dimensions, fontSizes, fontWeights } from "../../styles";
import { StoreContext } from "../../store";

export const ButtonComp = ({
  mode = "contained", // 'text' | 'outlined' | 'contained' | 'elevated' | 'contained-tonal'
  buttonColor = "", // Custom button's background color.
  textColor = "", // Custom button's text color
  loading = false, // Whether to show a loading indicator.
  icon_name = null, // Icon to display for the Button. (master design icon)
  disabled = false, // disabled
  uppercase = false, // Make the label text uppercased.
  onPressLoading = (e) => null,
  onPress = (e) => null, // Function to execute on press.
  onPressIn = (e) => null, // Function to execute as soon as the touchable element is pressed and invoked even before onPress
  onPressOut = (e) => null, // Function to execute as soon as the touch is released even before onPress
  onLongPress = (e) => null, // Function to execute on long press.
  delayLongPress = null, // The number of milliseconds a user must touch the element before executing onLongPress
  contentStyle = {}, // Style of button's inner content. Use this prop to apply custom height and width and to set the icon on the right with flexDirection: 'row-reverse'.
  labelStyle = {}, // Style for the button text.
  width = null, // percent, width of button.
  fontSize = null,
  fontWeight = null,
  text = "",
  borderRadius = null,
  ...props
}) => {
  const { colors } = useContext(StoreContext);
  return (
    <Button
      mode={mode}
      buttonColor={buttonColor ? buttonColor : colors.BUTTON__TEXT__ACTIVE}
      textColor={textColor ? textColor : colors.ACTIVE__CONTENT__COLOR}
      loading={loading}
      icon={icon_name}
      disabled={disabled}
      uppercase={uppercase}
      onPress={loading==true?onPressLoading:onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onLongPress={onLongPress}
      delayLongPress={delayLongPress}
      contentStyle={contentStyle}
      labelStyle={labelStyle}
      style={{
        width: width,
        fontSize: fontSize ? fontSize : fontSizes.normal,
        fontWeight: fontWeight || fontWeights.normal,
        borderRadius: borderRadius ? borderRadius : dimensions.moderate(8),
      }}
      {...props}
    >
      {text}
    </Button>
  );
};
