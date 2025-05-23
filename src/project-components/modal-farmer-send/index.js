import React, { useContext, useEffect, useRef, useState } from "react";
import { InputField, ButtonComp, TextComp, DatePicker } from "../../basic-components";
import { dimensions, fontSizes, color, fontWeights } from "../../styles";
import { useTranslation } from "react-i18next";
import { glb_sv, screens, serviceList } from "../../utils";
import { Modal, IconButton, Divider } from "react-native-paper";
import { View, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import moment from "moment";
import { AgencyKeyGetList, KeyGetListFarmer } from "../../utils/constant/key";
import { IO } from "../../utils/sendRequest";
import { StoreContext } from "../../store";
import { TouchableOpacity } from "react-native";

export function ModalFarmerSend({
    visibleModal,
    closeModal,
    agency_id,
    id,
    notify
}) {
    const { t } = useTranslation();
    const [list_item, setList] = useState([]);
    const [totalRow, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState('not');//not , sended
    const { colors } = useContext(StoreContext);
    useEffect(() => {
        getListNot(99999999999999999, []);
    }, [visibleModal]);



    const confirm = (item) => {
        closeModal(true, item || {});
    };


    const getListSended = (lastId, list) => {
        if (!id) return;
        setLoading(true);
        IO.sendRequest(
            serviceList.get_list_fm_request_user,
            [
                lastId,
                id,
                '%', //search
            ],
            (requestInfo, result) => callBackGetListSended(requestInfo, result, list),
            true,
            timeOutFunct,
            15000
        );
    };


    const callBackGetListSended = (requestInfo, result, list) => {
        let message = result["proc_message"];
        setLoading(false);
        if (+result["proc_status"] == 1) {
            // Xử lý thành công
            let data = result["proc_data"]["rows"];
            console.log('kai', data);
            setTotal(result["proc_data"]["rowTotal"] || 0);
            setList(list.concat(data || []));
        } else {
            notify({
                show: true,
                titleModal: message,
                iconLeft: "",
                color: colors.TEXT__DANGER,
            })
        }
    };


    const deleteSend = ( farmer_id, list) => {
        if (!id) return;
        setLoading(true);
        IO.sendRequest(
            serviceList.delete_fm_request_user,
            [
                id,
                farmer_id
            ],
            (requestInfo, result) => callBackDeleteSend(requestInfo, result,farmer_id, list),
            true,
            timeOutFunct,
            15000
        );
    };

    const insertSend = ( farmer_id, list) => {
        if (!id) return;
        setLoading(true);
        IO.sendRequest(
            serviceList.insert_fm_request_user,
            [
                id,
                farmer_id
            ],
            (requestInfo, result) => callBackDeleteSend(requestInfo, result,farmer_id, list),
            true,
            timeOutFunct,
            15000
        );
    };


    const callBackDeleteSend = (requestInfo, result,farmer_id, list) => {
        let message = result["proc_message"];
        setLoading(false);
        if (+result["proc_status"] == 1) {
            // Xử lý thành công
            let data = result["proc_data"]["rows"];
            setTotal(totalRow-1);
            setList(list.filter((item)=>{
                return item[KeyGetListFarmer.id] !=farmer_id
            }));
            notify({
                show: true,
                titleModal: message,
                iconLeft: "",
                color: colors.GREEN_1,
            })
        } else {
            notify({
                show: true,
                titleModal: message,
                iconLeft: "",
                color: colors.TEXT__DANGER,
            })
        }
    };



    
    const getListNot = (lastId, list) => {
        if (!id) return;
        setLoading(true);
        IO.sendRequest(
            serviceList.get_list_farmer_not_send_fm_request_user,
            [
                lastId,
                id,
                '%', //search
            ],
            (requestInfo, result) => callBackGetListNot(requestInfo, result, list),
            true,
            timeOutFunct,
            15000
        );
    };


    const callBackGetListNot = (requestInfo, result, list) => {
        let message = result["proc_message"];
        setLoading(false);
        if (+result["proc_status"] == 1) {
            // Xử lý thành công
            let data = result["proc_data"]["rows"];
            console.log('kai', data);
            setTotal(result["proc_data"]["rowTotal"] || 0);
            setList(list.concat(data || []));
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
    return (
        <Modal
            visible={visibleModal}
            onDismiss={() => closeModal(false)}
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
                                padding: dimensions.moderate(15)
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => {
                                    if (category == 'not') return;
                                    setCategory('not');
                                    setList([]);
                                    getListNot(999999999999, [])
                                }}
                            >
                                <TextComp
                                    value={t('farmerNotSend')}

                                    style={{ marginLeft: dimensions.indent }}
                                    textColor={category == 'not' ? color.LIGHT.BLUE_2 : color.LIGHT.BLUE_1}
                                    fontSize={fontSizes.normal}
                                    fontWeight={fontWeights.bold}
                                />

                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    if (category == 'sended') return;
                                    setCategory('sended');
                                    setList([]);
                                    getListSended(999999999999, [])
                                }}
                            >
                                <TextComp
                                    value={t('farmerSended')}
                                    style={{ marginLeft: dimensions.indent }}
                                    textColor={category == 'sended' ? color.LIGHT.BLUE_2 : color.LIGHT.BLUE_1}
                                    fontSize={fontSizes.normal}
                                    fontWeight={fontWeights.bold}
                                />
                            </TouchableOpacity>


                        </View>

                    </View>
                </View>
                <ScrollView>

                    {list_item.map((item, index) => {
                        return <View key={index} style={{
                            padding: dimensions.moderate(10), borderTopWidth: 1, borderColor: color.LIGHT.FOURTH__BG__COLOR
                        }}>
                            <ButtonComp
                                buttonColor={color.LIGHT.WHITE}
                                textColor={category=='not'?color.LIGHT.BLACK: color.LIGHT.GREEN_1}
                                icon_name={""}
                                mode="text"
                                onPress={() => {
                                    if(category=='not'){
                                        insertSend(item[KeyGetListFarmer.id], list_item);
                                    }else{
                                        deleteSend(item[KeyGetListFarmer.id], list_item);
                                    }
                                }}
                                text={`${item[KeyGetListFarmer.name]}`}
                            />
                        </View>;
                    })}
                    <ActivityIndicator animating={loading} color={colors.BUTTON__PRIMARY} />
                    <View style={{ flex: 1, marginBottom: dimensions.vertical(10) }}>
                        <TextComp fontWeights={fontWeights.light}
                            textColor={colors.TEXT__SCREEN}
                            fontSize={fontSizes.verySmall} style={{ textAlign: 'center' }}
                            value={`~ ${list_item.length}/${totalRow} ~`}
                        ></TextComp>
                    </View>
                </ScrollView>

            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    cardModal: {
        backgroundColor: color.LIGHT.WHITE,
        borderRadius: dimensions.moderate(10),
        overflow: "hidden",
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
    },
});
