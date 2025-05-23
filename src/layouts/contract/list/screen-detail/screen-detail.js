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
    TouchableWithoutFeedback,
    BackHandler,
} from "react-native";
import {
    eventList,
    glb_sv,
    screens,
} from "../../../../utils";
import { dimensions, fontSizes, fontWeights } from "../../../../styles";
import {
    DatePicker,
    InputField,
    TextComp,
} from "../../../../basic-components";
import { HeaderLR, HeaderTitle, NotifyAuto } from "../../../../components";
import moment from "moment";
import { StoreUserInfo } from "../../../../store-user-info";
import { StoreContext } from "../../../../store";
import { debounce } from "rxjs";
import IC_CONTRACT from '../../../../assets/images/common/user-data-icon.svg';

import { ModalOrderPurchaseDetail } from "../../../../project-components/modal-order-purchase-detail/modal-order-purchase-detail";
import { KeyGetListPurchasing } from "../../../../utils/constant/key";
import DetailScreen from "./detail/detail";
import ContractingScreen from "./contracting/contracting";
import FarmerScreen from "./farmer-real/farmer-real";
import TreeScreen from "./tree-real/tree-real";

export default function ContractDetailScreen({ navigation, route }) {

    const { userInfo } = useContext(StoreUserInfo);
    const { colors } = useContext(StoreContext);
    const { t } = useTranslation();
    const [category, setCategory] = useState('contract'); //contract, contracting, farmer_real, tree_real
    const [notify, setNotify] = useState({
        show: false,
        titleModal: "",
        iconLeft: "",
        color: "",
    });

    const [modalDetail, setModalDetail] = useState({
        show: false,
        id: 0,
        order: {}
    });


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
                        title={t(route?.params?.contract_no)}
                        onPress={() => {
                            backAction;
                        }}
                    />
                ),
            });

            if(!route?.params?.id) backAction();

            const backAction = () => {

                navigation.navigate({
                    name: screens.REQUEST_RESPONSE
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



    //-----------------------REFRESH-----------------------

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
                        <View style={[styles.item_box, { backgroundColor: category == 'contract' ? colors.BG__WHITE : colors.BG__PRIMARY }]}>
                            <TouchableOpacity
                                style={[styles.item_box_touchable]}
                                activeOpacity={0.8}
                                onPress={() => {
                                    setCategory('contract');
                                }}

                            >
                                <View style={[styles.item_box_icon]}>
                                    <IC_CONTRACT
                                        fill={category == 'contract' ? colors.BUTTON__PRIMARY : colors.BG__WHITE}
                                        height={dimensions.moderate(20)}
                                        width={dimensions.moderate(20)}
                                        style={{ margin: dimensions.moderate(10) }}
                                    />
                                    <TextComp textColor={category == 'contract' ? colors.TEXT__PRIMARY : colors.TEXT__WHITE} fontWeight={fontWeights.bold} fontSize={fontSizes.normal} value={t('contract')}></TextComp>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.item_box, { backgroundColor: category == 'farmer_real' ? colors.BG__WHITE : colors.BG__PRIMARY }]}>
                            <TouchableOpacity
                                style={[styles.item_box_touchable]}
                                activeOpacity={0.8}
                                onPress={() => {
                                    setCategory('farmer_real');
                                }}

                            >
                                <View style={[styles.item_box_icon]}>
                                    <IC_CONTRACT
                                        fill={category == 'farmer_real' ? colors.BUTTON__PRIMARY : colors.BG__WHITE}
                                        height={dimensions.moderate(20)}
                                        width={dimensions.moderate(20)}
                                        style={{ margin: dimensions.moderate(10) }}
                                    />
                                    <TextComp textColor={category == 'farmer_real' ? colors.TEXT__PRIMARY : colors.TEXT__WHITE} fontWeight={fontWeights.bold} fontSize={fontSizes.normal} value={t('farmer_real')}></TextComp>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.item_box, { backgroundColor: category == 'contracting' ? colors.BG__WHITE : colors.BG__PRIMARY }]}>
                            <TouchableOpacity
                                style={[styles.item_box_touchable]}
                                activeOpacity={0.8}
                                onPress={() => {
                                    setCategory('contracting');
                                }}

                            >
                                <View style={[styles.item_box_icon]}>
                                    <IC_CONTRACT
                                        fill={category == 'contracting' ? colors.BUTTON__PRIMARY : colors.BG__WHITE}
                                        height={dimensions.moderate(20)}
                                        width={dimensions.moderate(20)}
                                        style={{ margin: dimensions.moderate(10) }}
                                    />
                                    <TextComp textColor={category == 'contracting' ? colors.TEXT__PRIMARY : colors.TEXT__WHITE} fontWeight={fontWeights.bold} fontSize={fontSizes.normal} value={t('contracting')}></TextComp>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.item_box, { backgroundColor: category == 'tree_real' ? colors.BG__WHITE : colors.BG__PRIMARY }]}>
                            <TouchableOpacity
                                style={[styles.item_box_touchable]}
                                activeOpacity={0.8}
                                onPress={() => {
                                    setCategory('tree_real');
                                }}

                            >
                                <View style={[styles.item_box_icon]}>
                                    <IC_CONTRACT
                                        fill={category == 'tree_real' ? colors.BUTTON__PRIMARY : colors.BG__WHITE}
                                        height={dimensions.moderate(20)}
                                        width={dimensions.moderate(20)}
                                        style={{ margin: dimensions.moderate(10) }}
                                    />
                                    <TextComp textColor={category == 'tree_real' ? colors.TEXT__PRIMARY : colors.TEXT__WHITE} fontWeight={fontWeights.bold} fontSize={fontSizes.normal} value={t('tree_real')}></TextComp>
                                </View>
                            </TouchableOpacity>
                        </View>


                    </View>


                    {category == 'contract' && <DetailScreen
                        navigation={navigation}
                        route={route}
                        category={category}
                        id={route?.params?.id}
                        notify={(data) => {
                            setNotify(data);
                        }}
                    />}
                    {category == 'contracting' && <ContractingScreen
                        navigation={navigation}
                        route={route}
                        category={category}
                        id={route?.params?.id}
                        notify={(data) => {
                            setNotify(data);
                        }}
                    />}

                    {category == 'farmer_real' && <FarmerScreen
                        navigation={navigation}
                        route={route}
                        category={category}
                        id={route?.params?.id}
                        notify={(data) => {
                            setNotify(data);
                        }}
                    />}

                    {category == 'tree_real' && <TreeScreen
                        navigation={navigation}
                        route={route}
                        category={category}
                        id={route?.params?.id}
                        notify={(data) => {
                            setNotify(data);
                        }}
                    />}





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


            <ModalOrderPurchaseDetail
                closeModal={() => {
                    setModalDetail({
                        show: false,
                        id: 0,
                        order: {}
                    });
                }}
                order={modalDetail.order}
                visibleModal={modalDetail.show}
                id={modalDetail.id}
                notify={(data) => {
                    notify(data)
                }}

            ></ModalOrderPurchaseDetail>
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
        width: "50%",
        elevation: 1,
        borderRadius: dimensions.moderate(10),

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
        flexWrap: "wrap",
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
