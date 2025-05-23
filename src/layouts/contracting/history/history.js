import React, {
    useContext,
    useEffect,
    useState,
} from "react";
import { useTranslation } from "react-i18next";
import {
    View,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    RefreshControl,
} from "react-native";
import { ActivityIndicator } from "react-native";
import {
    serviceList
} from "../../../utils";
import { dimensions, fontSizes, fontWeights } from "../../../styles";
import {
    ButtonComp,
    InputField,
    TextComp,
} from "../../../basic-components";
import { IO } from "../../../utils/sendRequest";
import moment from "moment";
import { StoreUserInfo } from "../../../store-user-info";
import { StoreContext } from "../../../store";
import RowHistory from "./row-history/row-history";
import { KeyGetListContracting } from "../../../utils/constant/key";


export default function ContractingHistoryScreen({ navigation, route, category, from_dt, to_dt, notify, search }) {

    const { userInfo } = useContext(StoreUserInfo);
    const { colors } = useContext(StoreContext);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const [_list_contracting, setListContracting] = useState([]);
    const [totalContracting, setTotalContracting] = useState(0);
    const [debouncedSearchParams, setDebouncedSearchParams] = useState({ search: '', from_dt: '', to_dt: '' });


    useEffect(() => {
        console.log('change');
        
        if (category != 'history') return;
        const handler = setTimeout(() => {
            setDebouncedSearchParams({ 
                search, 
                from_dt, 
                to_dt 
            });
        }, 500); 

        return () => {
            clearTimeout(handler); 
        };
    }, [search,from_dt, to_dt, category]);


    useEffect(() => {
        if (debouncedSearchParams) {
            getListHistoryContracting(1000000000000000000, []);
        } 
    }, [debouncedSearchParams]);




    //-----------get-list-word-diary-----------

    const handleScroll = ({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const isScrollEnd =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        if (isScrollEnd && !loading) {
            if (!_list_contracting.length || _list_contracting.length >= totalContracting) return;
            getListHistoryContracting(_list_contracting[_list_contracting.length - 1][KeyGetListContracting.id], _list_contracting); // last_id
        }
    }

    const getListHistoryContracting = (lastId, list) => {
        if (loading) return;
        setLoading(true);
        IO.sendRequest(
            serviceList.get_list_contracting,
            [
                lastId, //last_id
                `%${(search || '').trim()}%`, //search
                userInfo.farmer_id || 0, //farmer_id
                userInfo.agency_id || 0,//agency_id
                "",//contract_no
                0,//tree_id
                moment(from_dt, 'DD/MM/YYYY').format('YYYYMMDD'), //  date_start
                moment(to_dt, 'DD/MM/YYYY').format('YYYYMMDD'),  //date_end
                0,//company id
                0,//branch_id
            ],
            (requestInfo, result) => callBackGetListHistoryContracting(requestInfo, result, list),
            true,
            timeOutFunct,
            15000,
        );
    };

    const callBackGetListHistoryContracting = (requestInfo, result, list) => {
        let message = result["proc_message"];
        setLoading(false);
        if (+result["proc_status"] == 1) {
            // Xử lý thành công
            let data = result["proc_data"]["rows"];

            setTotalContracting(result["proc_data"]["rowTotal"] || 0);
            setListContracting(list.concat(data || []));
        } else {
            notify({
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
            getListHistoryContracting(1000000000000000, []);
            setRefreshing(false); // Kết thúc quá trình refresh
        }, 1000);
    };

    const handleRefresh = () => {
        setRefreshing(true); // Bắt đầu quá trình refresh
        fetchData();
    };

    return (
        <>

        <View style={[{display:'flex' ,flexDirection:'column', paddingRight:dimensions.moderate(10)}]}>
                    <TextComp fontWeights={fontWeights.light}
                                textColor={colors.TEXT__SCREEN}
                                fontSize={fontSizes.verySmall} style={{ textAlign: 'right'}}
                                value={`~ ${_list_contracting.length}/${totalContracting} ~`}
                            ></TextComp>
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
                            {(_list_contracting || []).map((item, index) => {
                                return <View key={index}>
                                    <TouchableOpacity>
                                        <RowHistory item={item}></RowHistory>
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
                        value={`~ ${_list_contracting.length}/${totalContracting} ~`}
                    ></TextComp>
                </View>

            </ScrollView>
        </>


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
        alignItems: "center",
        paddingRight:dimensions.moderate(10),
        paddingLeft:dimensions.moderate(10)
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
