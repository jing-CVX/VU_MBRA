import React from 'react';
import {IconButton} from 'react-native-paper';
import {dimensions, fontSizes, IconSvg, color} from '../../styles';

export const IconComp = ({
  mode = 'contained', // 'outlined' | 'contained' | 'contained-tonal'
  icon_nm = '', // the name of an icon from MaterialCommunityIcon: https://oblador.github.io/react-native-vector-icons/
  iconColor = '', // Custom Icon's color
  containerColor = '', // containerColor Icon's color
  iconSize = null, // Size of icon
  disabled = false,
  onPress = e => null, // Function to execute on press.
  style = null, // Type: StyleProp<ViewStyle>
  ...props
}) => {
  return (
    <IconButton
      mode={mode}
      icon={icon_nm}
      disabled={disabled}
      iconColor={iconColor ? iconColor : color.LIGHT.BUTTON__TEXT__ACTIVE}
      containerColor={containerColor}
      size={iconSize ? iconSize : dimensions.moderate(22)}
      style={style}
      onPress={onPress}
      {...props}
    />
  );
};
