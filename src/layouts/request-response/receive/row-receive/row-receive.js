import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet } from "react-native";
import { dimensions, fontSizes, fontWeights } from "../../../../styles";
import { IconComp, TextComp } from "../../../../basic-components";
import moment from "moment";
import { StoreContext } from "../../../../store";
import { KeyGetListRequest } from "../../../../utils/constant/key";
import { FormatNumber } from "../../../../utils";



export default function RowReceive({ item }) {
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
                            <View style={{ marginBottom: dimensions.moderate(3), display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
                                <View>
                                    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                        <View >
                                            <TextComp
                                                numberOfLines={2}
                                                fontSize={fontSizes.medium}
                                                textColor={colors.TEXT__SUCCESS}
                                                fontWeight={fontWeights.bold}
                                                value={(item[KeyGetListRequest.title] || '')}
                                            ></TextComp>
                                        </View>

                                        {/* <View style={{ padding: dimensions.moderate(5), display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            textColor={colors.TEXT__PRIMARY}
                                            fontWeight={fontWeights.bold}
                                            value={item[KeyGetListRequest.farmer_name]}
                                        ></TextComp>
                                    </View> */}





                                    </View>
                                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                            <TextComp
                                                fontSize={fontSizes.verySmall}
                                                fontWeight={fontWeights.light}
                                                textColor={colors.TEXT__SECONDARY}
                                                value={`${t('Người gửi')}: `}
                                            ></TextComp>
                                            <TextComp
                                                fontSize={fontSizes.verySmall}
                                                fontWeight={fontWeights.bold}
                                                textColor={colors.TEXT__SECONDARY}
                                                value={item[KeyGetListRequest.create_user_name]}
                                            ></TextComp>
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>

                                            <TextComp
                                                fontSize={fontSizes.verySmall}
                                                fontWeight={fontWeights.bold}
                                                textColor={colors.TEXT__SECONDARY}
                                                value={`${moment(item[KeyGetListRequest.create_time], 'YYYYMMDDHHmmss').format('DD/MM/YYYY HH:mm')}`}
                                            ></TextComp>
                                        </View>
                                    </View>

                                    <View style={{ display: 'flex', flexDirection: 'column', marginBottom: dimensions.vertical(5) }}>
                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.medium}
                                            numberOfLines={2}
                                            textColor={colors.TEXT__SECONDARY}
                                            value={item[KeyGetListRequest.content]}
                                        ></TextComp>
                                    </View>
                                </View>


                                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    {
                                        item[KeyGetListRequest.list_file].length > 0 && <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                            <IconComp style={{ margin: 0, padding: 0 }} iconSize={fontSizes.small} icon_nm={'file'} iconColor={colors.BUTTON__PRIMARY}></IconComp>

                                            <TextComp
                                                fontSize={fontSizes.verySmall}
                                                fontWeight={fontWeights.medium}
                                                numberOfLines={2}
                                                textColor={colors.TEXT__PRIMARY}
                                                value={'File: ' + item[KeyGetListRequest.list_file].length || 0}
                                            ></TextComp>

                                        </View>
                                    }

                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <IconComp style={{ margin: 0, padding: 0 }} iconSize={fontSizes.small} icon_nm={'comment'} iconColor={colors.BUTTON__SUCCESS}></IconComp>

                                        <TextComp
                                            fontSize={fontSizes.verySmall}
                                            fontWeight={fontWeights.medium}
                                            numberOfLines={2}
                                            textColor={colors.TEXT__PRIMARY}
                                            value={FormatNumber(item[KeyGetListRequest.total_feedback] || 0, 0, '', 0, 'short')}
                                        ></TextComp>

                                    </View>


                                </View>

                            </View>
                        </View>
                    </View>
                </View>
            </View>
        </View >

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




