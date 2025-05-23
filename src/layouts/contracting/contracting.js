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
import IC_CLOCK from '../../assets/images/common/ic_clock_time.svg';
import {
    eventList,
    glb_sv,
    screens
} from "../../utils";
import IC_BRANCH from '../../assets/images/common/shop-vendor-icon.svg';
import { dimensions, fontSizes, fontWeights } from "../../styles";
import {
    ButtonComp,
    DatePicker,
    InputField,
    TextComp,
} from "../../basic-components";
import { HeaderLR, HeaderTitle, NotifyAuto } from "../../components";
import moment from "moment";
import { StoreUserInfo } from "../../store-user-info";
import { StoreContext } from "../../store";
import { debounce } from "rxjs";
import IC_COMMISSION from '../../assets/images/common/commission-discounts-icon.svg';
import ContractingHistoryScreen from "./history/history";
import ContractingLarkScreen from "./lark/lark";
import ContractingRemainScreen from "./remain/remain";


export default function ContractingScreen({ navigation, route }) {

    const { userInfo } = useContext(StoreUserInfo);
    const { colors } = useContext(StoreContext);
    const { t } = useTranslation();

    const [category, setCategory] = useState('history');//history, residual, lark

    const [notify, setNotify] = useState({
        show: false,
        titleModal: "",
        iconLeft: "",
        color: "",
    });

    const [search, setSearch] = useState("");
    

    const [isFromDtVisible, setIsFromDtVisible] = useState(false);
    const [isToDtVisible, setIsToDtVisible] = useState(false);

    const fromDtRef = useRef(glb_sv.formatDate(moment().subtract(3, "months").format("DD/MM/YYYY"), null, "YYYYMMDD"));
    const [from_dt, setFrom_dt] = useState(glb_sv.formatDate(moment().subtract(3, "months").format("DD/MM/YYYY"), null, "DD/MM/YYYY"));

    const toDtRef = useRef(glb_sv.formatDate(new Date(), null, "YYYYMMDD"));
    const [to_dt, setTo_dt] = useState(glb_sv.formatDate(new Date(), null, "DD/MM/YYYY"));

    const throttled = useRef(debounce(() => debounceSetReport(), 1000));

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
                        <View style={[styles.item_box, { backgroundColor: category == 'history' ? colors.BG__WHITE : colors.BG__PRIMARY }]}>
                            <TouchableOpacity
                                style={[styles.item_box_touchable]}
                                activeOpacity={0.8}
                                onPress={() => {
                                    // navigation.navigate({
                                    //     name: screens.DemoScreen,
                                    // });
                                    setCategory('history');
                                }}

                            >
                                <View style={[styles.item_box_icon]}>
                                    <IC_CLOCK
                                        fill={category == 'history' ? colors.BUTTON__PRIMARY : colors.BG__WHITE}
                                        height={dimensions.moderate(20)}
                                        width={dimensions.moderate(20)}
                                        style={{ margin: dimensions.moderate(10) }}
                                    />
                                    <TextComp textColor={category == 'history' ? colors.TEXT__PRIMARY : colors.TEXT__WHITE} fontWeight={fontWeights.bold} fontSize={fontSizes.normal} value={t('contracting_history')}></TextComp>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.item_box, { backgroundColor: category == 'lark' ? colors.BG__WHITE : colors.BG__PRIMARY }]}>
                            <TouchableOpacity
                                style={[styles.item_box_touchable]}
                                activeOpacity={0.8}
                                onPress={() => {
                                    //setShowEnterExperian(true);
                                    setCategory('lark');
                                }}

                            >
                                <View style={[styles.item_box_icon]}>
                                
                                    <IC_BRANCH
                                        fill={category == 'lark' ? colors.BUTTON__PRIMARY : colors.BG__WHITE}
                                        height={dimensions.moderate(20)}
                                        width={dimensions.moderate(20)}
                                        style={{ margin: dimensions.moderate(10) }}
                                    />
                                    <TextComp textColor={category == 'lark' ? colors.TEXT__PRIMARY : colors.TEXT__WHITE} fontWeight={fontWeights.bold} fontSize={fontSizes.normal} value={t('contracting_debt')}></TextComp>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.item_box, { backgroundColor: category == 'residual' ? colors.BG__WHITE : colors.BG__PRIMARY }]}>
                            <TouchableOpacity
                                style={[styles.item_box_touchable]}
                                activeOpacity={0.8}
                                onPress={() => {
                                    //setShowEnterExperian(true);
                                    setCategory('residual');
                                }}

                            >
                                <View style={[styles.item_box_icon]}>
                                    <IC_COMMISSION
                                        fill={category == 'residual' ? colors.BUTTON__PRIMARY : colors.BG__WHITE}
                                        height={dimensions.moderate(20)}
                                        width={dimensions.moderate(20)}
                                        style={{ margin: dimensions.moderate(10) }}
                                    />
                                    <TextComp textColor={category == 'residual' ? colors.TEXT__PRIMARY : colors.TEXT__WHITE} fontWeight={fontWeights.bold} fontSize={fontSizes.normal} value={t('contractingResidual')}></TextComp>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[styles.container_list_diary, { backgroundColor: colors.BG__SCREEN }]}>

                        <View style={{ display: 'flex', flexDirection: 'row' }}>

                            <View style={{ padding: dimensions.moderate(10), paddingLeft: dimensions.moderate(20), width: '50%'}} >
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
                        <View style={[styles.item_box_icon, {paddingRight:dimensions.moderate(20), paddingLeft:dimensions.moderate(20), flexDirection:'row'}]}>
                            
                                <InputField
                                        value={search}
                                        label={t("Tên/CCCD hộ khoán, Số HĐ")}
                                        style={[{flex:1}]}
                                        clearButton={true}
                                    //  innerRef={userRef}
                                        onChangeText={(x) => setSearch(x.toLowerCase())}
                                    />
                                    {/* <ButtonComp style={[{marginLeft:dimensions.moderate(20)}]}
                                                icon_name="filter"
                                                onPress={()=>{getListHistoryContracting(1000000000000000000, [])}}
                                                buttonColor={colors.BUTTON__PRIMARY}
                                                text={t("Lọc")}
                                            />
                                        */}
                            </View>

                        {category == 'history' && <ContractingHistoryScreen
                            navigation={navigation}
                            route={route}
                            search={search}
                            category={category}
                            from_dt={from_dt}
                            to_dt={to_dt}
                            notify={(data) => {
                                setNotify(data);
                            }}
                        />}

                        {category == 'residual' &&  <ContractingRemainScreen
                            navigation={navigation}
                            route={route}
                            search={search}
                            category={category}
                            from_dt={from_dt}
                            to_dt={to_dt}
                            notify={(data) => {
                                setNotify(data);
                            }}
                        />}

                        {category == 'lark' && <ContractingLarkScreen
                            navigation={navigation}
                            route={route}
                            category={category}
                            from_dt={from_dt}
                            search={search}
                            to_dt={to_dt}
                            notify={(data) => {
                                setNotify(data);
                            }}
                        />
}


                        
                       
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
