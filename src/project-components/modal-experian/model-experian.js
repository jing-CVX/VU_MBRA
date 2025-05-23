import React, { useEffect, useRef, useState } from "react";
import { ButtonComp, TextComp } from "../../basic-components";
import { dimensions, fontSizes, color, fontWeights } from "../../styles";
import { useTranslation } from "react-i18next";
import { Modal } from "react-native-paper";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import { AttachmentType, KeyGetListProductionExperience, keyAttachment } from "../../utils/constant/key";
import { WebView } from 'react-native-webview';
import { TouchableOpacity } from "react-native-gesture-handler";
import { serviceList } from "../../utils";
import { IO } from "../../utils/sendRequest";
import { environment } from "../../environments/environment.prod";
import { Linking } from 'react-native';
import ImageView from "react-native-image-viewing";


export function ModalExperian({
    visibleModal,
    closeModal,
    _list_experian,
    focus,
    title,
    btnColor,
    btnIcon,
    btnText,
    date
}) {
    const { t } = useTranslation();
    const [indexContent, setIndexContent] = useState(-1);
    const [lists, setLists] = useState([]);
    const [visible, setIsVisible] = useState(false);
    const [listView, setListView] = useState([]);
    const [indexView, setIndexView] = useState(0);

    useEffect(() => {
        if (visibleModal) {
            setIndexContent(-1);
            setLists(_list_experian);
            setIsVisible(false);
            setListView([]);
            setIndexView(0)
        }
        setIndexContent(-1);
        setLists(_list_experian);
    }, [_list_experian]);

    const getListAttachment = (id, index) => {

        IO.sendRequest(
            serviceList.get_list_attachments,
            [100000000000000000, id, AttachmentType.production_experience],
            (requestInfo, result) => callBackGetListAttachment(requestInfo, result, index),
            true,
            timeOutFunct,
            15000,
            "get_list_attachments"
        );

    };

    const callBackGetListAttachment = (requestInfo, result, index) => {

        if (+result["proc_status"] == 1) {
            let data = result["proc_data"]["rows"];
            setLists(lists.map((item, i) => {
                if (index != i) return item;
                return {
                    ...item,
                    attachments: data.filter((file) => {
                        return !['jpg', 'png', 'jpeg'].includes(file[keyAttachment.extension])
                    }),
                    attachmentsImage: data.filter((file) => {
                        return ['jpg', 'png', 'jpeg'].includes(file[keyAttachment.extension])
                    }),
                    isGetAttachments: true
                }
            }))
        }
    };

    const timeOutFunct = (reqInfo) => {

    };

    const openBrowser = (url) => {
        Linking.openURL(url);
    }




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
                                value={t('experian_production')}
                                style={{ marginLeft: dimensions.indent }}
                                textColor={color.LIGHT.BLUE_2}
                                fontSize={fontSizes.normal}
                                fontWeight={fontWeights.normal}
                            />

                        </View>

                    </View>
                </View>
                <ScrollView style={{ margin: dimensions.moderate(10) }}>

                    {lists.map((item, index) => {
                        return <View key={index} style={{
                            borderBottomWidth: 1, borderColor: color.LIGHT.BLUE_4
                        }}>
                            <View >
                                <TouchableOpacity onPress={() => {
                                    if (index == indexContent) {
                                        setIndexContent(-1);
                                        return;
                                    }
                                    if (!item.isGetAttachments) getListAttachment(item[KeyGetListProductionExperience.id], index);
                                    setIndexContent(index);
                                }} style={{ backgroundColor: (index != indexContent ? color.LIGHT.WHITE : color.LIGHT.THIRD__BG__COLOR), padding: dimensions.moderate(10), }}>
                                    <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        {
                                            !item[KeyGetListProductionExperience.drawCode] ? <></>
                                                :
                                                <View style={{ padding: dimensions.moderate(5), backgroundColor: color.LIGHT.BLUE_2, borderRadius: dimensions.moderate(5), marginRight: dimensions.moderate(5) }}>
                                                    <TextComp
                                                        fontSize={fontSizes.verySmall}
                                                        textColor={color.LIGHT.WHITE}
                                                        fontWeight={fontWeights.bold}
                                                        value={item[KeyGetListProductionExperience.drawCode] || '---'}
                                                    ></TextComp>
                                                </View>
                                        }


                                        <TextComp
                                            fontSize={fontSizes.normal}
                                            textColor={color.LIGHT.BLUE_2}
                                            fontWeight={fontWeights.bold}
                                            value={item[KeyGetListProductionExperience.name] || ''}
                                        ></TextComp>
                                    </View>

                                    {
                                        !item[KeyGetListProductionExperience.orderCode] && !item[KeyGetListProductionExperience.orderDetailCode] ? <></>
                                            :
                                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                                <TextComp textColor={color.LIGHT.BLUE_2} value={` ${item[KeyGetListProductionExperience.orderCode] || '---'} || ${item[KeyGetListProductionExperience.orderDetailCode] || '---'}`}></TextComp>
                                            </View>
                                    }
                                    <TextComp textColor={color.LIGHT.ORANGE_1} fontSize={fontSizes.verySmall} value={`${t('type')}: ${item[KeyGetListProductionExperience.typeAndError]}`} ></TextComp>
                                    <TextComp fontSize={fontSizes.small} textColor={color.LIGHT.GREEN_1} value={t('content')}></TextComp>

                                </TouchableOpacity>
                                {
                                    index != indexContent ? <></>
                                        :
                                        <ScrollView>
                                            {
                                                !item.attachments || item.attachments.length <= 0 ? <></> :
                                                    <View>
                                                        {
                                                            item.attachments.map((item, indexImg) => {
                                                                return <TouchableOpacity key={indexImg} onPress={()=>{
                                                                    openBrowser(environment.domain+'upload/production-experience/'+item[keyAttachment.file_path])
                                                                }} style={{ marginTop: dimensions.vertical(10) }}>
                                                                    <TextComp textColor={color.LIGHT.BLUE_5} value={item[keyAttachment.file_name]}   ></TextComp>
                                                                </TouchableOpacity>
                                                            })
                                                        }
                                                    </View>
                                            }
                                            {
                                                !item.attachmentsImage || item.attachmentsImage.length <= 0 ? <></> :
                                                    <View>
                                                        {
                                                            item.attachmentsImage.map((img, indexImg) => {
                                                                return <TouchableOpacity  key={indexImg}  onPress={()=>{
                                                                    setIndexView(indexImg);
                                                                    setListView(item.attachmentsImage.map((image) => {
                                                                        return { uri:environment.domain+'upload/production-experience/'+image[keyAttachment.file_path] }
                                                                    }));
                                                                    setIsVisible(true);
                                                                   
                                                                }} style={{
                                                                    padding: dimensions.moderate(10),
                                                                    borderWidth: 1,
                                                                    borderColor: color.LIGHT.BORDER__COLOR,
                                                                    marginTop: dimensions.vertical(10),
                                                                    borderRadius: dimensions.moderate(5)
                                                                }}>
                                                                    <Image
                                                                        source={{ uri: `${environment.domain}${'upload/production-experience/'}${img[keyAttachment.file_path]}` }}
                                                                        alt={"skm"}
                                                                        style={{
                                                                            width: '100%',
                                                                            height: dimensions.vertical(200),
                                                                            objectFit: 'contain',
                                                                        }}
                                                                    />
                                                                </TouchableOpacity>
                                                            })
                                                        }
                                                    </View>
                                            }
                                        </ScrollView>
                                }


                                <View style={{ display: 'flex', flexDirection: 'column', minHeight: index != indexContent ? dimensions.vertical(50) : dimensions.vertical(500) }}>

                                    <WebView
                                        style={{ width: '100%', flex: 1, marginTop: dimensions.vertical(2), height: '100%' }}
                                        source={{ html: `<div style="font-size:48px !important;height:max-content">${item[KeyGetListProductionExperience.detail] || ''}</div>` }}
                                    />
                                </View>

                            </View>
                        </View>;
                    })}

                    {
                        lists.length ? <></>
                            :
                            <View>
                                <TextComp style={{ textAlign: 'center' }} textColor={color.LIGHT.ORANGE_1} value={t('not_experian_production')}></TextComp>
                            </View>
                    }

                </ScrollView>
                <View
                    style={{
                        padding: dimensions.moderate(10)
                    }}
                >
                    <ButtonComp
                        icon_name={'cancel'}
                        btnColor={color.LIGHT.BLUE_2}
                        buttonColor={color.LIGHT.BLUE_2}
                        mode="text"
                        onPress={() => closeModal(false)}
                        text={t('close')}
                    />
                </View>

            </View>
            <ImageView
                images={listView}
                imageIndex={indexView}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />
        </Modal>
    );
}

const styles = StyleSheet.create({
    cardModal: {
        backgroundColor: color.LIGHT.WHITE,
        borderRadius: dimensions.moderate(10),
        overflow: "hidden",
        display: 'flex',
        flexDirection: 'column'
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
        maxHeight: '100%',
        marginBottom: dimensions.vertical(100),
        marginTop: dimensions.vertical(100),
    },
});
