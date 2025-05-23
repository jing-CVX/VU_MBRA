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
    FlatList,
} from "react-native";
import { ActivityIndicator } from "react-native";
import {
    screens,
    serviceList
} from "../../../utils";
import { dimensions, fontSizes, fontWeights } from "../../../styles";
import {
    ButtonComp,
    InputField,
    TextComp,
} from "../../../basic-components";
import { IO } from "../../../utils/sendRequest";
import { StoreUserInfo } from "../../../store-user-info";
import { StoreContext } from "../../../store";
import RowListContract from "./row-list/row-list";
import { ContractGetListKey } from "../../../utils/constant/key";


export default function ContractListScreen({ navigation, route, category,  notify , onModalDetail,search}) {

    const { userInfo } = useContext(StoreUserInfo);
    const { colors } = useContext(StoreContext);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(false);
    
    const { t } = useTranslation();


    const [list_item, setList] = useState([]);
    const [totalRow, setTotal] = useState(0);

    const [debouncedSearchParams, setDebouncedSearchParams] = useState({ search: '' });
    
    
        useEffect(() => {
            
            if (category != 'contract') return;
            const handler = setTimeout(() => {
                setDebouncedSearchParams({ 
                    search
                });
            }, 500); 
    
            return () => {
                clearTimeout(handler); 
            };
        }, [search, category]);
    
    
        useEffect(() => {
            if (debouncedSearchParams) {
                getListContract(1000000000000000000, []);
            } 
        }, [debouncedSearchParams]);



    //-----------get-list-word-diary-----------

    const handleScroll = ({ nativeEvent }) => {
        const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
        const isScrollEnd =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
        if (isScrollEnd && !loading) {
            if (!list_item.length || list_item.length >= totalRow) return;
            getListContract(list_item[list_item.length - 1][ContractGetListKey.id], list_item, true); // last_id
        }
    }

    const getListContract = (lastId, list, isGetMore) => {
        console.log('start');
        
        if (loading) return;
        setLoading(true);
        IO.sendRequest(
            serviceList.get_list_contracts,
            [
                lastId, //last_id
                (search || '').trim(), //search
                'all',//type
                0,//land_plot_id
                0, //farmer_id
                0//land_parcel_id:
            ],
            (requestInfo, result) => callBackGetListContract(requestInfo, result, list,isGetMore),
            true,
            timeOutFunct,
            15000,
        );
    };

    const callBackGetListContract = (requestInfo, result, list,isGetMore) => {
        console.log('end');

        let message = result["proc_message"];
        if (+result["proc_status"] == 1) {
            // Xử lý thành công
            let data = result["proc_data"]["rows"];
            setTotal(result["proc_data"]["rowTotal"] || 0);
            if(!isGetMore) {
                setList(data);
            }else{
                setList(prev=>[...prev, ...data])
            }
        } else {
            notify({
                show: true,
                titleModal: message,
                iconLeft: "",
                color: colors.TEXT__DANGER,
            })
        }
        setLoading(false);

    };



    const timeOutFunct = (reqInfo) => {
        setLoading(false);
    };

    //-----------------------REFRESH-----------------------

    const fetchData = () => {
        setTimeout(() => {
            getListContract(1000000000000000, []);
            setRefreshing(false); // Kết thúc quá trình refresh
        }, 500);
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
                        value={`~ ${list_item.length}/${totalRow} ~`}
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
                            {(list_item || []).map((item, index) => {
                                return <View key={index}>
                                    <TouchableOpacity 
                                        onPress={()=>{
                                            navigation.navigate(screens.ContractDetailScreen,
                                                {
                                                    contract_no:item[ContractGetListKey.contract_no],
                                                    id: item[ContractGetListKey.id]
                                                }
                                            )
                                        }}
                                    >
                                      <RowListContract item={item}></RowListContract>
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
                                       value={`~ ${list_item.length}/${totalRow} ~`}
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
        paddingLeft: dimensions.moderate(10),
        paddingRight: dimensions.moderate(10),
        maxWidth:'100%',
        width:'100%',
        marginTop:dimensions.vertical(5),
        justifyContent:'center',
        alignItems: "center",

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
