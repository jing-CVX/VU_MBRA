import React, {
    useContext,
    useEffect,
    useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
    View,
    Keyboard,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
    Image,
    BackHandler,
    Linking
} from "react-native";
import { ActivityIndicator } from "react-native";
import {
    eventList,
    FormatNumber,
    glb_sv,
    screens,
    serviceList
} from "../../../../utils";
import { dimensions, fontSizes, fontWeights } from "../../../../styles";
import {
    IconComp,
    TextComp,
} from "../../../../basic-components";
import { IO } from "../../../../utils/sendRequest";
import { ConfirmModal, HeaderLR, HeaderTitle, NotifyAuto } from "../../../../components";
import { StoreUserInfo } from "../../../../store-user-info";
import { StoreContext } from "../../../../store";
import { KeyGetListRequest } from "../../../../utils/constant/key";
import { environment } from "../../../../environments/environment.prod";
import ImageView from "react-native-image-viewing";
import { ModalSeenFeedback } from "../../../../project-components/modal-seen-feedback/modal-seen-feedback";
import RowDetailRequest from "./row-screen-request-detail/row-screen-request-detail";
import { ModalFarmerSend } from "../../../../project-components/modal-farmer-send";

export default function DetailRequestScreen({ navigation, route }) {

    const { userInfo } = useContext(StoreUserInfo);
    const { colors } = useContext(StoreContext);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingById, setLoadingById] = useState(false);
    const { t } = useTranslation();


    const [notify, setNotify] = useState({
        show: false,
        titleModal: "",
        iconLeft: "",
        color: "",
    });

    const [detail, setDetail] = useState({});
    const [list_file, setListFile] = useState([]);
    const [list_image, setListImage] = useState([]);

    const [_list_items, setListItem] = useState([]);
    const [totalRow, setTotalRow] = useState(0);




    const [showSeenDetail, setShowSeenDetail] = useState(null);

    const [showFarmerSend, setShowFarmerSend] = useState(0);

    const [confirmDelete, setConfirmDelete] = useState(false);
    const [visibleViewImage, setIsVisibleViewImage] = useState(false);
    const [list_image_view, setListImageView] = useState({ index: 0, list: [] });


    if (!userInfo || !userInfo.user_id || !route.params.id) {
        navigation.navigate({
            name: screens.LOGIN,
        });
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            navigation.setOptions({
                headerStyle: {
                    backgroundColor: colors.BG__PRIMARY, // Màu nền mới cho header
                },
                headerTitle: () => <HeaderTitle title={t("")} />,
                headerLeft: () => (
                    <HeaderLR
                        isRight={false}
                        icon_nm={""}
                        title={t("requestSent")}
                        onPress={() => {
                            backAction;
                        }}
                    />
                ),
            });

            const backAction = () => {

                navigation.navigate({
                    name: screens.REQUEST_RESPONSE,
                    params: {
                        category: 'request'
                    },
                });
                return true; // Trả về true để chặn hành động mặc định của nút "Back"
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove(); // Xóa bỏ lắng nghe sự kiện khi component bị hủy

        });

        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        const commonEvent = glb_sv.commonEvent.subscribe((msg) => {

            if (msg.type === eventList.EXPIRE_SESSION) {
                setTimeout(() => {
                    navigation.navigate(screens.LOGIN);
                }, 300);
            }
        });
        return () => {
            commonEvent.unsubscribe();
        };
    }, [navigation]);


    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            resetForm();
            getById(route.params.id);
            getListFeedback(1000000000000000000, []);
        });
        return unsubscribe;
    }, [navigation]);

    const resetForm = () => {
        setDetail({});
        setListFile([]);
        setListImage([]);
        setListItem([]);
        setTotalRow(0);
    }


    //-----------get-list-word-diary-----------

    const handleScroll = ({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const isScrollEnd =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        if (isScrollEnd && !loading) {
            if (!_list_items.length || _list_items.length >= totalRow) return;
            getListFeedback(_list_items[_list_items.length - 1][KeyGetListRequest.id], _list_items); // last_id
        }
    }

    const getListFeedback = (lastId, list) => {
        if (loading) return;
        setLoading(true);
        IO.sendRequest(
            serviceList.get_list_feedback,
            [
                lastId, //last_id
                '%', //search
                userInfo.farmer_id || 0, //farmer_id
                route.params.id
            ],
            (requestInfo, result) => callBackGetListFeedback(requestInfo, result, list),
            true,
            timeOutFunct,
            15000,
        );


    };

    const callBackGetListFeedback = (requestInfo, result, list) => {
        let message = result["proc_message"];
        setLoading(false);
        if (+result["proc_status"] == 1) {
            // Xử lý thành công
            let data = result["proc_data"]["rows"];
            setTotalRow(result["proc_data"]["rowTotal"] || 0);
            setListItem([...list, ...(data || [])]);
        } else {
            setNotify({
                show: true,
                titleModal: message,
                iconLeft: "",
                color: colors.TEXT__DANGER,
            })
        }
    };


    const getById = (id) => {
        if (loadingById) return;
        setLoadingById(true);
        IO.sendRequest(
            serviceList.get_by_id_fm_request,
            [id],
            (requestInfo, result) => callBackGetById(requestInfo, result),
            true,
            timeOutFunct,
            15000,
        );


    };

    const deleteRequest = (id) => {
        if (loadingById) return;
        setLoadingById(true);
        IO.sendRequest(
            serviceList.delete_fm_request,
            [id],
            (requestInfo, result) => callBackDelete(requestInfo, result),
            true,
            timeOutFunct,
            15000,
        );


    };
    const callBackDelete = (requestInfo, result, list) => {
        let message = result["proc_message"];
        setLoadingById(false);
        if (+result["proc_status"] == 1) {
            // Xử lý thành công
            setNotify({
                show: true,
                titleModal: message,
                iconLeft: "",
                color: colors.GREEN_1,
            });

            navigation.navigate({
                name: screens.REQUEST_RESPONSE,
                params: {
                    category: 'request'
                },
            });
        } else {
            setNotify({
                show: true,
                titleModal: message,
                iconLeft: "",
                color: colors.TEXT__DANGER,
            })
        }
    };

    const callBackGetById = (requestInfo, result, list) => {
        let message = result["proc_message"];
        setLoadingById(false);
        if (+result["proc_status"] == 1) {
            // Xử lý thành công
            const data = result["proc_data"]["rows"][0] || {};
            setDetail(data);
            const file = (data[KeyGetListRequest.list_file] || []).reduce((result, file) => {
                if (['jpg', 'jpeg', 'gif', 'png', 'svg'].includes(file.extension)) {
                    result.image.push(file);
                } else {
                    result.file.push(file);
                }
                return result;
            }, { file: [], image: [] })
            setListFile(file.file);
            setListImage(file.image);
            ;
        } else {
            setNotify({
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
            getListFeedback(1000000000000000, []);
            setRefreshing(false); // Kết thúc quá trình refresh
        }, 1000);
    };

    const handleRefresh = () => {
        setRefreshing(true); // Bắt đầu quá trình refresh
        fetchData();
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>

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
                            <TextComp style={{ textAlign: 'center' }} textColor={colors.TEXT__PRIMARY} fontWeight={fontWeights.bold} fontSize={fontSizes.xmedium} value={detail[KeyGetListRequest.title]}></TextComp>
                            <TextComp fontWeight={fontWeights.light} fontSize={fontSizes.small} value={detail[KeyGetListRequest.content]}></TextComp>
                        </View>
                        <View style={{}}>
                            {
                                (list_file || []).map((item, index) => {
                                    return <TouchableOpacity key={index} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
                                        onPress={() => {
                                            Linking.openURL(environment.domainFileGet + item.type + '/' + item.file_path);
                                        }}
                                    >

<TextComp fontWeight={fontWeights.light} fontSize={fontSizes.small} value={Linking.openURL(environment.domainFileGet + item.type + '/' + item.file_path)}></TextComp>


                                        {item.extension == 'doc' || item.extension == 'docs' && <Image
                                            source={require("../../../../assets/images/logo/doc.png")}
                                            alt={"chips"}
                                            width={dimensions.moderate(30)}
                                            height={dimensions.moderate(10)}
                                            resizeMode={"center"}
                                            style={{
                                            }}
                                        />}

                                        {item.extension == 'doc' || item.extension == 'docx' && <Image
                                            source={require("../../../../assets/images/logo/doc.png")}
                                            alt={"chips"}
                                            width={dimensions.moderate(30)}
                                            height={dimensions.moderate(10)}
                                            resizeMode={"center"}
                                            style={{
                                            }}
                                        />}

                                        {item.extension == 'xls' || item.extension == 'xlsx' && <Image
                                            source={require("../../../../assets/images/logo/excel.png")}
                                            alt={"chips"}
                                            width={dimensions.moderate(30)}
                                            height={dimensions.moderate(10)}
                                            resizeMode={"center"}
                                            style={{
                                            }}
                                        />}
                                        {item.extension == 'ppt' || item.extension == 'pptx' && <Image
                                            source={require("../../../../assets/images/logo/ppt.png")}
                                            alt={"chips"}
                                            width={dimensions.moderate(30)}
                                            height={dimensions.moderate(10)}
                                            resizeMode={"center"}
                                            style={{
                                            }}

                                        />}

                                        {item.extension == 'pdf' && <Image
                                            source={require("../../../../assets/images/logo/pdf.png")}
                                            alt={"chips"}
                                            width={dimensions.moderate(30)}
                                            height={dimensions.moderate(10)}
                                            resizeMode={"center"}
                                            style={{
                                            }}
                                        />}


                                        {!['pdf', 'doc', 'docx', 'ppt', 'pptx', 'xls', 'xlsx'].includes(item.extension) && <Image
                                            source={require("../../../../assets/images/logo/folder.png")}
                                            alt={"chips"}
                                            width={dimensions.moderate(30)}
                                            height={dimensions.moderate(10)}
                                            resizeMode={"center"}
                                            style={{
                                            }}

                                        />}





                                        <View>
                                            <TextComp textColor={colors.BLUE_2} value={item.name} fontWeight={fontWeights.light} fontSize={fontSizes.medium}></TextComp>
                                        </View>

                                    </TouchableOpacity>
                                })
                            }
                            <View>
                            </View>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            {
                                list_image.slice(0, 4).map((item, index) => {
                                    return <TouchableOpacity key={index} style={{ flex: 1, marginRight: dimensions.moderate(2), position: 'relative' }}
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
                                                borderRadius: dimensions.moderate(5),
                                                height: dimensions.vertical(150),
                                                objectFit: 'contain',
                                            }}
                                        />
                                        <View style={{ display: (index < 3 || list_image.length <= 4 ? 'none' : 'flex'), position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 99, backgroundColor: "#d2d2d2", opacity: 0.6, borderRadius: dimensions.moderate(5), justifyContent: 'center', alignItems: 'center' }}>
                                            <TextComp value={`+${list_image.length - 4}`} fontWeight={fontWeights.bold} fontSize={fontSizes.big}></TextComp>
                                        </View>

                                    </TouchableOpacity>
                                })
                            }
                            <View>
                            </View>
                        </View>

                        {
                            detail[KeyGetListRequest.type] != '1' && <View

                                style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: dimensions.vertical(10) }}>

                                <TouchableOpacity
                                    onPress={() => {
                                        if (detail[KeyGetListRequest.isSendAll] == '1') return;

                                        setShowFarmerSend(detail[KeyGetListRequest.id])
                                    }}
                                    style={{ backgroundColor: colors.ORANGE_1, padding: dimensions.moderate(10), borderRadius: dimensions.moderate(10), marginRight: dimensions.moderate(5) }}>
                                    <TextComp
                                        fontSize={fontSizes.normal}
                                        fontWeight={fontWeights.normal}
                                        numberOfLines={2}
                                        textColor={colors.WHITE}
                                        value={detail[KeyGetListRequest.isSendAll] == '1' ? t('sendAll') : t('sendFarmer') + ': ' + FormatNumber(detail[KeyGetListRequest.total_send] || 0, 0, '', 0, 'short')}
                                    ></TextComp>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() => {
                                        setConfirmDelete(true);
                                    }}
                                    style={{ backgroundColor: colors.BG__PRIMARY, padding: dimensions.moderate(10), borderRadius: dimensions.moderate(10) }}>
                                    <TextComp
                                        fontSize={fontSizes.normal}
                                        fontWeight={fontWeights.normal}
                                        numberOfLines={2}
                                        textColor={colors.WHITE}
                                        value={t('delete')}
                                    ></TextComp>
                                </TouchableOpacity>

                            </View>
                        }

                    </View>



                    <View style={[styles.container_list_diary, { backgroundColor: colors.BG__SCREEN }]}>

                        <ScrollView style={{ marginTop: dimensions.vertical(10), flex: 1, marginBottom: dimensions.vertical(0) }}
                            refreshControl={
                                <RefreshControl
                                    refreshing={refreshing}
                                    onRefresh={handleRefresh}
                                />
                            }
                            onScroll={handleScroll}
                        >
                            <View style={{ display: "flex", flexDirection: "column" }}>
                                <View>
                                    <View style={styles.list_item_box}>
                                        {(_list_items || []).map((item, index) => {
                                            return <View key={index}>
                                                <TouchableOpacity onPress={() => {
                                                    setShowSeenDetail(item);
                                                }}>
                                                    <RowDetailRequest item={item}></RowDetailRequest>
                                                </TouchableOpacity>
                                            </View>;
                                        })}

                                    </View>
                                </View>
                            </View>
                            <ActivityIndicator animating={loading} color={colors.BUTTON__PRIMARY} />
                            <View style={{ flex: 1, marginBottom: dimensions.vertical(10) }}>
                                <TextComp fontWeights={fontWeights.light}
                                    textColor={colors.TEXT__SCREEN}
                                    fontSize={fontSizes.verySmall} style={{ textAlign: 'center' }}
                                    value={`~ ${_list_items.length}/${totalRow} ~`}
                                ></TextComp>
                            </View>

                        </ScrollView>
                    </View>

                </View>


            </View>

            <NotifyAuto
                close={() => {
                    setNotify({
                        show: false,
                        titleModal: "",
                        iconLeft: "",
                        color: "",
                    });
                }}
                titleModal={t(notify.titleModal)}
                textColor={notify.color}
                iconLeft={notify.iconLeft}
                show={notify.show}
            ></NotifyAuto>


            <ImageView
                images={list_image_view.list.map((img) => {
                    return { uri: environment.domainFileGet + img.type + '/' + img.file_path }
                })}
                imageIndex={list_image_view.index}
                visible={visibleViewImage}
                onRequestClose={() => setIsVisibleViewImage(false)}
            />

            <ModalSeenFeedback
                closeModal={() => {
                    setShowSeenDetail(null);
                }}
                detail={showSeenDetail}
                notify={(data) => {
                    setNotify(data);
                }}
                visibleModal={!!showSeenDetail}>
            </ModalSeenFeedback>


            <ModalFarmerSend
                closeModal={() => {
                    setShowFarmerSend(0);
                }}
                id={showFarmerSend || 0}
                notify={(data) => {
                    setNotify(data);
                }}
                visibleModal={showFarmerSend && showFarmerSend > 0}>
            </ModalFarmerSend>

            <ConfirmModal
                visible={confirmDelete}
                onPressOk={() => {
                    deleteRequest(detail[KeyGetListRequest.id])
                }}
                onPressCancel={() => {
                    setConfirmDelete(false);
                }}
                titleModal={t('confirmDelete')}
                content={detail[KeyGetListRequest.title]}
            ></ConfirmModal>

        </SafeAreaView>


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
        flexDirection: 'column',
        padding: dimensions.vertical(15),
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
