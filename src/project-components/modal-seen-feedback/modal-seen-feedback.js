import React, { useContext, useEffect, useState } from "react";
import { ButtonComp, TextComp } from "../../basic-components";
import { dimensions, fontSizes, color, fontWeights } from "../../styles";
import { useTranslation } from "react-i18next";
import { Modal } from "react-native-paper";
import { View, StyleSheet, ScrollView } from "react-native";
import { KeyGetListFeedback } from "../../utils/constant/key";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StoreContext } from "../../store";
import ImageView from "react-native-image-viewing";
import { environment } from "../../environments/environment.prod";
import { serviceList } from "../../utils";
import { IO } from "../../utils/sendRequest";
import { Image } from "react-native";

export function ModalSeenFeedback({
    visibleModal,
    closeModal,
    detail,
    notify,
    action
}) {
    const { t } = useTranslation();
    const { colors } = useContext(StoreContext);
    const [list_file, setListFile] = useState([]);
    const [list_image, setListImage] = useState([]);

    const [visibleViewImage, setIsVisibleViewImage] = useState(false);
    const [list_image_view, setListImageView] = useState({ index: 0, list: [] });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!detail) {
            clear();
            return;
        }
        const file = (detail[KeyGetListFeedback.list_file] || []).reduce((result, file) => {
            if (['jpg', 'jpeg', 'gif', 'png', 'svg'].includes(file.extension)) {
                result.image.push(file);
            } else {
                result.file.push(file);
            }
            return result;
        }, { file: [], image: [] })
        setListFile(file.file);
        setListImage(file.image);
    }, [detail]);

    const clear = () => {
        setLoading(false);
        setListFile([]);
        setListImage([]);
    }

    const deleteFeedback = () => {
        setLoading(true);
        IO.sendRequest(
            serviceList.delete_feedback,
            [detail[KeyGetListFeedback.id]],
            (requestInfo, result) => callBackDeleteFeedback(requestInfo, result),
            true,
            timeOutFunct,
            15000,
            "insert_feedback"
        );

    };

    const callBackDeleteFeedback = (requestInfo, result) => {
        let message = result["proc_message"];
        if (+result["proc_status"] == 1) {
            setLoading(false);
            notify({
                show: true,
                titleModal: message,
                color: color.LIGHT.GREEN_1,
            });
            closeModal(true);
        } else {
            setLoading(false);
            notify({
                show: true,
                titleModal: message,
                color: color.LIGHT.TEXT__DANGER,
            });
        }
    };


    const timeOutFunct = (reqInfo) => {
        setLoading(false);
    };

    return (
        <Modal
            visible={visibleModal}
            presentationStyle="overFullScreen"
            onDismiss={() => {
                clear();
                closeModal(false);
            }}
            contentContainerStyle={styles.contentStyle}
        >
            {detail && <View style={styles.cardModal}>

                <View>
                    <View style={styles.cardHeader}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                marginLeft: dimensions.indent,
                                justifyContent: "center",
                                padding: dimensions.moderate(15),

                            }}
                        >
                            <TextComp
                                value={`${detail[KeyGetListFeedback.title]}`}
                                style={{ textAlign: 'center' }}
                                textColor={color.LIGHT.BLUE_2}
                                fontSize={fontSizes.normal}
                                fontWeight={fontWeights.normal}
                            />

                        </View>

                    </View>
                </View>
                <ScrollView style={{ margin: dimensions.moderate(10), zIndex: 999999999 }}>

                    <View style={{ height: "100%", backgroundColor: colors.BG__SCREEN }} >
                        <View
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                height: '100%'
                            }}
                        >
                            <View style={[styles.top_bar, { borderColor: colors.BG__PRIMARY }]}>
                                <View>
                                    {/* <TextComp textColor={colors.TEXT__PRIMARY} fontWeight={fontWeights.bold} fontSize={fontSizes.xmedium} value={detail[KeyGetListFeedback.title]}></TextComp> */}
                                    <TextComp fontWeight={fontWeights.light} fontSize={fontSizes.small} value={detail[KeyGetListFeedback.content]}></TextComp>
                                </View>
                                <View style={{}}>
                                    {
                                        list_file.map((item, index) => {
                                            return <TouchableOpacity key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                                                onPress={() => {
                                                    Linking.openURL(environment.domainFileGet + item.type + '/' + item.file_path);
                                                }}
                                            >

                                                {item.extension == 'doc' || item.extension == 'docs' && <Image
                                                    source={require("../../assets/images/logo/doc.png")}
                                                    alt={"chips"}
                                                    width={dimensions.moderate(30)}
                                                    height={dimensions.moderate(10)}
                                                    resizeMode={"center"}
                                                    style={{
                                                    }}
                                                />}

                                                {item.extension == 'doc' || item.extension == 'docx' && <Image
                                                    source={require("../../assets/images/logo/doc.png")}
                                                    alt={"chips"}
                                                    width={dimensions.moderate(30)}
                                                    height={dimensions.moderate(10)}
                                                    resizeMode={"center"}
                                                    style={{
                                                    }}
                                                />}

                                                {item.extension == 'xls' || item.extension == 'xlsx' && <Image
                                                    source={require("../../assets/images/logo/excel.png")}
                                                    alt={"chips"}
                                                    width={dimensions.moderate(30)}
                                                    height={dimensions.moderate(10)}
                                                    resizeMode={"center"}
                                                    style={{
                                                    }}
                                                />}
                                                {item.extension == 'ppt' || item.extension == 'pptx' && <Image
                                                    source={require("../../assets/images/logo/ppt.png")}
                                                    alt={"chips"}
                                                    width={dimensions.moderate(30)}
                                                    height={dimensions.moderate(10)}
                                                    resizeMode={"center"}
                                                    style={{
                                                    }}

                                                />}

                                                {item.extension == 'pdf' && <Image
                                                    source={require("../../assets/images/logo/pdf.png")}
                                                    alt={"chips"}
                                                    width={dimensions.moderate(30)}
                                                    height={dimensions.moderate(10)}
                                                    resizeMode={"center"}
                                                    style={{
                                                    }}
                                                />}


                                                {!['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'].includes(item.extension) && <Image
                                                    source={require("../../assets/images/logo/folder.png")}
                                                    alt={"chips"}
                                                    width={dimensions.moderate(30)}
                                                    height={dimensions.moderate(10)}
                                                    resizeMode={"center"}
                                                    style={{
                                                    }}

                                                />}

                                                <View>
                                                    <TextComp textColor={colors.BLUE_2} value={item.name} fontWeight={fontWeights.light} fontSize={fontSizes.verySmall}></TextComp>
                                                </View>

                                            </TouchableOpacity>
                                        })
                                    }
                                    <View>
                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    {
                                        list_image.slice(0, 3).map((item, index) => {
                                            return <View key={index} style={{ flex: 1, paddingRight:dimensions.moderate(2)}} >
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setListImageView({ index: index, list: list_image });
                                                        setIsVisibleViewImage(true);
                                                    }}
                                                >
                                                    <Image
                                                        source={{ uri: environment.domainFileGet + item.type + '/' + item.file_path }}
                                                        alt={"vina"}
                                                        style={{
                                                            width: '100%',
                                                            borderRadius: dimensions.moderate(10),
                                                            height: dimensions.vertical(150),
                                                            objectFit: 'contain'
                                                        }}
                                                    />
                                                    <View style={{ display: (index < 2 || list_image.length <= 4 ? 'none' : 'flex'), position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 99, backgroundColor: "#d2d2d2", opacity: 0.6, borderRadius: dimensions.moderate(5), justifyContent: 'center', alignItems: 'center' }}>
                                                        <TextComp value={`+${list_image.length - 3}`} fontWeight={fontWeights.bold} fontSize={fontSizes.big}></TextComp>
                                                    </View>

                                                </TouchableOpacity>


                                            </View>
                                        })
                                    }
                                </View>



                            </View>





                        </View>


                    </View>


                    <ImageView
                        images={list_image_view.list.map((img) => {
                            return { uri: environment.domainFileGet + img.type + '/' + img.file_path }
                        })}
                        imageIndex={list_image_view.index}
                        visible={visibleViewImage}
                        onRequestClose={() => setIsVisibleViewImage(false)}
                    />

                </ScrollView>
                <View
                    style={{
                        padding: dimensions.moderate(10),
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    {action && <ButtonComp
                        icon_name={'delete'}
                        btnColor={colors.BG__PRIMARY}
                        buttonColor={colors.BG__PRIMARY}
                        loading={loading}
                        mode="text"
                        onPress={() => {
                            deleteFeedback();
                        }}
                        text={t('delete')}
                        style={{ flex: 1, margin: dimensions.moderate(5) }}
                    />}

                    <ButtonComp
                        icon_name={'cancel'}
                        btnColor={color.LIGHT.BLUE_2}
                        buttonColor={color.LIGHT.BLUE_2}
                        mode="text"
                        onPress={() => {
                            clear();
                            closeModal(false);
                        }}
                        text={t('close')}
                        style={{ flex: 1, margin: dimensions.moderate(5) }}
                    />
                </View>
            </View>}


            <ImageView
                images={list_image_view.list.map((img) => {
                    return { uri: environment.domainFileGet + img.type + '/' + img.file_path }
                })}
                imageIndex={list_image_view.index}
                visible={visibleViewImage}
                onRequestClose={() => setIsVisibleViewImage(false)}
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
    list_item_box: {
        display: "flex",
        flexDirection: "column",
        flex: 1,
        width: "100%",
        paddingBottom: dimensions.vertical(20),
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
        marginBottom: dimensions.vertical(150),
        marginTop: dimensions.vertical(150),
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
