import React, {
    useContext,
    useEffect,
    useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import { ActivityIndicator } from "react-native";
import { dimensions, fontSizes, fontWeights } from "../../../../../styles";
import {
    TextComp,
} from "../../../../../basic-components";
import { IO } from "../../../../../utils/sendRequest";
import moment from "moment";
import { StoreUserInfo } from "../../../../../store-user-info";
import { StoreContext } from "../../../../../store";
import { FormatNumber, serviceList } from "../../../../../utils";
import { ContractGetByIdKey } from "../../../../../utils/constant/key";
import RowList from "./row-detail/row-detail";


export default function DetailScreen({ navigation, route, id, category, notify }) {

    const { userInfo } = useContext(StoreUserInfo);
    const { colors } = useContext(StoreContext);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const [detail, setDetail] = useState({});
    const [list, setList] = useState([]);

    useEffect(() => {
        if (!category == 'contract') return;
        getDetail();
        resetForm();
    }, [category, id]);


    const resetForm = () => {
        setDetail({});
        setList([]);
    }

    //-----------get-list-word-diary-----------



    const getDetail = () => {
        if (loading) return;
        setLoading(true);
        IO.sendRequest(
            serviceList.get_by_id_contracts,
            [id],
            (requestInfo, result) => callBackDetail(requestInfo, result),
            true,
            timeOutFunct,
            15000,
        );
    };

    const callBackDetail = (requestInfo, result, list) => {
        let message = result["proc_message"];
        setLoading(false);
        if (+result["proc_status"] == 1) {
            // Xử lý thành công
            let data = result["proc_data"]["rows"];
            setDetail(data[0] || {});
            setList(data[0][ContractGetByIdKey.list_tree_quota] || []);
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

    //-----------------------REFRESH-----------------------

    const fetchData = () => {
        setTimeout(() => {
            getDetail();
            setRefreshing(false); // Kết thúc quá trình refresh
        }, 1000);
    };

    const handleRefresh = () => {
        setRefreshing(true); // Bắt đầu quá trình refresh
        fetchData();
    };

    return (
        <>
            <ScrollView style={{ marginTop: dimensions.vertical(10), flex: 1, marginBottom: dimensions.vertical(0) }}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                }
            >

                <View style={{ display: "flex", flexDirection: "column", }}>
                    <View>
                        <View style={styles.list_item_box}>
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

                                                    <View style={{ paddingBottom: dimensions.moderate(10), display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                        <TextComp
                                                            fontSize={fontSizes.medium}
                                                            textColor={colors.TEXT__PRIMARY}
                                                            fontWeight={fontWeights.bold}
                                                            value={t('contract')}
                                                        ></TextComp>
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
                                                            value={`${detail[ContractGetByIdKey.agency_code]} / ${detail[ContractGetByIdKey.agency_name]}`}
                                                        ></TextComp>
                                                    </View>

                                                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
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
                                                                value={detail[ContractGetByIdKey.farmer_name]}
                                                            ></TextComp>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                                            <TextComp
                                                                fontSize={fontSizes.verySmall}
                                                                fontWeight={fontWeights.light}
                                                                textColor={colors.TEXT__SECONDARY}
                                                                value={`${t('CCCD/CMNN')}: `}
                                                            ></TextComp>
                                                            <TextComp
                                                                fontSize={fontSizes.verySmall}
                                                                fontWeight={fontWeights.bold}
                                                                textColor={colors.TEXT__SECONDARY}
                                                                value={detail[ContractGetByIdKey.farmer_id_number]}
                                                            ></TextComp>
                                                        </View>
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
                                                                value={detail[ContractGetByIdKey.land_plot_code] || ''}
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
                                                                value={`${FormatNumber(detail[ContractGetByIdKey.land_plot_acreage_conversion], 10)}(${detail[ContractGetByIdKey.caculate_unit] === "1" ? "ha" : "m²"})`}
                                                            ></TextComp>
                                                        </View>
                                                    </View>
                                                    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                                        <TextComp
                                                            fontSize={fontSizes.verySmall}
                                                            fontWeight={fontWeights.light}
                                                            textColor={colors.TEXT__SECONDARY}
                                                            numberOfLines={1}
                                                            value={`${t('address')}: `}
                                                        ></TextComp>
                                                        <TextComp
                                                            fontSize={fontSizes.verySmall}
                                                            fontWeight={fontWeights.bold}
                                                            textColor={colors.TEXT__SECONDARY}
                                                            value={detail[ContractGetByIdKey.wards_path_with_type]}
                                                        ></TextComp>
                                                    </View>

                                                    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                                        <View style={{ padding: dimensions.moderate(5), display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                                            <TextComp
                                                                fontSize={fontSizes.verySmall}
                                                                textColor={colors.TEXT__PRIMARY}
                                                                fontWeight={fontWeights.bold}
                                                                value={t('infoContract')}
                                                            ></TextComp>
                                                        </View>
                                                        <View style={{ padding: dimensions.moderate(5), backgroundColor: colors.BG__PRIMARY, borderRadius: dimensions.moderate(5) }}>
                                                            <TextComp
                                                                fontSize={fontSizes.verySmall}
                                                                textColor={colors.TEXT__WHITE}
                                                                fontWeight={fontWeights.bold}
                                                                value={`${detail[ContractGetByIdKey.contract_no] || ''} / ${detail[ContractGetByIdKey.code] || ''}`}
                                                            ></TextComp>
                                                        </View>


                                                    </View>
                                                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>

                                                    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                                        <TextComp
                                                            fontSize={fontSizes.verySmall}
                                                            fontWeight={fontWeights.light}
                                                            textColor={colors.TEXT__SECONDARY}
                                                            value={`${t('Thuộc tờ bản đồ số')}: `}
                                                        ></TextComp>
                                                        <TextComp
                                                            fontSize={fontSizes.verySmall}
                                                            fontWeight={fontWeights.bold}
                                                            textColor={colors.TEXT__SECONDARY}
                                                            value={`${detail[ContractGetByIdKey.map_number] || ''}`}
                                                        ></TextComp>
                                                    </View>
                                                    <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                                        <TextComp
                                                            fontSize={fontSizes.verySmall}
                                                            fontWeight={fontWeights.light}
                                                            textColor={colors.TEXT__SECONDARY}
                                                            value={`${t('Số thửa')}: `}
                                                        ></TextComp>
                                                        <TextComp
                                                            fontSize={fontSizes.verySmall}
                                                            fontWeight={fontWeights.bold}
                                                            textColor={colors.TEXT__SECONDARY}
                                                            value={`${detail[ContractGetByIdKey.land_number] || ''}`}
                                                        ></TextComp>
                                                    </View>
                                                    </View>
                                                    <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>

                                                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                                            <TextComp
                                                                fontSize={fontSizes.verySmall}
                                                                fontWeight={fontWeights.light}
                                                                textColor={colors.TEXT__SECONDARY}
                                                                value={`${t('Số lô')}: `}
                                                            ></TextComp>
                                                            <TextComp
                                                                fontSize={fontSizes.verySmall}
                                                                fontWeight={fontWeights.bold}
                                                                textColor={colors.TEXT__SECONDARY}
                                                                value={`${detail[ContractGetByIdKey.lot_number]}`}
                                                            ></TextComp>
                                                        </View>
                                                        <View style={{ display: 'flex', flexDirection: 'row', marginBottom: dimensions.vertical(5) }}>
                                                            <TextComp
                                                                fontSize={fontSizes.verySmall}
                                                                fontWeight={fontWeights.light}
                                                                textColor={colors.TEXT__SECONDARY}
                                                                value={`${t('acreageContracting')}: `}
                                                            ></TextComp>
                                                            <TextComp
                                                                fontSize={fontSizes.verySmall}
                                                                fontWeight={fontWeights.bold}
                                                                textColor={colors.TEXT__SECONDARY}
                                                                value={`${FormatNumber(detail[ContractGetByIdKey.acreage],10)}(${detail[ContractGetByIdKey.caculate_unit] === "1" ? "ha" : "m²"})`}
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
                                                                value={`${moment(detail[ContractGetByIdKey.register_date], 'YYYYMMDD').format('DD/MM/YYYY')}`}
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
                                                                value={`${moment(detail[ContractGetByIdKey.exp_date], 'YYYYMMDD').format('DD/MM/YYYY')}`}
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
                                                            value={detail[ContractGetByIdKey.note]}
                                                        ></TextComp>
                                                    </View>

                                                </View>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View >

                        </View>
                    </View>
                </View>
                <ActivityIndicator animating={loading} color={colors.BUTTON__PRIMARY} />

                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <View style={{ padding: dimensions.moderate(5), display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <TextComp
                            fontSize={fontSizes.medium}
                            textColor={colors.TEXT__PRIMARY}
                            fontWeight={fontWeights.bold}
                            value={t('contractingAmount')}
                        ></TextComp>
                    </View>
                </View>
                <View style={styles.list_item_box}>
                    {(list || []).map((item, index) => {
                        return <View key={index}>
                            <TouchableOpacity>
                                <RowList item={item}></RowList>
                            </TouchableOpacity>
                        </View>;
                    })}

                </View>

            </ScrollView>
        </>


    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
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
    container_list_diary: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flex: 1,
    },

    container_info: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: dimensions.vertical(5)
    },

    item_box: {
        width: "100%",
        flex: 1,
        elevation: 1,
        borderRadius: dimensions.moderate(10),
        margin: dimensions.moderate(10),
        padding: dimensions.moderate(10),
        boxShadow: "0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)",
    },

    item_box_touchable: {
        borderRadius: dimensions.moderate(20)
    },

    item_box_icon: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },

    top_bar: {
        flexDirection: "row",
        position: "relative",
        overflow: "visible",
        display: 'flex',
        flexDirection: 'row',
        padding: dimensions.vertical(10),
        borderBottomEndRadius: dimensions.moderate(20),
        borderBottomStartRadius: dimensions.moderate(20),
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
        height: "auto"
    },

    item_box_touchable: {
        height: "100%",
        padding: dimensions.moderate(10),
        display: "flex",
        position: "relative"
    },

    container_info: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: dimensions.vertical(5),
        position: "relative",
    },

    list_item_box: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        paddingBottom: dimensions.vertical(20),
    },

});
