import React, { useContext, useEffect, useRef, useState } from "react";
import { InputField, ButtonComp, TextComp, DatePicker } from "../../basic-components";
import { dimensions, fontSizes, color, fontWeights } from "../../styles";
import { useTranslation } from "react-i18next";
import { glb_sv, screens, serviceList } from "../../utils";
import { Modal, IconButton, Divider } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import moment from "moment";
import { AgencyKeyGetList } from "../../utils/constant/key";
import { IO } from "../../utils/sendRequest";
import { StoreContext } from "../../store";

export function ModalSelectAgencySend({
    visibleModal,
    closeModal,
    farmer_id,
    notify
}) {
    const { t } = useTranslation();
    const [list_item, setList] = useState([]);
    const [totalRow, setTotal] = useState(0);
    const { colors } = useContext(StoreContext);
    useEffect(() => {
        getListAgency(99999999999999999,[]);
    }, [visibleModal]);

    const confirm = (item) => {
        closeModal(true,item || {});
    };



    const getListAgency = (lastId, list) => {
        if(!farmer_id) return;
        IO.sendRequest(
            serviceList.get_list_by_farmer_id_agency,
            [
                '%', //search
                farmer_id//type
            ],
            (requestInfo, result) => callBackGetList(requestInfo, result, list),
            true,
            timeOutFunct,
            15000
        );
    };


    const callBackGetList = (requestInfo, result, list) => {
        let message = result["proc_message"];
        if (+result["proc_status"] == 1) {
            // Xử lý thành công
            let data = result["proc_data"]["rows"];
            console.log('kai',data);
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
                            <TextComp
                                value={t('sendAgency')}

                                style={{ marginLeft: dimensions.indent }}
                                textColor={color.LIGHT.BLUE_2}
                                fontSize={fontSizes.normal}
                                fontWeight={fontWeights.normal}
                            />

                        </View>

                    </View>
                </View>
                <View>

                    {list_item.map((item, index) => {
                        return <View key={index} style={{
                            padding: dimensions.moderate(10), borderTopWidth: 1, borderColor: color.LIGHT.FOURTH__BG__COLOR
                        }}>
                            <ButtonComp
                                buttonColor={color.LIGHT.WHITE}
                                textColor={color.LIGHT.BLACK}
                                icon_name={""}
                                mode="text"
                                onPress={() => {
                                    confirm(item);
                                }}
                                text={`${item[AgencyKeyGetList.name]}` }
                            />
                        </View>;
                    })}

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
