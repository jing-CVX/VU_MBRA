import React from 'react';
import {View, Image} from 'react-native';
// import {glb_sv} from '../../utils';
import {dimensions, color} from '../../styles';

export const ImgProd = ({
  url = null,
  width = null,
  height = null,
  alt = null,
  radius = null,
  borderColor = null,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        height: height ? height : dimensions.moderate(55),
        width: width ? width : dimensions.moderate(55),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: radius ? radius : width ? width : dimensions.moderate(55),
        overflow: 'hidden',
        backgroundColor: borderColor ? borderColor : color.LIGHT.INPUT__BORDER,
      }}>
      {url ? (
        <Image
          source={{uri: url}}
          alt={alt ? alt : 'Image'}
          style={{
            height: height ? height - 2 : dimensions.moderate(52),
            width: width ? width - 2 : dimensions.moderate(52),
            borderRadius: radius
              ? radius
              : width
              ? width - 2
              : dimensions.moderate(52),
          }}
        />
      ) : (
        <Image
          source={require('../../assets/images/common/default_img.png')}
          alt={alt ? alt : 'Image'}
          style={{
            height: height ? height - 2 : dimensions.moderate(51),
            width: width ? width - 2 : dimensions.moderate(51),
            margin: dimensions.moderate(1),
            borderRadius: radius ? radius : null,
          }}
        />
      )}
    </View>
  );
};
