import React from 'react';
import {dimensions, color} from '../../styles';
import {View, Image, StyleSheet, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

export const EmptyRows = ({width = null, height = null}) => {
  const {t} = useTranslation();
  return (
    <View style={styles.emptyrows}>
      <Image
        source={require('../../assets/images/common/ic_folder_null.png')}
        style={{
          height: height ? height : dimensions.moderate(100),
          width: width ? width : dimensions.moderate(100),
          margin: dimensions.moderate(1),
        }}
      />
      <Text
        style={{
          color: color.LIGHT.SECOND__CONTENT__COLOR,
          margin: dimensions.moderate(10),
        }}>
        {t('no_data_found')}!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyrows: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
