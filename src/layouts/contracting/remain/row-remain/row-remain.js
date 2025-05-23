import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { dimensions, fontSizes, fontWeights } from "../../../../styles";
import { TextComp } from "../../../../basic-components";
import moment from "moment";
import { StoreContext } from "../../../../store";
import { FormatNumber } from "../../../../utils";
import { KeyGetListPurchaseAnnualQuota } from "../../../../utils/constant/key";



const RowRemain=({ item })=> {
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
                                            value={item[KeyGetListPurchaseAnnualQuota.contract_no] || ''}
                                        ></TextComp>
                                    </View>

                                    <View style={{ padding: dimensions.moderate(5), display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            textColor={colors.TEXT__PRIMARY}
                                            fontWeight={fontWeights.bold}
                                            value={item[KeyGetListPurchaseAnnualQuota.farmer_name]}
                                        ></TextComp>
                                    </View>
                                </View>

                                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5), justifyContent: 'space-between', }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.light}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={`${t('tree')}: `}
                                        ></TextComp>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.bold}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={item[KeyGetListPurchaseAnnualQuota.config_tree_name]}
                                        ></TextComp>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.light}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={`${t('amountContract')}(Kg): `}
                                        ></TextComp>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.bold}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={FormatNumber(item[KeyGetListPurchaseAnnualQuota.amount] || 0,10)}
                                        ></TextComp>
                                    </View>
                                 
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5), justifyContent: 'space-between', }}>
                                   
                                <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.light}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={`${t('contracted')}(Kg): `}
                                        ></TextComp>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.bold}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={FormatNumber(item[KeyGetListPurchaseAnnualQuota.amount_contracted] || 0,10)}
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
                                            value={item[KeyGetListPurchaseAnnualQuota.year]}
                                        ></TextComp>
                                    </View>
                                </View>

                                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>

                                  
                                    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
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
                                            value={FormatNumber(item[KeyGetListPurchaseAnnualQuota.amount_purchased] || 0,10)}
                                        ></TextComp>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.light}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={`${t('amountCanBuy')}(Kg): `}
                                        ></TextComp>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.bold}
                                            textColor={colors.TEXT__PRIMARY}
                                            value={FormatNumber(item[KeyGetListPurchaseAnnualQuota.amount_can_buy] || 0,10)}
                                        ></TextComp>
                                    </View>
                                  
                                </View>


                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View>

    );
}

export default React.memo(RowRemain)

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


