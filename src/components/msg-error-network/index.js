import React, {useContext, memo} from 'react';
import {View, StyleSheet, Platform, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StoreContext} from '../../store';
import {fontSizes} from '../../styles';
import {WIDTH} from '../../styles/helper/dimensions';

const MessageErrorNetwork = () => {
  // return null
  const {t} = useTranslation();
  const {connected} = useContext(StoreContext);
  if (connected) return null;
  return (
    <View style={styles.containerToaster}>
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>{t('network_error')}</Text>
        </View>
      </View>
    </View>
  );
};

export default memo(MessageErrorNetwork);

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.os === 'ios' ? 33 : 28,
    marginHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 8,
    width: Math.min(WIDTH, 414),
    paddingHorizontal: 5,
  },
  containerToaster: {
    justifyContent: 'center',
    width: '100%',
    height: 56,
    backgroundColor: 'red',
    // elevation: 56 + (Platform.os === 'ios' ? 33 : 28),
  },
  text: {
    flex: 1,
    textAlign: 'center',
    fontSize: fontSizes.small,
    // paddingVertical: 5,
    color: 'white',
  },
});
