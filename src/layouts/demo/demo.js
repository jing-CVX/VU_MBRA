import React, { useContext, useEffect, useRef, useState } from "react";

import {
    View,
    StyleSheet,
    SafeAreaView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";

import { dimensions, color, fontSizes, fontWeights } from "../../styles";
import { ScrollView } from "react-native-gesture-handler";
import { ButtonComp, CheckboxComp, DatePicker, IconComp, InputField, TextComp } from "../../basic-components";
import { useTranslation } from "react-i18next";
import { glb_sv, screens } from "../../utils";
import moment from "moment";
import { debounce } from "rxjs";
import { HeaderLR, HeaderTitle } from "../../components";
import { StoreContext } from "../../store";

export default function DemoScreen({ navigation, route }) {
    const { t } = useTranslation();
    const { colors } = useContext(StoreContext);
    const [password, setPassword] = useState("");
    const [text, setText] = useState("");
    const [number, setNumber] = useState("");
    const rememberRef = useRef(true);
    const [saveLogin, setSaveLogin] = useState(true);

    //-----------------DATE Variable-----------------
    const [isFromDtVisible, setIsFromDtVisible] = useState(false);
    const [isToDtVisible, setIsToDtVisible] = useState(false);

    const fromDtRef = useRef(glb_sv.formatDate(moment().subtract(3, "months").format("DD/MM/YYYY"), null, "YYYYMMDD"));
    const [from_dt, setFrom_dt] = useState(glb_sv.formatDate(moment().subtract(3, "months").format("DD/MM/YYYY"), null, "DD/MM/YYYY"));

    const toDtRef = useRef(glb_sv.formatDate(new Date(), null, "YYYYMMDD"));
    const [to_dt, setTo_dt] = useState(glb_sv.formatDate(new Date(), null, "DD/MM/YYYY"));

    const throttled = useRef(debounce(() => debounceSetReport(), 1000));



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

    //checkbox

    const checkRememberUserInfo = (e) => {
        setSaveLogin(!saveLogin);
        rememberRef.current = !rememberRef.current;
      };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.BG__SCREEN }}>

            <ScrollView>
                <View style={{ padding: dimensions.moderate(20) }}>
                    <TextComp value={t('inputCp')} fontSize={fontSizes.medium} fontWeight={fontWeights.bold} textColor={colors.TEXT__PRIMARY} style={{ marginBottom: dimensions.vertical(20) }}></TextComp>
                    <InputField value={text} onChangeText={(x) => setText(x)} type={'text'} label={t('Input text')}></InputField>
                    <InputField value={number} onChangeText={(x) => setNumber(x)} type={'number'} label={t('Input number')}></InputField>
                    <InputField value={password} onChangeText={(x) => setPassword(x)} type={'password'} label={t('Input password')}></InputField>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>

                        <View style={{ paddingRight: dimensions.moderate(10), width: '50%' }} >
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

                        <View style={{ paddingLeft: dimensions.moderate(10), width: '50%' }}>
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
                    
                    <View >
                            <CheckboxComp
                                type="checkbox"
                                checked={saveLogin}
                                textColor={colors.TEXT__SCREEN}
                                onPress={checkRememberUserInfo}
                                label={t("login_remember")}
                            />
                        </View>
                </View>

                <View style={{ padding: dimensions.moderate(20) }}>
                    <TextComp value={t('Component Icon')} fontSize={fontSizes.medium} fontWeight={fontWeights.bold} textColor={colors.TEXT__PRIMARY} style={{ marginBottom: dimensions.vertical(20) }}></TextComp>
                    <View style={styles.flex_row}>
                        <IconComp mode={'contained'} icon_nm={'key'} iconColor={colors.BUTTON__PRIMARY}></IconComp>
                        <IconComp mode={'outlined'} icon_nm={'key'} iconColor={colors.BUTTON__DANGER}></IconComp>
                        <IconComp mode={'contained-tonal'} icon_nm={'key'} iconColor={colors.BUTTON__SUCCESS}></IconComp>
                    </View>
                    {/* // the name of an icon from MaterialCommunityIcon: https://oblador.github.io/react-native-vector-icons/ */}
                </View>

                <View style={{ padding: dimensions.moderate(20) }}>
                    <TextComp value={t('Component Button')} fontSize={fontSizes.medium} fontWeight={fontWeights.bold} textColor={colors.TEXT__PRIMARY} style={{ marginBottom: dimensions.vertical(20) }}></TextComp>
                    <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                        <ButtonComp onPress={() => { }} style={{ marginBottom: dimensions.vertical(10), marginRight: dimensions.moderate(20) }} text={'Button'} mode={'contained'} buttonColor={colors.BUTTON__SUCCESS} icon_name={'key'}></ButtonComp>
                        <ButtonComp onPress={() => { }} text={'Button'} mode={'outlined'} buttonColor={colors.BUTTON__DANGER}></ButtonComp>
                    </View>
                </View>


            </ScrollView>





        </SafeAreaView>
    );
}


const styles = StyleSheet.create({

    flex_row: {
        display: 'flex',
        flexDirection: 'row'
    },

    container_info: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: dimensions.vertical(5)
    },

    container_info: {
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: dimensions.vertical(5),
        position: "relative",
    },


});


