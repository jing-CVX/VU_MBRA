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
    TouchableWithoutFeedback,
    Animated,
    Platform
} from "react-native";
import { ActivityIndicator } from "react-native";
import IC_CLOCK from '../../assets/images/common/ic_clock_time.svg';
import {
    eventList,
    glb_sv,
    screens,
    serviceList
} from "../../utils";
import { dimensions, fontSizes, fontWeights } from "../../styles";
import {
    ButtonComp,
    DatePicker,
    InputField,
    TextComp,
} from "../../basic-components";
//   import RowDiary, { KeyWorkDiaryList } from "./row-diary/row-diary";
import { IO } from "../../utils/sendRequest";
import { HeaderLR, HeaderTitle, NotifyAuto } from "../../components";
import { ModalSelectStep } from "../../project-components/modal-select-step";
import moment from "moment";
import { ModalExperian } from "../../project-components/modal-experian/model-experian";
import { StoreUserInfo } from "../../store-user-info";
import { ModalInsertEmployee } from "../../project-components/modal-insert-employee";
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { StoreContext } from "../../store";
import { debounce } from "rxjs";
import IC_ACCOUNT from '../../assets/images/common/add-user-account-icon.svg';
import RowEmployee, { KeyWorkDiaryList } from "./rows-employee/rows-employee";


export default function EmployeeScreen({ navigation, route }) {

    const { userInfo } = useContext(StoreUserInfo);
    const { colors } = useContext(StoreContext);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const [notify, setNotify] = useState({
        show: false,
        titleModal: "",
        iconLeft: "",
        color: "",
    });

    const [_list_items, setListItem] = useState([1,2,3,4,5,6,7,8,9,10]);
    const [totalRow, setTotalRow] = useState(0);


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


    const [isFromDtVisible, setIsFromDtVisible] = useState(false);
    const [isToDtVisible, setIsToDtVisible] = useState(false);

    const fromDtRef = useRef(glb_sv.formatDate(moment().subtract(3, "months").format("DD/MM/YYYY"), null, "YYYYMMDD"));
    const [from_dt, setFrom_dt] = useState(glb_sv.formatDate(moment().subtract(3, "months").format("DD/MM/YYYY"), null, "DD/MM/YYYY"));

    const toDtRef = useRef(glb_sv.formatDate(new Date(), null, "YYYYMMDD"));
    const [to_dt, setTo_dt] = useState(glb_sv.formatDate(new Date(), null, "DD/MM/YYYY"));

    const throttled = useRef(debounce(() => debounceSetReport(), 1000));

    // if (!userInfo || !userInfo.user_id ) {
    //   navigation.navigate({
    //     name: screens.LOGIN,
    //   });
    // }

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
                        title={t("home")}
                        onPress={() => {
                            navigation.navigate({
                                name: screens.HOME,
                            });
                        }}
                    />
                ),
            });

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
            setShowExperian(false);
            setShowEnterExperian(false);
            getListWorkDiary(1000000000000000000, []);
            resetForm();
        });
        return unsubscribe;
    }, [navigation]);

    const resetForm = () => {
        setListStep([]);
        setAmountSuccess(0);
        setStepSelected(null);
        setProductionProcessStepTimeId(0);
        setShowExperian(false);
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
            getListWorkDiary(_list_items[_list_items.length - 1][KeyWorkDiaryList.id], _list_items); // last_id
        }
    }

    const getListWorkDiary = (lastId, list) => {
        if (loading) return;
        // timeout.next(true);
        setLoading(true);
        IO.sendRequest(
            serviceList.get_list_work_diary,
            [lastId, '%'],
            (requestInfo, result) => callBackGetList(requestInfo, result, list),
            true,
            timeOutFunct,
            15000,
        );

    };

    const callBackGetList = (requestInfo, result, list) => {
        let message = result["proc_message"];
        setLoading(false);
        if (+result["proc_status"] == 1) {
            // Xử lý thành công
            let data = result["proc_data"]["rows"];
            setTotalRow(result["proc_data"]["rowTotal"] || 0);
            setListItem(list.concat(data || []));
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

    //---------------------DATE PICKER---------------------

    const fromDtConfirm = (date) => {
        const dt = glb_sv.formatDate(date, null, "DD/MM/YYYY");
        fromDtRef.current = glb_sv.formatDate(date, null, "YYYYMMDD");
        hideDt(0);
        setFrom_dt(dt);
        setRecall(!recall);
        Keyboard.dismiss();
        throttled.current();
    };

    const toDtConfirm = (date) => {
        const dt = glb_sv.formatDate(date, null, "DD/MM/YYYY");
        toDtRef.current = glb_sv.formatDate(date, null, "YYYYMMDD");
        hideDt(1);
        setTo_dt(dt);
        setRecall(!recall);
        Keyboard.dismiss();
        throttled.current();
    };

    const showFromDatePicker = () => {
        setIsFromDtVisible(true);
    };

    const showToDatePicker = () => {
        setIsToDtVisible(true);
    };

    const hideDt = (type) => {
        type == 1 ? setIsToDtVisible(false) : setIsFromDtVisible(false);
    };

    //-----------------------REFRESH-----------------------

    const fetchData = () => {
        setTimeout(() => {
            getListWorkDiary(1000000000000000, []);
            setRefreshing(false); // Kết thúc quá trình refresh
        }, 1000);
    };

    const handleRefresh = () => {
        setRefreshing(true); // Bắt đầu quá trình refresh
        fetchData();
    };

    const navigateScreen = (screen) => {
        navigation.navigate(screen)
    }

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
                    <View style={[styles.top_bar, { backgroundColor: colors.BG__PRIMARY }]}>
                        <View style={[styles.item_box, {backgroundColor:colors.BG__WHITE}]}>
                            <TouchableOpacity
                                style={[styles.item_box_touchable]}
                                activeOpacity={0.8}
                                onPress={() => {
                                    navigation.navigate({
                                        name: screens.DemoScreen,
                                    });
                                }}

                            >
                                <View style={[styles.item_box_icon]}>
                                    <IC_CLOCK
                                        fill={colors.BUTTON__PRIMARY}
                                        height={dimensions.moderate(80)}
                                        width={dimensions.moderate(80)}
                                        style={{ margin: dimensions.moderate(10) }}
                                    />
                                    <TextComp textColor={colors.TEXT__PRIMARY} fontWeight={fontWeights.bold} fontSize={fontSizes.normal} value={t('Demo')}></TextComp>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.item_box, {backgroundColor:colors.BG__WHITE}]}>
                            <TouchableOpacity
                                style={[styles.item_box_touchable]}
                                activeOpacity={0.8}
                                onPress={() => {
                                    setShowEnterExperian(true);
                                }}

                            >
                                <View style={[styles.item_box_icon]}>
                                    <IC_ACCOUNT
                                        fill={colors.BUTTON__SUCCESS}
                                        height={dimensions.moderate(80)}
                                        width={dimensions.moderate(80)}
                                        style={{ margin: dimensions.moderate(10) }}
                                    />
                                    <TextComp textColor={colors.TEXT__SUCCESS} fontWeight={fontWeights.bold} fontSize={fontSizes.normal} value={t('account')}></TextComp>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.container_list_diary, { backgroundColor: colors.BG__SCREEN }]}>

                        <View style={{ display: 'flex', flexDirection: 'row' }}>

                            <View style={{ padding: dimensions.moderate(10), paddingLeft:dimensions.moderate(20), width: '50%' }} >
                                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                    <InputField
                                        showSoftInputOnFocus={false}
                                        label={t("common_from_date")}
                                        right_icon="calendar"
                                        fontSize={fontSizes.verySmall}
                                        value={from_dt}
                                        onPressIn={showFromDatePicker}
                                        on_press_right_icon={showFromDatePicker}
                                    />
                                </TouchableWithoutFeedback>
                                <DatePicker
                                    isVisible={isFromDtVisible}
                                    date={moment(from_dt, 'DD/MM/YYYY').toDate()}
                                    mode="date"
                                    onConfirm={fromDtConfirm}
                                    onCancel={() => hideDt(0)}
                                    locale="vi-VN"
                                />
                            </View>

                            <View style={{ padding: dimensions.moderate(10), paddingRight:dimensions.moderate(20), width: '50%' }}>
                                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                                    <InputField
                                        showSoftInputOnFocus={false}
                                        value={to_dt}
                                        onPressIn={showToDatePicker}
                                        on_press_right_icon={showToDatePicker}
                                        fontSize={fontSizes.verySmall}
                                        label={t("common_to_date")}
                                        right_icon="calendar"
                                    />
                                </TouchableWithoutFeedback>
                                <DatePicker
                                    isVisible={isToDtVisible}
                                    date={moment(to_dt, 'DD/MM/YYYY').toDate()}
                                    mode="date"
                                    onConfirm={toDtConfirm}
                                    onCancel={() => hideDt(1)}
                                    locale="vi-VN"
                                />
                            </View>




                        </View>

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
                                                    <RowEmployee item={item}></RowEmployee>
                                                </TouchableOpacity>
                                            </View>;
                                        })}

                                    </View>
                                </View>
                            </View>
                            <ActivityIndicator animating={loading} color={colors.BUTTON__PRIMARY} />
                            <View style={{ flex: 1, marginBottom:dimensions.vertical(10) }}>
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

            <ModalSelectStep
                btnText={"reject"}
                _list_step={_list_step}
                closeModal={(status, item) => {
                    setShowSelectStep(false);
                    if (status) setStepSelected(item);
                }}
                focus={true}
                visibleModal={showSelectStep}
            ></ModalSelectStep>
            <ModalExperian
                btnText={"reject"}
                _list_experian={_list_experian}
                closeModal={() => {
                    setShowExperian(false);
                }}
                visibleModal={showExperian}>
            </ModalExperian>

            <ModalInsertEmployee
                closeModal={(message) => {
                    setShowEnterExperian(false);
                }}
                visibleModal={showEnterExperian}>

            </ModalInsertEmployee>
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
        flexDirection: 'row',
        padding: dimensions.vertical(10),
        borderBottomEndRadius: dimensions.moderate(20),
        borderBottomStartRadius: dimensions.moderate(20),
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
