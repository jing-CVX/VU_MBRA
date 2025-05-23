import React, {  useEffect, useRef } from "react";
import { StyleSheet, View, Animated } from "react-native";
import { color, dimensions, fontSizes, fontWeights } from "../../styles";
import { useTranslation } from "react-i18next";
import { TextComp } from "../../basic-components";
import Icon from 'react-native-vector-icons/FontAwesome';

export const NotifyAuto = ({
  titleModal = "",
  textColor = color.LIGHT.BLACK,
  iconLeft = '',
  show = false,
  close
}) => {
  const { t } = useTranslation();
  const fadeAnim = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    if(show) showNotification();
  }, [show]);

  const showNotification = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        hideNotification();
        close(true);
      }, 2000);
    });
  };

  const hideNotification = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (

    <Animated.View   style={[{ opacity: fadeAnim }, { padding: dimensions.moderate(10), position: "absolute", zIndex: 99999, top: 0, left: 0, right: 0 }]}>
      <View style={{ width: "auto", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <View style={{display:"flex",flexDirection:"row", alignItems:"center", backgroundColor: color.LIGHT.WHITE, padding: dimensions.moderate(10), minWidth: dimensions.moderate(200), borderRadius: dimensions.moderate(5), opacity: 0.9 , borderColor:textColor, borderWidth:dimensions.moderate(1)}}>
          <Icon color={textColor}  name={iconLeft} style={{marginRight:dimensions.moderate(10)}}></Icon>
          <TextComp fontSize={fontSizes.small} fontWeight={fontWeights.medium} value={t(titleModal)} textColor={textColor}></TextComp>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    maxHeight: dimensions.moderate(200),
    paddingHorizontal: dimensions.moderate(10),
  },
});
