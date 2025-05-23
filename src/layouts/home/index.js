import React, { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, TouchableOpacity, ScrollView, Image, SafeAreaView } from "react-native";
import { eventList, glb_sv, screens } from "../../utils";
import { dimensions, fontSizes, fontWeights } from "../../styles";
import { StoreContext } from "../../store";
import { StoreUserInfo } from "../../store-user-info";
import { Divider } from "react-native-paper";
import { TextComp } from "../../basic-components";
import IC_BRANCH from '../../assets/images/common/shop-vendor-icon.svg';
import IC_PURCHASE from '../../assets/images/common/commission-discounts-icon.svg';
import IC_CONTRACT from '../../assets/images/common/user-data-icon.svg';
import IC_NOTIFICATION from '../../assets/images/common/notification_bell.svg';

export default function HomeScreen({ navigation }) {
    const { colors } = useContext(StoreContext);
    const { t } = useTranslation();
    const { userInfo } = useContext(StoreUserInfo);

    useEffect(() => {
        const commonEvent = glb_sv.commonEvent.subscribe((msg) => {
            if (msg.type === eventList.EXPIRE_SESSION) {
                setTimeout(() => {
                    navigation.navigate(screens.LOGIN);
                }, 300);
            }
        });
        return () => {
            commonEvent.unsubscribe();
        };
    }, [navigation]);

    useEffect(() => {
        if (!userInfo || !userInfo.user_id) {
            navigation.navigate(screens.LOGIN);
        }
    }, [userInfo, navigation]);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.BG__SCREEN }}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Image source={require("../../assets/images/logo/logo-vina.png")} style={styles.logo} />
                    <TextComp style={styles.textCenter} value={userInfo.company_nm} fontWeight={fontWeights.bold} textColor={colors.TEXT__PRIMARY} fontSize={fontSizes.small} />
                    <TextComp style={styles.textCenter} value={userInfo.branch_nm} fontWeight={fontWeights.bold} textColor={colors.TEXT__PRIMARY} fontSize={fontSizes.small} />
                    <TextComp style={styles.textCenter} value={userInfo.agency_nm} fontWeight={fontWeights.bold} textColor={colors.TEXT__PRIMARY} fontSize={fontSizes.small} />
                    <Divider style={styles.divider} />
                    <View>
                        <View style={styles.bottomBlock}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate(screens.CONTRACTING)}>
                                <View style={[styles.itemBlock, { backgroundColor: colors.BG__SECONDARY }]}>
                                    <IC_BRANCH fill={colors.BG__PRIMARY} height={dimensions.moderate(80)} width={dimensions.moderate(80)} style={styles.icon} />
                                    <TextComp value={t('contracting')} fontWeight={fontWeights.bold} textColor={colors.TEXT__BLACK} fontSize={fontSizes.small} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate(screens.PURCHASING)}>
                                <View style={[styles.itemBlock, { backgroundColor: colors.BG__SECONDARY }]}>
                                    <IC_PURCHASE fill={colors.BG__PRIMARY} height={dimensions.moderate(80)} width={dimensions.moderate(80)} style={styles.icon} />
                                    <TextComp value={t('purchasing')} fontWeight={fontWeights.bold} textColor={colors.TEXT__BLACK} fontSize={fontSizes.small} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomBlock}>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate(screens.REQUEST_RESPONSE)}>
                                <View style={[styles.itemBlock, { backgroundColor: colors.BG__SECONDARY }]}>
                                    <IC_NOTIFICATION fill={colors.BG__PRIMARY} height={dimensions.moderate(80)} width={dimensions.moderate(80)} style={styles.icon} />
                                    <TextComp value={t('requestAndResponse')} fontWeight={fontWeights.bold} textColor={colors.TEXT__BLACK} fontSize={fontSizes.small} />
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate(screens.ContractScreen)}>
                                <View style={[styles.itemBlock, { backgroundColor: colors.BG__SECONDARY }]}>
                                    <IC_CONTRACT fill="#07923D" height={dimensions.moderate(80)} width={dimensions.moderate(80)} style={styles.icon} />
                                    <TextComp value={t('contract')} fontWeight={fontWeights.bold} textColor={colors.TEXT__BLACK} fontSize={fontSizes.small} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: dimensions.moderate(10),
    },
    logo: {
        width: dimensions.moderate(100),
        resizeMode: "center",
    },
    textCenter: {
        textAlign: "center",
    },
    divider: {
        margin: dimensions.indent,
        width: '70%',
    },
    bottomBlock: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemBlock: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: dimensions.moderate(150),
        width: dimensions.moderate(150),
        borderRadius: dimensions.moderate(30),
        margin: dimensions.indent / 2,
    },
    icon: {
        margin: dimensions.moderate(10),
    },
});