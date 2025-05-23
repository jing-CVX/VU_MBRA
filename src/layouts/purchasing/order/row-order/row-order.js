import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { dimensions, fontSizes, fontWeights } from "../../../../styles";
import { TextComp } from "../../../../basic-components";
import moment from "moment";
import { StoreContext } from "../../../../store";
import { FormatNumber } from "../../../../utils";


const RowOrder=({ item })=> {
    const { t } = useTranslation();
    const { colors } = useContext(StoreContext);
    return (
        <View style={styles.item_box}>
            <View style={[styles.item_box_touchable, { borderColor: colors.BORDER__ROW }]} activeOpacity={0.8}>
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
                                            value={item[KeyGetListPurchasing.code] || ''}
                                        ></TextComp>
                                    </View>

                                    <View style={{ padding: dimensions.moderate(5), display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            textColor={colors.TEXT__PRIMARY}
                                            fontWeight={fontWeights.bold}
                                            value={item[KeyGetListPurchasing.farmer_name]}
                                        ></TextComp>
                                    </View>





                                </View>

                                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5), }}>
                                    <TextComp
                                        fontSize={fontSizes.verySmall}
                                        fontWeight={fontWeights.light}
                                        textColor={colors.TEXT__SECONDARY}
                                        value={`${t('agency')}: `}
                                    ></TextComp>
                                    <TextComp
                                        fontSize={fontSizes.verySmall}
                                        fontWeight={fontWeights.bold}
                                        textColor={colors.TEXT__SECONDARY}
                                        value={item[KeyGetListPurchasing.agency_name]}
                                    ></TextComp>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5), }}>
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
                                        value={FormatNumber(item[KeyGetListPurchasing.total] || 0)}
                                    ></TextComp>
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
                                            value={item[KeyGetListPurchasing.create_name]}
                                        ></TextComp>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.light}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={`${t('purchasingDate')}: `}
                                        ></TextComp>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.bold}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={`${moment(item[KeyGetListPurchasing.date], 'YYYYMMDD').format('DD/MM/YYYY')}`}
                                        ></TextComp>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                    <TextComp
                                        fontSize={fontSizes.verySmall}
                                        fontWeight={fontWeights.light}
                                        textColor={colors.TEXT__SECONDARY}
                                        numberOfLines={1}
                                        value={`${t('note')}: `}
                                    ></TextComp>
                                    <TextComp
                                        fontSize={fontSizes.verySmall}
                                        fontWeight={fontWeights.bold}
                                        textColor={colors.TEXT__SECONDARY}
                                        value={item[KeyGetListPurchasing.note]}
                                    ></TextComp>
                                </View>

                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View >

    );
}

export default React.memo(RowOrder)

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


export const KeyGetListPurchasing = {
    id: 'o_1',
    code: 'o_2',
    date: 'o_3',
    note: 'o_4',
    agency_id: 'o_5',
    agency_code: 'o_6',
    agency_name: 'o_7',
    farmer_id: 'o_8',
    farmer_code: 'o_9',
    farmer_name: 'o_10',
    create_time: 'o_11',
    create_id: 'o_12',
    update_time: 'o_13',
    update_id: 'o_14',
    create_name: 'o_15',
    total:'o_16'
}

