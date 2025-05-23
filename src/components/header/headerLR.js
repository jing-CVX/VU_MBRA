import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {dimensions, fontSizes, color} from '../../styles';
import {Button} from 'react-native-paper';

export const HeaderLR = ({
  isRight = true,
  onPress = e => null,
  icon_nm,
  icon_color,
  iconSize,
  title,
  title_color,
  title_size,
  fontWeight,
}) => (
  <Button
    mode="text"
    onPress={onPress}
    icon={icon_nm ? icon_nm : null}
    labelStyle={{
      color: icon_color || color.LIGHT.WHITE,
      fontSize: iconSize || fontSizes.big,
      marginLeft: !isRight ? dimensions.moderate(5) : null,
      backgroundColor:color.LIGHT.BUTTON__PRIMARY
    }}
    contentStyle={{flexDirection: isRight ? 'row-reverse' : 'row'}}
    style={isRight ? styles.marginHeaderR : styles.marginHeaderL}>
    {title ? (
      <Text
        style={{
          fontWeight:fontWeight,
          marginLeft:dimensions.moderate(5),
          paddingLeft:dimensions.moderate(10),
          marginRight: isRight ? dimensions.moderate(5) : null,
          fontSize: title_size ? title_size : fontSizes.small,
          color: title_color ? title_color : color.LIGHT.WHITE,
          backgroundColor:color.LIGHT.BUTTON__PRIMARY
        }}>
        {title}
      </Text>
    ) : null}
  </Button>
);

const styles = StyleSheet.create({
  marginHeaderR: {
    marginRight: dimensions.moderate(-15),
  },
  marginHeaderL: {
    marginLeft: dimensions.moderate(-15),
  },
});
