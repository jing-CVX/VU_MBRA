import React from "react";
import { View } from "react-native";
// import {dimensions, fontSizes, IconSvg, color} from '../../styles';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Appearance } from "react-native";
const colorScheme = Appearance.getColorScheme();

export const DatePicker = ({
  date = new Date(), // Initial selected date/time
  mode = "date", // Choose between "date", "time", and "datetime"
  isVisible = false, // Show the datetime picker
  buttonTextColorIOS = "", // The color of the confirm button texts (iOS)
  cancelTextIOS = "Cancel", // The label of the cancel button (iOS)
  confirmTextIOS = "Ok", // The label of the confirm button (iOS)
  isDarkModeEnabled = false, // Forces the picker dark/light mode if set (otherwise fallbacks to the Appearance color scheme) (iOS)
  onCancel = () => null, // Function called when the date changes (with the new date as parameter).
  onConfirm = () => null, // Function called on date or time picked. It returns the date or time as a JavaScript Date object
  onHide = () => null, // Called after the hide animation
  pickerContainerStyleIOS = {}, // The style of the picker container (iOS)
  pickerStyleIOS = {}, // The style of the picker component wrapper (iOS)
  ...props
}) => {
  return (
    <View>
      <DateTimePickerModal
        date={date}
        isVisible={isVisible}
        mode={mode}
        buttonTextColorIOS={buttonTextColorIOS}
        cancelTextIOS={cancelTextIOS}
        confirmTextIOS={confirmTextIOS}
        isDarkModeEnabled={colorScheme === "dark" ? true : false}
        onConfirm={onConfirm}
        onCancel={onCancel}
        onHide={onHide}
        pickerContainerStyleIOS={pickerContainerStyleIOS}
        pickerStyleIOS={pickerStyleIOS}
        {...props}
      />
    </View>
  );
};
