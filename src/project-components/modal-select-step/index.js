import React, { useEffect, useRef, useState } from "react";
import { InputField, ButtonComp, TextComp, DatePicker } from "../../basic-components";
import { dimensions, fontSizes, color, fontWeights } from "../../styles";
import { useTranslation } from "react-i18next";
import { glb_sv, screens } from "../../utils";
import { Modal, IconButton, Divider } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import moment from "moment";
import { KeysProcessStep } from "../../utils/constant/key";

export function ModalSelectStep({
    visibleModal,
    closeModal,
    _list_step,
    focus,
    title,
    btnColor,
    btnIcon,
    btnText,
    date
}) {
    const { t } = useTranslation();

    // useEffect(() => {
    //     if (visibleModal) {
    //         setTimeout(() => {

    //         }, 200);
    //     }
    // }, [visibleModal]);

    const confirm = (item) => {
        //   setFreshing(true);
        closeModal(true,item || {});
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
                                value={t('select_step')}

                                style={{ marginLeft: dimensions.indent }}
                                textColor={color.LIGHT.BLUE_2}
                                fontSize={fontSizes.normal}
                                fontWeight={fontWeights.normal}
                            />

                        </View>

                    </View>
                </View>
                <View>

                    {_list_step.map((item, index) => {
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
                                text={`${item[KeysProcessStep.stepCode]} (${ t("amountRemain")}: ${item[KeysProcessStep.amountRemain]})` }
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
