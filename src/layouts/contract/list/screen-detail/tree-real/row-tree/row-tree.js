import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { dimensions, fontSizes, fontWeights } from "../../../../../../styles";
import { TextComp } from "../../../../../../basic-components";
import moment from "moment";
import { StoreContext } from "../../../../../../store";
import { KeyGetListRealisticCrops } from "../../../../../../utils/constant/key";
import { FormatNumber } from "../../../../../../utils";

export default function RowTree({ item }) {
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


                                    <View style={{ padding: dimensions.moderate(5), display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            textColor={colors.TEXT__PRIMARY}
                                            fontWeight={fontWeights.bold}
                                            value={item[KeyGetListRealisticCrops.tree_nm]}
                                        ></TextComp>
                                    </View>



                                </View>





                                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>

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
                                            value={`${FormatNumber(item[KeyGetListRealisticCrops.acreage],10)}(${item[KeyGetListRealisticCrops.caculate_unit] === "1" ? "ha" : "m²"})`}
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
                                            value={`${item[KeyGetListRealisticCrops.year]}`}
                                        ></TextComp>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.light}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={`${t('totalTree')}: `}
                                        ></TextComp>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.bold}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={`${FormatNumber(item[KeyGetListRealisticCrops.total_tree],10)}`}
                                        ></TextComp>
                                    </View>

                                </View>

                                  <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.light}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={`${t('contracting')}(Kg): `}
                                        ></TextComp>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.bold}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={`${FormatNumber(item[KeyGetListRealisticCrops.estimated_output] || 0,10)}`}
                                        ></TextComp>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.light}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={`${t('Sản lượng vườn cây')}(Kg): `}
                                        ></TextComp>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.bold}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={`${FormatNumber(item[KeyGetListRealisticCrops.expected_output_theory] || 0,10)}`}
                                        ></TextComp>
                                    </View>
                                </View>

                                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.light}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={`${t('note')}: `}
                                        ></TextComp>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.bold}
                                            textColor={colors.TEXT__PRIMARY}
                                            value={item[KeyGetListRealisticCrops.note] || ''}
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


