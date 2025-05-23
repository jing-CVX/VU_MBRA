import React, {
    useContext,
    useEffect,
    useRef,
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
    Dimensions,
    Image,
    TouchableWithoutFeedback,
    Animated,
    Platform,
    BackHandler
} from "react-native";
import { ActivityIndicator } from "react-native";
import IC_CLOCK from '../../../assets/images/common/ic_clock_time.svg';
import {
    eventList,
    glb_sv,
    screens,
    serviceList
} from "../../../utils";
import { dimensions, fontSizes, fontWeights } from "../../../styles";
import {
    ButtonComp,
    DatePicker,
    IconComp,
    InputField,
    TextComp,
} from "../../../basic-components";
import { IO } from "../../../utils/sendRequest";
import { HeaderLR, HeaderTitle, NotifyAuto } from "../../../components";
import moment from "moment";
import { StoreUserInfo } from "../../../store-user-info";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { StoreContext } from "../../../store";
import { debounce } from "rxjs";
import IC_ACCOUNT from '../../../assets/images/common/add-user-account-icon.svg';
import IC_COMMISSION from '../../../assets/images/common/commission-discounts-icon.svg';
import IC_BRANCH from '../../../assets/images/common/shop-vendor-icon.svg';
import IC_ADD from '../../../assets/images/common/ic_add_codeck.svg';
import { ModalRequest } from "../../../project-components/modal-request/modal-request";
import { KeyGetListRequest, TypeLevelUser } from "../../../utils/constant/key";
import { environment } from "../../../environments/environment.prod";
import { ModalFeedback } from "../../../project-components/modal-feeback/modal-feedback";
import ImageView from "react-native-image-viewing";
import RowFeedback from "./row-feedback/row-feedback";

export default function FeedbackScreen({ navigation, route }) {

    const { userInfo } = useContext(StoreUserInfo);
    const { colors } = useContext(StoreContext);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loadingById, setLoadingById] = useState(false);
    const { t } = useTranslation();

    const [category, setCategory] = useState('request');//request, receive

    const [notify, setNotify] = useState({
        show: false,
        titleModal: "",
        iconLeft: "",
        color: "",
    });

    const [detail, setDetail] = useState({});
    const [_list_items, setListItem] = useState([]);
    const [totalRow, setTotalRow] = useState(0);





    const [showFeedback, setShowFeedback] = useState(false);
    const [dataFeedback, setShowDataFeedback] = useState({});

    const screenHeight = Dimensions.get('window').height;
    const [showQR, setShowQR] = useState('');
    const [amountSuccess, setAmountSuccess] = useState(0);

    const [_list_step, setListStep] = useState([]);
    const [stepSelected, setStepSelected] = useState(null);
    const [showSelectStep, setShowSelectStep] = useState(false);

    const [_list_experian, setListExperian] = useState([]);
    const [showExperian, setShowExperian] = useState(false);

    const [showEnterExperian, setShowEnterExperian] = useState(false);



    const [production_process_step_time_id, setProductionProcessStepTimeId] = useState(0);

    const [visibleCamera, setVisibleCamera] = useState(false);

    const [visibleViewImage, setIsVisibleViewImage] = useState(false);
    const [list_image_view, setListImageView] = useState({index:0,list:[]});


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
                        title={t(route.params.category == 'request' ? "requestSent" : "requestReceive")}
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
                        category: route.params.category
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
        if (showQR) checkDeviceCamera();
    }, [showQR]);


    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            resetForm();
            getById(route.params.id);
            getListFeedback(1000000000000000000, [], category);
        });
        return unsubscribe;
    }, [navigation]);

    const resetForm = () => {
        setDetail({});
        setListItem([]);
        setTotalRow(0);
    }

    const eventShowFeedback = (action, data) => {
        setShowFeedback(action);
        setShowDataFeedback(data);
    }

    const checkDeviceCamera = async () => {
        check(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)
            .then((result) => {

                switch (result) {

                    case RESULTS.UNAVAILABLE:
                    // This feature is not available (on this device / in this context)
                    // Tính năng này không khả dụng (trên thiết bị này / trong bối cảnh này)
                    case RESULTS.DENIED:
                        // The permission has not been requested / is denied but requestable
                        // Quyền chưa được yêu cầu / bị từ chối nhưng có thể yêu cầu
                        // setOpenSettingApp(true)
                        // showDialogOpenSettingCamera()
                        requestCamera();
                        break;

                    case RESULTS.BLOCKED:
                    // The permission is denied and not requestable anymore
                    // Quyền bị từ chối và không thể yêu cầu được nữa
                    case RESULTS.LIMITED:
                        // The permission is limited: some actions are possible
                        // Quyền bị hạn chế: có thể thực hiện một số hành động
                        // setOpenSettingApp(true)
                        // showDialogOpenSettingCamera();
                        requestCamera();
                        break;

                    case RESULTS.GRANTED:
                        // The permission is granted
                        // Sự cho phép được cấp
                        //     setOpenSettingApp(false)
                        setVisibleCamera(true);
                        // showCamera()
                        break;

                }
            })
            .catch((error) => {

                // console.log(error)
            });
    }

    const requestCamera = () => {
        request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA).then((result) => {
            switch (result) {
                case RESULTS.GRANTED:
                    // Cho phép
                    setVisibleCamera(true);
                    break;
                case 'denied':
                    // Không cho phép (từ chối)
                    setVisibleCamera(false);
                    break;
            }
        });
    }

    //-----------get-list-word-diary-----------

    const handleScroll = ({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const isScrollEnd =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        if (isScrollEnd && !loading) {
            if (!_list_items.length || _list_items.length >= totalRow) return;
            getListFeedback(_list_items[_list_items.length - 1][KeyGetListRequest.id], _list_items, category); // last_id
        }
    }

    const getListFeedback = (lastId, list, category) => {
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

    const callBackGetById = (requestInfo, result, list) => {
        let message = result["proc_message"];
        setLoadingById(false);
        if (+result["proc_status"] == 1) {
            // Xử lý thành công
            setDetail((result["proc_data"]["rows"] || [])[0] || {});
        } else {
            setNotify({
                show: true,
                titleModal: message,
                iconLeft: "",
                color: colors.TEXT__DANGER,
            })
        }
    };

    //-----------experian-work-diary-----------

    const getListExperian = (stepCode) => {
        const params = {
            lastId: 9999999999999,
            code: `%${stepCode || ''}%`,
            experienceType: `%`,
        }

        IO.sendRequest(
            serviceList.get_list_production_experience
            , Object.values(params)
            , callBackGetListExperian
            , true
            , timeOutFunct
            , 10000
            , "get_list_production_experience"
        )
    }

    const callBackGetListExperian = (requestInfo, result) => {
        if (+result["proc_status"] == 1) {
            // Xử lý thành công
            const data = result["proc_data"]["rows"];
            setListExperian(data || []);
        }
    }

    const timeOutFunct = (reqInfo) => {
        setLoading(false);
    };

    //-----------------------REFRESH-----------------------

    const fetchData = () => {
        setTimeout(() => {
            getListFeedback(1000000000000000, [], category);
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
                            <TextComp textColor={colors.TEXT__PRIMARY} fontWeight={fontWeights.bold} fontSize={fontSizes.xmedium} value={detail[KeyGetListRequest.title]}></TextComp>
                            <TextComp fontWeight={fontWeights.light} fontSize={fontSizes.small} value={detail[KeyGetListRequest.content]}></TextComp>
                        </View>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            {
                                (detail[KeyGetListRequest.list_file] || []).slice(0,4).map((item, index) => {
                                    return <TouchableOpacity key={index} style={{ flex: 1, marginRight: dimensions.moderate(2), position: 'relative' }}
                                    onPress={()=>{
                                        setListImageView({index:index, list:detail[KeyGetListRequest.list_file] || []});
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
                                        <View style={{ display: (index < 3 || (detail[KeyGetListRequest.list_file] || []).length<4 ? 'none' : 'flex'), position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 99, backgroundColor: "#d2d2d2", opacity: 0.6, borderRadius: dimensions.moderate(5),  justifyContent: 'center', alignItems: 'center' }}>
                                            <TextComp value={`+${(detail[KeyGetListRequest.list_file] || []).length-4}`} fontWeight={fontWeights.bold} fontSize={fontSizes.big}></TextComp>
                                        </View>

                                    </TouchableOpacity>
                                })
                            }
                            <View>
                            </View>
                        </View>

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
                            <View style={{ display: "flex", flexDirection: "column", }}>
                                <View>
                                    <View style={styles.list_item_box}>
                                        {(_list_items || []).map((item, index) => {
                                            return <View key={index}>
                                                <TouchableOpacity>
                                                    <RowFeedback item={item}></RowFeedback>
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
                    <TouchableOpacity activeOpacity={0.8} style={{ position: 'absolute', bottom: dimensions.moderate(30), right: dimensions.moderate(30), zIndex: 99999999, backgroundColor: colors.BUTTON__PRIMARY, borderRadius: dimensions.moderate(50), width: dimensions.moderate(40), height: dimensions.moderate(40), display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <IconComp onPress={() => {
                            eventShowFeedback(true, {});
                        }} style={{ margin: 0, padding: 0 }} iconSize={fontSizes.huge} icon_nm={'plus'} iconColor={colors.TEXT__WHITE}></IconComp>

                    </TouchableOpacity>

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

            <ModalFeedback
                closeModal={() => {
                    eventShowFeedback(false, {});
                }}
                farmer_id={userInfo.farmer_id || 0}
                agency_id={userInfo.agency_id || 0}
                type={userInfo.user_level == TypeLevelUser.farmer ? '1' : '0'}//type
                fm_request_id={route.params.id}
                data_update={dataFeedback}
                notify={(data) => {
                    setNotify(data);
                }}
                visibleModal={showFeedback}>
            </ModalFeedback>

            <ImageView
                images={(list_image_view.list || []).map((img) => {
                    return { uri:environment.domainFileGet + img.type + '/' + img.file_path }
                })}
                imageIndex={list_image_view.index}
                visible={visibleViewImage}
                onRequestClose={() => setIsVisibleViewImage(false)}
            />


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
