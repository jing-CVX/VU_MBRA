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
} from "react-native";
import {
    eventList,
    glb_sv,
    screens,
} from "../../utils";
import { dimensions, fontSizes, fontWeights } from "../../styles";
import {
    DatePicker,
    InputField,
    TextComp,
} from "../../basic-components";
import { HeaderLR, HeaderTitle, NotifyAuto } from "../../components";
import moment from "moment";
import { StoreUserInfo } from "../../store-user-info";
import { StoreContext } from "../../store";
import { debounce } from "rxjs";
import IC_CONTRACT from '../../assets/images/common/user-data-icon.svg';

import { ModalOrderPurchaseDetail } from "../../project-components/modal-order-purchase-detail/modal-order-purchase-detail";
import { KeyGetListPurchasing } from "../../utils/constant/key";
import ContractListScreen from "./list/list";

export default function ContractScreen({ navigation, route }) {

    const { userInfo } = useContext(StoreUserInfo);
    const { colors } = useContext(StoreContext);
    const { t } = useTranslation();
    const [category, setCategory] = useState('contract');
    const [search, setSearch] = useState("");
    
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
                    </View>

                        <View style={[styles.item_box_icon, {paddingRight:dimensions.moderate(20), paddingLeft:dimensions.moderate(20)}]}>
                        
                            <InputField
                                    value={search}
                                    label={t("Tên/CCCD hộ khoán, Số HĐ")}
                                    style={[{flex:1}]}
                                    clearButton={true}
                                    onChangeText={(x) => setSearch(x.toLowerCase())}
                                />
                        </View>

                    <View style={[styles.container_list_diary, { backgroundColor: colors.BG__SCREEN }]}>
                 
                        <ContractListScreen
                            navigation={navigation}
                            route={route}
                            search= {search}
                            category={category}
                            notify={(data) => {
                                setNotify(data);
                            }}

                            onModalDetail={(order)=>{
                                setModalDetail({
                                    id:order[KeyGetListPurchasing.id],
                                    order:order || {},
                                    show:true
                                })
                            }}
                        >
                        </ContractListScreen>
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
        flexDirection: "row",
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
