import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { dimensions, fontSizes, fontWeights } from "../../../../styles";
import { TextComp } from "../../../../basic-components";
import moment from "moment";
import { StoreContext } from "../../../../store";
import { FormatNumber } from "../../../../utils";
import { ContractGetListKey } from "../../../../utils/constant/key";



const RowListContract = ({ item }) =>{
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
                                            value={item[ContractGetListKey.contract_no] || ''}
                                        ></TextComp>
                                    </View>

                                    <View style={{ padding: dimensions.moderate(5), display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            textColor={colors.TEXT__PRIMARY}
                                            fontWeight={fontWeights.bold}
                                            value={item[ContractGetListKey.code]}
                                        ></TextComp>
                                    </View>





                                </View>

                                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5), }}>
                                    <TextComp
                                        fontSize={fontSizes.verySmall}
                                        fontWeight={fontWeights.light}
                                        textColor={colors.TEXT__SECONDARY}
                                        value={`${t('farmer')}: `}
                                    ></TextComp>
                                    <TextComp
                                        fontSize={fontSizes.verySmall}
                                        fontWeight={fontWeights.bold}
                                        textColor={colors.TEXT__SECONDARY}
                                        value={item[ContractGetListKey.farmer_name]}
                                    ></TextComp>
                                </View>
                         



                                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5), }}>
                                    <TextComp
                                        fontSize={fontSizes.verySmall}
                                        fontWeight={fontWeights.light}
                                        textColor={colors.TEXT__SECONDARY}
                                        value={`${t('Số giấy CNQSDĐ')}: `}
                                    ></TextComp>
                                    <TextComp
                                        fontSize={fontSizes.verySmall}
                                        fontWeight={fontWeights.bold}
                                        textColor={colors.TEXT__SECONDARY}
                                        value={item[ContractGetListKey.land_plot_code] || ''}
                                    ></TextComp>
                                </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.light}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={`${t('acreage')}: `}
                                        ></TextComp>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.bold}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={`${FormatNumber(item[ContractGetListKey.acreage], 10)}(${item[ContractGetListKey.caculate_unit] === "1" ? "ha" : "m²"})`}
                                        ></TextComp>
                                    </View>
                                </View>



                                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.light}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={`${t('dateRegis')}: `}
                                        ></TextComp>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.bold}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={`${moment(item[ContractGetListKey.register_date], 'YYYYMMDD').format('DD/MM/YYYY')}`}
                                        ></TextComp>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.light}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={`${t('dateEx')}: `}
                                        ></TextComp>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.bold}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={`${moment(item[ContractGetListKey.exp_date], 'YYYYMMDD').format('DD/MM/YYYY')}`}
                                        ></TextComp>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                    <TextComp
                                        fontSize={fontSizes.verySmall}
                                        fontWeight={fontWeights.bold}
                                        textColor={colors.TEXT__SECONDARY}
                                        value={item[ContractGetListKey.company_name]}
                                    ></TextComp>
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
                                        value={item[ContractGetListKey.note]}
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

export default React.memo(RowListContract);


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
        maxHeight: dimensions.vertical(185),
    },

    item_box_touchable: {
        height: "100%",
        padding: dimensions.moderate(10),
        display: "flex",
        position: "relative",
        borderTopWidth: dimensions.vertical(2),
    },
});



