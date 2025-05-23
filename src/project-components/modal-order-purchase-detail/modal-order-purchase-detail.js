import React, { useContext, useEffect, useState } from "react";
import { ButtonComp, TextComp } from "../../basic-components";
import { dimensions, fontSizes, color, fontWeights } from "../../styles";
import { useTranslation } from "react-i18next";
import { Modal } from "react-native-paper";
import { View, StyleSheet, ScrollView, ActivityIndicator } from "react-native";
import { KeyGetListPurchasing, KeyGetListPurchasingDetail } from "../../utils/constant/key";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FormatNumber, serviceList } from "../../utils";
import { IO } from "../../utils/sendRequest";
import { StoreContext } from "../../store";

export function ModalOrderPurchaseDetail({
    visibleModal,
    closeModal,
    id,
    order,
    notify
}) {
    const { t } = useTranslation();
    const { colors } = useContext(StoreContext);


    const [loading, setLoading] = useState(false);
    const [order_detail, setOrderDetail] = useState([]);
    const [totalRow, setTotal] = useState(0);

    useEffect(() => {
        clear();
        getOrderDetailPurchase(id);
    }, [id]);

    const getOrderDetailPurchase = (id) => {
        if (!id) return;
        if (loading) return;
        setLoading(true);
        IO.sendRequest(
            serviceList.get_list_purchasing_detail,
            [
                99999999999999,
                '%',
                id
            ],
            callBackGetOrderPurchaseDetail,
            true,
            timeOutFunct,
            15000,
        );
    };

    const callBackGetOrderPurchaseDetail = (requestInfo, result) => {
        let message = result["proc_message"];
        setLoading(false);
        if (+result["proc_status"] == 1) {
            // Xử lý thành công
            let data = result["proc_data"]["rows"];
            setTotal(result["proc_data"]["rowTotal"] || 0);
            setOrderDetail(data);
        } else {
            notify({
                show: true,
                titleModal: message,
                iconLeft: "",
                color: colors.TEXT__DANGER,
            })
        }
    };

    const timeOutFunct = (reqInfo) => {
        setLoading(false);
    };

    const  clear = () => {
        setOrderDetail([]);
        setTotal(0);
    }

    return (
        <Modal
            visible={visibleModal}
            presentationStyle="overFullScreen"
            onDismiss={() => {
                clear();
                closeModal(false);
            }}
            contentContainerStyle={styles.contentStyle}
        >
            <View style={styles.cardModal}>
                <View>
                    <View style={styles.cardHeader}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                marginLeft: dimensions.indent,
                                justifyContent: "center",
                                padding: dimensions.moderate(15),

                            }}
                        >
                            <TextComp
                                value={`${t('purchasing_order')}: ${order[KeyGetListPurchasing.code]}`}
                                style={{ textAlign: 'center' }}
                                textColor={color.LIGHT.BLUE_2}
                                fontSize={fontSizes.normal}
                                fontWeight={fontWeights.normal}
                            />

                        </View>

                    </View>
                </View>
                <ScrollView style={{ margin: dimensions.moderate(10), zIndex: 999999999 }}>

                    <View style={styles.list_item_box}>
                        {order_detail.map((item, index) => {
                            return <View key={index}>
                                <View>
                                    <View style={styles.item_box}>
                                        <View style={[styles.item_box_touchable, { borderColor: colors.BORDER__ROW }]} activeOpacity={0.8}>
                                            <View style={styles.item_top_container}>
                                                <View style={styles.item_top_left}>
                                                    <View style={[styles.box_item_top]}  >
                                                        <View style={{ marginBottom: dimensions.moderate(3) }}>
                                                            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                                                <View style={{ padding: dimensions.moderate(5), backgroundColor: colors.BG__PRIMARY, borderRadius: dimensions.moderate(5) }}>
                                                                    <TextComp
                                                                        fontSize={fontSizes.verySmall}
                                                                        textColor={colors.TEXT__WHITE}
                                                                        fontWeight={fontWeights.bold}
                                                                        value={item[KeyGetListPurchasingDetail.contract_no] || ''}
                                                                    ></TextComp>
                                                                </View>

                                                                <View style={{ padding: dimensions.moderate(5), display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                                    <TextComp
                                                                        fontSize={fontSizes.verySmall}
                                                                        textColor={colors.TEXT__PRIMARY}
                                                                        fontWeight={fontWeights.bold}
                                                                        value={item[KeyGetListPurchasingDetail.tree_name]}
                                                                    ></TextComp>
                                                                </View>





                                                            </View>

                                                            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5), }}>
                                                                <TextComp
                                                                    fontSize={fontSizes.verySmall}
                                                                    fontWeight={fontWeights.light}
                                                                    textColor={colors.TEXT__SECONDARY}
                                                                    value={`${t('amountPurchased')}(Kg): `}
                                                                ></TextComp>
                                                                <TextComp
                                                                    fontSize={fontSizes.verySmall}
                                                                    fontWeight={fontWeights.bold}
                                                                    textColor={colors.TEXT__SECONDARY}
                                                                    value={FormatNumber(item[KeyGetListPurchasingDetail.quantity] || 0)}
                                                                ></TextComp>
                                                            </View>
                                                            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                                                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                                                    <TextComp
                                                                        fontSize={fontSizes.verySmall}
                                                                        fontWeight={fontWeights.light}
                                                                        textColor={colors.TEXT__SECONDARY}
                                                                        value={`${t('total_')}(vnđ): `}
                                                                    ></TextComp>
                                                                    <TextComp
                                                                        fontSize={fontSizes.verySmall}
                                                                        fontWeight={fontWeights.bold}
                                                                        textColor={colors.TEXT__SECONDARY}
                                                                        value={FormatNumber(item[KeyGetListPurchasingDetail.price] || 0)}
                                                                    ></TextComp>
                                                                </View>
                                                                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                                                    <TextComp
                                                                        fontSize={fontSizes.verySmall}
                                                                        fontWeight={fontWeights.light}
                                                                        textColor={colors.TEXT__SECONDARY}
                                                                        value={`${t('total_money')}(vnđ): `}
                                                                    ></TextComp>
                                                                    <TextComp
                                                                        fontSize={fontSizes.verySmall}
                                                                        fontWeight={fontWeights.bold}
                                                                        textColor={colors.TEXT__SECONDARY}
                                                                        value={FormatNumber(item[KeyGetListPurchasingDetail.total] || 0)}
                                                                    ></TextComp>
                                                                </View>
                                                            </View>


                                                            <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                                                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                                                    <TextComp
                                                                        fontSize={fontSizes.verySmall}
                                                                        fontWeight={fontWeights.light}
                                                                        textColor={colors.TEXT__SECONDARY}
                                                                        value={`${t('create_name')}: `}
                                                                    ></TextComp>
                                                                    <TextComp
                                                                        fontSize={fontSizes.verySmall}
                                                                        fontWeight={fontWeights.bold}
                                                                        textColor={colors.TEXT__SECONDARY}
                                                                        value={item[KeyGetListPurchasingDetail.create_name]}
                                                                    ></TextComp>
                                                                </View>
                                                                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                                                    <TextComp
                                                                        fontSize={fontSizes.verySmall}
                                                                        fontWeight={fontWeights.light}
                                                                        textColor={colors.TEXT__SECONDARY}
                                                                        value={`${t('year')}: `}
                                                                    ></TextComp>
                                                                    <TextComp
                                                                        fontSize={fontSizes.verySmall}
                                                                        fontWeight={fontWeights.bold}
                                                                        textColor={colors.TEXT__SECONDARY}
                                                                        value={item[KeyGetListPurchasingDetail.year]}
                                                                    ></TextComp>
                                                                </View>
                                                            </View>
                                                            <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                                                <TextComp
                                                                    fontSize={fontSizes.verySmall}
                                                                    fontWeight={fontWeights.light}
                                                                    textColor={colors.TEXT__SECONDARY}
                                                                    numberOfLines={2}
                                                                    value={`${t('note')}: `}
                                                                ></TextComp>
                                                                <TextComp
                                                                    fontSize={fontSizes.verySmall}
                                                                    fontWeight={fontWeights.bold}
                                                                    textColor={colors.TEXT__SECONDARY}
                                                                    value={item[KeyGetListPurchasingDetail.note]}
                                                                ></TextComp>
                                                            </View>

                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </View >
                                </View>
                            </View>;
                        })}

                    </View>

                    <ActivityIndicator animating={loading} color={colors.BUTTON__PRIMARY} />

                    <View style={{ flex: 1, marginBottom: dimensions.vertical(10) }}>
                        <TextComp fontWeights={fontWeights.light}
                            textColor={colors.TEXT__SCREEN}
                            fontSize={fontSizes.verySmall} style={{ textAlign: 'center' }}
                            value={`~ ${order_detail.length}/${totalRow} ~`}
                        ></TextComp>
                    </View>

                </ScrollView>
                <View
                    style={{
                        padding: dimensions.moderate(10),
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    <ButtonComp
                        icon_name={'cancel'}
                        btnColor={color.LIGHT.BLUE_2}
                        buttonColor={color.LIGHT.BLUE_2}
                        mode="text"
                        onPress={() => {
                            clear();
                            closeModal(false);
                        }}
                        text={t('close')}
                        style={{ flex: 1, margin: dimensions.moderate(5) }}
                    />
                </View>
            </View>

        </Modal>
    );
}

const styles = StyleSheet.create({
    cardModal: {
        backgroundColor: color.LIGHT.WHITE,
        borderRadius: dimensions.moderate(10),
        overflow: "hidden",
        display: 'flex',
        flexDirection: 'column'
    },
    list_item_box: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        paddingBottom: dimensions.vertical(20),
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: color.LIGHT.SECOND__BG__COLOR,
    },
    remember_block: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        // marginTop: dimensions.moderate(5),
        marginBottom: dimensions.moderate(5),
    },
    text_link: {
        fontSize: fontSizes.normal,
        color: color.LIGHT.BLUE__COLOR,
        fontWeight: fontSizes.bold,
        paddingHorizontal: dimensions.moderate(5),
    },
    contentStyle: {
        margin: dimensions.indent,
        zIndex: 99999999999999999999999,
        // marginBottom: "90%",
        maxHeight: '100%',
        marginBottom: dimensions.vertical(150),
        marginTop: dimensions.vertical(150),
    },
    flex_row: {
        display: "flex",
        flexDirection: "row",
    },

    flex_col: {
        display: "flex",
        flexDirection: "column",
    },

    box_item_top: {
        width: "100%",
    },

    boxShadow: {
        borderTopWidth: 1,
        boxShadow: "0 0 10px rgba(0,0,0,.15)",
    },

    item_top_container: {
        display: "flex",
        flexDirection: "row",
    },

    item_top_left: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },

    item_box: {
        width: "100%",
        height: "auto",
        maxHeight: dimensions.moderate(140),
    },

    item_box_touchable: {
        height: "100%",
        padding: dimensions.moderate(10),
        display: "flex",
        position: "relative",
        borderTopWidth: dimensions.vertical(2),
    },
});
