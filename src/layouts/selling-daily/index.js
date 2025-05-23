import React, { useEffect, useState, useRef, useContext } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Keyboard,
  // TouchableOpacity,
} from "react-native";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";

import { dimensions, fontSizes, fontWeights } from "../../styles";
// import {ButtonComp} from '../../basic-components';
import { Divider } from "react-native-paper";
import { SearchBar, EmptyRows, NotAuthView } from "../../components";
import { StoreContext } from "../../store";
// import { StoreUserInfo } from "../../store-user-info";
import { InputField, DatePicker, TextComp } from "../../basic-components";
import { RadioGroup } from "../../project-components";
import { SettlDtDetail } from "./order-detail";

import {
  sendRequest,
  serviceList,
  FormatNumber,
  screens,
  glb_sv,
} from "../../utils";
import { RowItem } from "./rows-order";

const settlType = [
  { o_1: "%", o_2: "Tất cả", o_6: true },
  { o_1: "Y", o_2: "Đã hoàn tất" },
  { o_1: "N", o_2: "Còn nợ" },
];

export default function SellingRpScreen({ navigation, route }) {
  const { t } = useTranslation();
  //-- filter information
  const { colors } = useContext(StoreContext);
  const userInfoRef = useRef(glb_sv.sessionInfo);
  const [isFromDtVisible, setIsFromDtVisible] = useState(false);
  const [isToDtVisible, setIsToDtVisible] = useState(false);
  const [from_dt, setFrom_dt] = useState(
    glb_sv.formatDate(new Date(), null, "DD/MM/YYYY")
  );
  const [to_dt, setTo_dt] = useState(
    glb_sv.formatDate(new Date(), null, "DD/MM/YYYY")
  );
  const [nameSearch, setnameSearch] = useState(null);
  const nameSearchRef = useRef("");
  const [idUserSearch, setIdUserSearch] = useState(null);
  const idUserSearchRef = useRef("");
  const settlTypeRef = useRef("%");
  const searchRef = useRef(null);
  // const getSettlListFlag = useRef(false);
  const fromDtRef = useRef(glb_sv.formatDate(new Date(), null, "YYYYMMDD"));
  const toDtRef = useRef(glb_sv.formatDate(new Date(), null, "YYYYMMDD"));
  //-- data information
  const [data, setData] = useState([]);
  const [totalValues, setTotalValues] = useState(null);
  const throttled = useRef(debounce(() => debounceSettlReport(), 1000));
  //-- get detail information
  const [freshing, setFreshing] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [isRepay, setIsRepay] = useState("N");
  const [orderId, setOrderId] = useState(0);
  const [orderValueDt, setOrderValueDt] = useState(0);
  const [openSellDt, setOpenSellDt] = useState(false);
  const [dataDetail, setDataDetail] = useState([]);
  const getDetailFlagRef = useRef(false);
  const setStatusSettlFlagRef = useRef(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      userInfoRef.current = glb_sv.sessionInfo;
      throttled.current();
    });

    return () => {
      unsubscribe;
      setOpenSellDt(false);
      throttled.current.cancel();
    };
  }, [navigation]);

  const debounceSettlReport = () => {
    throttled.current.cancel();
    //getSettlList();
  };

  const getSettlList = () => {
    Keyboard.dismiss();
    if (userInfoRef.current?.user_levl == "1") {
      idUserSearchRef.current = userInfoRef.current?.user_id;
    }
    const InVal = [
      fromDtRef.current,
      toDtRef.current,
      99999999,
      "1",
      nameSearchRef.current == "" ? "%" : "%" + nameSearchRef.current + "%",
      settlTypeRef.current,
      idUserSearchRef.current == "" ? "%" : "%" + idUserSearchRef.current + "%",
    ];
    sendRequest(
      serviceList.COMMON_EXPORT_GET_EXPDT_ALL,
      InVal,
      getSettlListResultProc,
      true,
      timeOutFunct
    );
    setFreshing(true);
  };
  const getSettlListResultProc = (reqInfoMap, message) => {
    setFreshing(false);
    if (message["PROC_STATUS"] == 0) {
      navigation.navigate(screens.ALERT_MODAL, {
        notifyType: "error",
        errCode: message["PROC_CODE"],
        content: message["PROC_MESSAGE"],
      });
      setData([]);
      setTotalValues([]);
      return;
    } else {
      setData(message["PROC_DATA"]["rows"] ? message["PROC_DATA"]["rows"] : []);
      setTotalValues(
        sumValues(
          message["PROC_DATA"]["rows"] ? message["PROC_DATA"]["rows"] : []
        )
      );
    }
  };

  const timeOutFunct = (reqInfo) => {
    setFreshing(false);
    setData([]);
    setTotalValues([]);
    navigation.navigate(screens.ALERT_MODAL, {
      notifyType: "error",
      errCode: "",
      content: t("cannot_receive_answer_from_server"),
    });
  };

  const getSettDetail = (order_id) => {
    if (getDetailFlagRef.current) return;
    getDetailFlagRef.current = true;
    const InVal = [order_id];
    sendRequest(
      serviceList.COMMON_EXPORT_GET_ORDER_DT,
      InVal,
      getSettDetailProc,
      true,
      getDetailSetllTimeOutFunct
    );
    setDataDetail([]);
  };
  const getSettDetailProc = (reqInfoMap, message) => {
    getDetailFlagRef.current = false;
    if (message["PROC_STATUS"] == 0) {
      navigation.navigate(screens.ALERT_MODAL, {
        notifyType: "error",
        errCode: message["PROC_CODE"],
        content: message["PROC_MESSAGE"],
      });
      return;
    } else {
      setDataDetail(
        message["PROC_DATA"]["rows"] ? message["PROC_DATA"]["rows"] : []
      );
    }
  };
  const getDetailSetllTimeOutFunct = (reqInfo) => {
    getDetailFlagRef.current = false;
    navigation.navigate(screens.ALERT_MODAL, {
      notifyType: "error",
      errCode: "",
      content: t("cannot_receive_answer_from_server"),
    });
  };

  const sumValues = (arr) => {
    const sum = arr.reduce((total, item) => {
      return total + item?.o_10;
    }, 0);
    return sum;
  };

  const fromDtConfirm = (date) => {
    const dt = glb_sv.formatDate(date, null, "DD/MM/YYYY");
    fromDtRef.current = glb_sv.formatDate(date, null, "YYYYMMDD");
    hideDt(0);
    setFrom_dt(dt);
    Keyboard.dismiss();
    throttled.current();
  };
  const toDtConfirm = (date) => {
    const dt = glb_sv.formatDate(date, null, "DD/MM/YYYY");
    toDtRef.current = glb_sv.formatDate(date, null, "YYYYMMDD");
    hideDt(1);
    setTo_dt(dt);
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

  const onChangeSearchInput = (value) => {
    nameSearchRef.current = value ? value.toUpperCase() : "";
    setnameSearch(nameSearchRef.current);
    throttled.current();
  };

  const onChangeIdUserSearchInput = (value) => {
    idUserSearchRef.current = value ? value.toLowerCase() : "";
    setIdUserSearch(idUserSearchRef.current);
    throttled.current();
  };

  const onChangeSettlType = (item) => {
    settlTypeRef.current = item.o_1;
    throttled.current();
  };

  const onPressRow = (item) => {
    //-- get detail information
    getSettDetail(item.o_1);
    setOpenSellDt(true);
    setOrderValueDt(item.o_10);
    setOrderId(item.o_1);
    setIsRepay(item.o_12);
  };

  const confirm_payment = (order_Id) => {
    //-- get detail confirm_payment
    if (setStatusSettlFlagRef.current) return;
    setStatusSettlFlagRef.current = true;
    setProcessing(true);
    const InVal = [order_Id, "Y"];
    sendRequest(
      serviceList.COMMON_EXPORT_UPDT_SETTL,
      InVal,
      confirm_paymentProc,
      true,
      confirm_paymentTimeOutFunct
    );
  };

  const confirm_paymentProc = (reqInfoMap, message) => {
    setStatusSettlFlagRef.current = false;
    setProcessing(false);
    if (message["PROC_STATUS"] == 0) {
      navigation.navigate(screens.ALERT_MODAL, {
        notifyType: "error",
        errCode: message["PROC_CODE"],
        content: message["PROC_MESSAGE"],
      });
      return;
    } else {
      getSettlList();
      setOpenSellDt(false);
    }
  };
  const confirm_paymentTimeOutFunct = (reqInfo) => {
    setStatusSettlFlagRef.current = false;
    setProcessing(false);
    navigation.navigate(screens.ALERT_MODAL, {
      notifyType: "error",
      errCode: "",
      content: t("cannot_receive_answer_from_server"),
    });
  };

  return (
    <>
          <SafeAreaView>
            <View style={styles.container}>
              <View style={styles.oneRowItem}>
                <SearchBar
                  label={t("cust_name")}
                  // placeholder={t('cust_name')}
                  value={nameSearch}
                  innerRef={searchRef}
                  onChangeText={(value) => {
                    onChangeSearchInput(value);
                  }}
                />
              </View>
              {/* {userInfo?.user_levl && userInfo?.user_levl == "0" && ( */}
              {userInfoRef.current?.user_levl &&
                userInfoRef.current?.user_levl == "0" && (
                  <View style={styles.oneRowItem}>
                    <SearchBar
                      label={t("user_id_of_staff")}
                      // placeholder={t('user_id_of_staff')}
                      value={idUserSearch}
                      onChangeText={(value) => {
                        onChangeIdUserSearchInput(value);
                      }}
                    />
                  </View>
                )}
              <View style={styles.rangeDate}>
                <View style={{ flex: 1, marginRight: dimensions.indent / 3 }}>
                  <InputField
                    label={t("from_setll_date")}
                    value={from_dt}
                    right_icon="calendar"
                    onPressIn={showFromDatePicker}
                    on_press_right_icon={showFromDatePicker}
                  />
                </View>
                <View style={{ flex: 1, marginLeft: dimensions.indent / 3 }}>
                  <InputField
                    label={t("to_setll_date")}
                    value={to_dt}
                    right_icon="calendar"
                    onPressIn={showToDatePicker}
                    on_press_right_icon={showToDatePicker}
                  />
                </View>
              </View>

              <DatePicker
                isVisible={isFromDtVisible}
                mode="date"
                onConfirm={fromDtConfirm}
                onCancel={() => hideDt(0)}
                locale="vi-VN"
              />
              <DatePicker
                isVisible={isToDtVisible}
                mode="date"
                onConfirm={toDtConfirm}
                onCancel={() => hideDt(1)}
                locale="vi-VN"
              />
              <View style={styles.rangeDate}>
                <TextComp
                  fontSize={fontSizes.small}
                  textColor={colors.SECOND__CONTENT__COLOR}
                  value={t("status_setl_filter")}
                />
                <View
                  style={{
                    flex: 1,
                    marginLeft: dimensions.moderate(3),
                    marginRight: dimensions.moderate(3),
                  }}
                >
                  <Divider style={{ color: colors.SECOND__CONTENT__COLOR }} />
                </View>
              </View>

              <RadioGroup
                data={settlType}
                direction="row"
                onPress={onChangeSettlType}
                divider={false}
              />

              <Divider
                style={{
                  // marginTop: dimensions.indent / 2,
                  marginBottom: dimensions.moderate(5),
                  color: colors.SECOND__BG__COLOR,
                }}
              />

              <ScrollView>
                <View>
                  {data && data.length > 0 ? (
                    data.map((item, index) => (
                      <View key={index}>
                        <RowItem
                          index={index}
                          onPress={onPressRow}
                          item={item}
                        />
                        <Divider />
                      </View>
                    ))
                  ) : (
                    <EmptyRows />
                  )}
                </View>
              </ScrollView>
            </View>
          </SafeAreaView>

          <View
            style={{
              ...styles.bottomContainer,
              backgroundColor: colors.FOURTH__CONTENT__COLOR,
              paddingRight: dimensions.indent,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <View>
                <TextComp
                  fontSize={fontSizes.medium}
                  textColor={colors.PRIMARY__BG__COLOR}
                  value={t("total_values") + ": "}
                />
              </View>
              <View>
                <TextComp
                  fontSize={fontSizes.medium}
                  fontWeight={fontWeights.bold}
                  textColor={colors.PRIMARY__BG__COLOR}
                  value={FormatNumber(totalValues) + " đ"}
                />
              </View>
            </View>
          </View>

          <SettlDtDetail
            visible={openSellDt}
            closeModal={() => setOpenSellDt(false)}
            orderValue={orderValueDt}
            orderId={orderId}
            data={dataDetail}
            isRepay={isRepay}
            confirm_payment={confirm_payment}
            processing={processing}
          />
        </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: dimensions.indent,
    flexDirection: "column", // with mobile flex Direction has always is column
    height: "auto",
    // marginBottom: dimensions.moderate(70),
    paddingBottom: dimensions.moderate(345),
  },

  rangeDate: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  //-- Bottom -----------
  bottomContainer: {
    width: "100%",
    flexDirection: "row",
    borderTopColor: "#ddd",
    borderTopWidth: 1,
    boxShadow: "0 0 10px rgba(0,0,0,.15)",
    height: dimensions.moderate(40),
    justifyContent: "flex-end",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
});
