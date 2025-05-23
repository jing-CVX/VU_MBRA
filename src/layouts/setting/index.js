import React, { useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { dimensions, fontSizes, fontWeights, color } from '../../styles';
import { glb_sv, eventList, screens } from '../../utils';
import { NotAuthView } from '../../components';
import { Divider } from 'react-native-paper';
import { StoreUserInfo } from '../../store-user-info';

//-- get image list
import IC_BRANCH from '../../assets/images/common/shop-vendor-icon.svg';
import IC_ACCOUNT from '../../assets/images/common/add-user-account-icon.svg';
import IC_STAFF from '../../assets/images/common/staff_icon.svg';
import IC_PRODUCT from '../../assets/images/common/cash.svg';
import IC_COMMISSION from '../../assets/images/common/commission-discounts-icon.svg';

export default function AdminScreen({ navigation, route }) {
  const { t } = useTranslation();
  const { userInfo } = useContext(StoreUserInfo);

  // useEffect(() => {});
  const go2DetailScreen = type => {
    if (userInfo?.user_levl !== '0') {
      navigation.navigate(screens.ALERT_MODAL, {
        notifyType: 'warning',
        errCode: '',
        content: t('you_do_not_allow_use_this_function'),
      });
      return;
    }
    if (type == 1) {
      navigation.navigate({
        name: screens.BRANCH,
      });
    } else if (type == 2) {
      navigation.navigate({
        name: screens.STAFFS,
      });
    } else if (type == 3) {
      navigation.navigate({
        name: screens.COMM_RATIO,
      });
    } else if (type == 4) {
      navigation.navigate({
        name: screens.PRODUCT,
      });
    }
  };
  return (
    <>
      {!userInfo || !userInfo?.user_id ? (
        <NotAuthView navigation={navigation} />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate({
                    name: screens.ACCOUNT,
                  });
                }}>
                <View style={[styles.topBlock, styles.itemBlock]}>
                  <IC_ACCOUNT
                    fill="#e0780e"
                    fillfirst="#00CFED"
                    height={dimensions.moderate(80)}
                    width={dimensions.moderate(80)}
                    style={{ margin: dimensions.moderate(10) }}
                  />
                  <Text style={styles.itemText}>{t('account')}</Text>
                </View>
              </TouchableOpacity>
              <Divider style={{ margin: dimensions.indent, width: '70%' }} />
              <View style={styles.bottomBlock}>
                <View style={styles.bottomBlock_1}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => go2DetailScreen(1)}>
                    <View style={styles.itemBlock}>
                      <IC_BRANCH
                        fill="#196EEE"
                        fillfirst="blue"
                        height={dimensions.moderate(80)}
                        width={dimensions.moderate(80)}
                        style={{ margin: dimensions.moderate(10) }}
                      />
                      <Text style={styles.itemText}>{t('branch_mng')}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => go2DetailScreen(2)}>
                    <View style={styles.itemBlock}>
                      <IC_STAFF
                        fill="#07923D"
                        fillfirst="blue"
                        height={dimensions.moderate(80)}
                        width={dimensions.moderate(80)}
                        style={{ margin: dimensions.moderate(10) }}
                      />
                      <Text style={styles.itemText}>{t('staff_mng')}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={styles.bottomBlock_2}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => go2DetailScreen(3)}>
                    <View style={styles.itemBlock}>
                      <IC_COMMISSION
                        fill="#E74C3C"
                        fillfirst="blue"
                        height={dimensions.moderate(80)}
                        width={dimensions.moderate(80)}
                        style={{ margin: dimensions.moderate(10) }}
                      />
                      <Text style={styles.itemText}>{t('commission_setup')}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => go2DetailScreen(4)}>
                    <View style={styles.itemBlock}>
                      <IC_PRODUCT
                        fill="#07923D"
                        fillfirst="blue"
                        height={dimensions.moderate(80)}
                        width={dimensions.moderate(80)}
                        style={{ margin: dimensions.moderate(10) }}
                      />
                      <Text style={styles.itemText}>{t('products_mng')}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemBlock: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: color.LIGHT.SECOND__BG__COLOR,
    height: dimensions.moderate(130),
    width: dimensions.moderate(130),
    borderRadius: dimensions.moderate(30),
    margin: dimensions.indent / 2,
  },
  itemText: {
    width: dimensions.moderate(130),
    height: dimensions.moderate(30),
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 0.3 },
    textShadowRadius: 0.5,
    color: color.LIGHT.SECOND__CONTENT__COLOR,
    fontSize: fontSizes.verySmall,
    fontWeight: fontWeights.bold,
  },
  topBlock: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  bottomBlock: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    // height: 200,
  },
  bottomBlock_1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBlock_2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
