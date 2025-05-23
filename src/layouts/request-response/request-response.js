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
    TouchableOpacity,
    TouchableWithoutFeedback
} from "react-native";
import {
    eventList,
    glb_sv,
    screens
} from "../../utils";
import { dimensions, fontSizes, fontWeights } from "../../styles";
import {
    DatePicker,
    IconComp,
    InputField,
    TextComp,
} from "../../basic-components";
import { HeaderLR, HeaderTitle, NotifyAuto } from "../../components";
import moment from "moment";
import { StoreUserInfo } from "../../store-user-info";
import { StoreContext } from "../../store";
import { debounce } from "rxjs";
import RequestScreen from "./request/request";
import ReceiveScreen from "./receive/receive";
import { ModalRequest } from "../../project-components/modal-request/modal-request";
import { TypeLevelUser } from "../../utils/constant/key";


export default function RequestResponseScreen({ navigation, route }) {

    const { userInfo } = useContext(StoreUserInfo);
    const { colors } = useContext(StoreContext);
    const { t } = useTranslation();

    const [category, setCategory] = useState('request');//request, receive
    const [notify, setNotify] = useState({
        show: false,
        titleModal: "",
        iconLeft: "",
        color: "",
    });

    const [isFromDtVisible, setIsFromDtVisible] = useState(false);
    const [isToDtVisible, setIsToDtVisible] = useState(false);

    const fromDtRef = useRef(glb_sv.formatDate(moment().subtract(3, "months").format("DD/MM/YYYY"), null, "YYYYMMDD"));
    const [from_dt, setFrom_dt] = useState(glb_sv.formatDate(moment().subtract(3, "months").format("DD/MM/YYYY"), null, "DD/MM/YYYY"));

    const toDtRef = useRef(glb_sv.formatDate(new Date(), null, "YYYYMMDD"));
    const [to_dt, setTo_dt] = useState(glb_sv.formatDate(new Date(), null, "DD/MM/YYYY"));

    const throttled = useRef(debounce(() => debounceSetReport(), 1000));

    const [search, setSearch] = useState("");


    const [showRequest, setShowRequest] = useState(false);
    const [statusAddRequest, setStatusAddRequest] = useState(false);

    if (!userInfo || !userInfo.user_id) {
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
        const unsubscribe = navigation.addListener("focus", (e) => {
            setTimeout(() => {
                console.log('kaiii',route);
            }, 3000);
            focusForm();
        });
        return unsubscribe;
    }, [navigation]);



    const focusForm = () => {
        setCategory(route.params?.category || 'request');
    }
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
                        <View style={[styles.item_box, { backgroundColor: category == 'request' ? colors.BG__WHITE : colors.BG__PRIMARY }]}>
                            <TouchableOpacity
                                style={[styles.item_box_touchable]}
                                activeOpacity={0.8}
                                onPress={() => {
                                    if (category == 'request') return;
                                    setCategory('request');
                                }}
                            >
                                <View style={[styles.item_box_icon]}>
                                    <IconComp style={{ margin: 0, padding: 0 }} iconSize={fontSizes.small} icon_nm={'send'} iconColor={category == 'request' ? colors.BUTTON__PRIMARY : colors.BG__WHITE}></IconComp>
                                    <TextComp textColor={category == 'request' ? colors.TEXT__PRIMARY : colors.TEXT__WHITE} fontWeight={fontWeights.bold} fontSize={fontSizes.normal} value={t('requestSent')}></TextComp>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.item_box, { backgroundColor: category == 'receive' ? colors.BG__WHITE : colors.BG__PRIMARY }]}>
                            <TouchableOpacity
                                style={[styles.item_box_touchable]}
                                activeOpacity={0.8}
                                onPress={() => {
                                    if (category == 'receive') return;
                                    setCategory('receive');
                                }}
                            >
                                <View style={[styles.item_box_icon]}>
                                    <IconComp style={{ margin: 0, padding: 0 }} iconSize={fontSizes.small} icon_nm={'comment'} iconColor={category == 'receive' ? colors.BUTTON__PRIMARY : colors.BG__WHITE}></IconComp>
                                    <TextComp textColor={category == 'receive' ? colors.TEXT__PRIMARY : colors.TEXT__WHITE} fontWeight={fontWeights.bold} fontSize={fontSizes.normal} value={t('requestReceive')}></TextComp>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.container_list_diary, { backgroundColor: colors.BG__SCREEN }]}>
                        <View style={{ display: 'flex', flexDirection: 'row' }}>
                            <View style={{ padding: dimensions.moderate(10), paddingLeft: dimensions.moderate(20), width: '50%' }} >
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
                            <View style={{ padding: dimensions.moderate(10), paddingRight: dimensions.moderate(20), width: '50%' }}>
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
                    <View style={[styles.item_box_icon, {flexDirection:'row', paddingRight:dimensions.moderate(20), paddingLeft:dimensions.moderate(20)}]}>
                                
                                <InputField
                                        value={search}
                                        label={t("Tìm kiếm")}
                                        style={[{flex:1}]}
                                        clearButton={true}
                                    //  innerRef={userRef}
                                        onChangeText={(x) => setSearch(x.toLowerCase())}
                                    />
                                    
                            </View>
                        {category == 'request' && <RequestScreen
                            navigation={navigation}
                            route={route}
                            statusAddRequest={statusAddRequest}
                            category={category}
                            from_dt={from_dt}
                            to_dt={to_dt}
                            search={search}
                            notify={(data) => {
                                setNotify(data);
                            }}
                        />}

                        {category == 'receive' && <ReceiveScreen
                            navigation={navigation}
                            route={route}
                            category={category}
                            from_dt={from_dt}
                            to_dt={to_dt}
                            search={search}

                            notify={(data) => {
                                setNotify(data);
                            }}
                        />}

                    </View>
                </View>


            </View>

           {
            category=='request' && <TouchableOpacity activeOpacity={0.8} style={{ position: 'absolute', bottom: dimensions.moderate(30), right: dimensions.moderate(30), zIndex: 99999999, backgroundColor: colors.BUTTON__PRIMARY, borderRadius: dimensions.moderate(50), width: dimensions.moderate(40), height: dimensions.moderate(40), display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <IconComp onPress={() => {

                setShowRequest(true);
                setStatusAddRequest(false);

            }} style={{ margin: 0, padding: 0 }} iconSize={fontSizes.huge} icon_nm={'plus'} iconColor={colors.TEXT__WHITE}></IconComp>

        </TouchableOpacity>
           }

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

            <ModalRequest
                closeModal={(status) => {
                    setShowRequest(false);
                    if(!!status) setStatusAddRequest(true);
                }}
                farmer_id={userInfo.farmer_id}

                type={userInfo.user_level == TypeLevelUser.farmer ? '1' : '0'}//type

                notify={(data) => {
                    setNotify(data);
                }}
                visibleModal={showRequest}>
            </ModalRequest>


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
