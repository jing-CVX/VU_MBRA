import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { dimensions, fontSizes, fontWeights } from "../../../styles";
import { TextComp } from "../../../basic-components";
import moment from "moment";
import { StoreContext } from "../../../store";



export default function RowEmployee({ item }) {
    const { t } = useTranslation();
    const { colors } = useContext(StoreContext);
    return (
        <View style={styles.item_box}>
            <View style={[styles.item_box_touchable,{borderColor: colors.BORDER__ROW}]} activeOpacity={0.8}>
                <View style={styles.item_top_container}>
                    <View style={styles.item_top_left}>
                        <View
                            style={[
                                styles.box_item_top,
                                {

                                },
                            ]}
                        >
                            <View style={{ marginBottom: dimensions.moderate(3) }}>
                                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                    <View style={{ padding: dimensions.moderate(5), backgroundColor: colors.BG__PRIMARY, borderRadius: dimensions.moderate(5) }}>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            textColor={colors.TEXT__WHITE}
                                            fontWeight={fontWeights.bold}
                                            value={'NV-123456'}
                                        ></TextComp>
                                    </View>

                                    <View style={{ padding: dimensions.moderate(5), display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            textColor={colors.TEXT__PRIMARY}
                                            fontWeight={fontWeights.bold}
                                            value={`${'Nguyễn Công Vũ'}`}
                                        ></TextComp>
                                    </View>





                                </View>

                                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                    <TextComp
                                        fontSize={fontSizes.verySmall}
                                        fontWeight={fontWeights.light}
                                        textColor={colors.TEXT__SECONDARY}
                                        value={`${t('Phone')}: `}
                                    ></TextComp>
                                    <TextComp
                                        fontSize={fontSizes.verySmall}
                                        fontWeight={fontWeights.bold}
                                        textColor={colors.TEXT__SECONDARY}
                                        value={'0921183xxx'}
                                    ></TextComp>
                                </View>

                                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                    <TextComp
                                        fontSize={fontSizes.verySmall}
                                        fontWeight={fontWeights.light}
                                        textColor={colors.TEXT__SECONDARY}
                                        value={`${t('Chức vụ')}: `}
                                    ></TextComp>
                                    <TextComp
                                        fontSize={fontSizes.verySmall}
                                        fontWeight={fontWeights.bold}
                                        textColor={colors.TEXT__SECONDARY}
                                        value={'Nhân viên'}
                                    ></TextComp>
                                 




                                </View>

                                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                    <TextComp
                                        fontSize={fontSizes.verySmall}
                                        fontWeight={fontWeights.light}
                                        textColor={colors.TEXT__SECONDARY}
                                        value={`${t('time')}: `}
                                    ></TextComp>
                                    <TextComp
                                        fontSize={fontSizes.verySmall}
                                        fontWeight={fontWeights.bold}
                                        textColor={colors.TEXT__SECONDARY}
                                        value={`${moment().format('DD/MM/YYYY HH:mm:ss')}`}
                                    ></TextComp>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
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
        maxHeight: dimensions.moderate(120),
    },

    item_box_touchable: {
        height: "100%",
        padding: dimensions.moderate(10),
        display: "flex",
        position: "relative",
        borderTopWidth: dimensions.vertical(2),
    },
});


export const KeyWorkDiaryList = {
    id: 'o_1',
    orderDetailId: 'o_2',
    drawCode: 'o_3',
    orderDetailCode: 'o_4',
    orderId: 'o_5',
    orderCode: 'o_6',
    processId: 'o_7',
    processAmount: 'o_8',
    processAmountBackup: 'o_9',
    processClassId: 'o_10',
    processClassCode: 'o_11',
    processClassName: 'o_12',
    personnelId: 'o_13',
    personnelCode: 'o_14',
    personnelName: 'o_15',
    teamId: 'o_16',
    teamCode: 'o_17',
    teamName: 'o_18',
    startTime: 'o_19',
    finishTime: 'o_20',
    minsFinish: 'o_21',
    amountFinish: 'o_22',
    productionProcessStepTimeStatus: 'o_23',
    productionProcessStepTimeStatusTitle: 'o_24',
    stepCode: 'o_25',
    stepName: 'o_26',
    deliveryDate: 'o_27',
    estimateQuantity: 'o_28',
    machineryCode: 'o_29',
    minsCpgc: 'o_30',
    totalMinsFinish: 'o_31'
}

