import React, { useContext, useEffect, useState } from "react";
import { ButtonComp, InputField, TextComp } from "../../basic-components";
import { dimensions, fontSizes, color, fontWeights } from "../../styles";
import { useTranslation } from "react-i18next";
import { Modal } from "react-native-paper";
import { View, StyleSheet, ScrollView, Image, Platform } from "react-native";
import { KeyGetListFeedback } from "../../utils/constant/key";
import { TouchableOpacity } from "react-native-gesture-handler";
import { serviceList } from "../../utils";
import { IO } from "../../utils/sendRequest";
import { launchImageLibrary } from 'react-native-image-picker';
import { launchCamera } from 'react-native-image-picker';
import { environment } from "../../environments/environment.prod";
import RNFetchBlob from "rn-fetch-blob";
import axios from "axios";
import ImageView from "react-native-image-viewing";
import { PERMISSIONS, RESULTS } from "react-native-permissions";
import { StoreContext } from "../../store";

export function ModalFeedback({
    visibleModal,
    closeModal,
    fm_request_id,
    type,
    agency_id,
    farmer_id,
    data_update,
    notify
}) {
    const { t } = useTranslation();
    const { colors } = useContext(StoreContext);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState([]);
    const [imageRemove, setImageRemove] = useState([]);
    const [visible, setIsVisible] = useState(false);
    const [indexView, setIndexView] = useState(0);
    const [removeImage, setRemoveImage] = useState(false);
    useEffect(() => {
        setSelectedImage(data_update[KeyGetListFeedback.list_file] || []);
        setImageRemove([]);
        setLoading(false);
        setContent(data_update[KeyGetListFeedback.content] || '');
        setTitle(data_update[KeyGetListFeedback.title] || '');
        setIndexView(0);
    }, []);

    const addFeedback = (title, content) => {
        setLoading(true);
        IO.sendRequest(
            serviceList.insert_feedback,
            [
                title,
                content,
                type,
                farmer_id || 0,
                agency_id || 0,
                fm_request_id
            ],
            (requestInfo, result) => callBackAddFeedback(requestInfo, result),
            true,
            timeOutFunct,
            15000,
            "insert_feedback"
        );

    };

    const callBackAddFeedback = (requestInfo, result) => {

        let message = result["proc_message"];
        if (+result["proc_status"] == 1) {
            let data = result["proc_data"]['rows'][0];
            setTitle('');
            setContent('');
            if (selectedImage.length) {
                uploadImage(selectedImage, data['o_1']);
                return;
            } else {
                setLoading(false);
                notify({
                    show: true,
                    titleModal: message,
                    color: color.LIGHT.GREEN_1,
                });
                closeModal(true);
            }

        } else {
            setLoading(false);
            notify({
                show: true,
                titleModal: message,
                color: color.LIGHT.TEXT__DANGER,
            });
        }
    };

    const uploadImage = async (list_image, pk_id) => {
        try {
            const imgInput = {
                fileType: list_image[0].file?.type,
                file_data: list_image[0].link,
                size: list_image[0].file.fileSize,
                path: "/feedback/",
                encodeType: "base64"
            };
            const url = `${environment.domain + "upload-file/"}`;
            const req = await axios.post(url, imgInput);
            if (req?.data?.success) {
                const result = req.data.data;
                insertFile(
                    'feedback',
                    pk_id,
                    list_image[0].file.fileName,
                    result.fileName,
                    list_image[0].file?.type.split('/')[1],
                    '',
                    list_image[0].file.fileSize,
                    list_image.slice(1, list_image.length)
                )
            }


        } catch (error) {
            return;
        }
    }


    const insertFile = (
        type,
        pk_id,
        name,
        file_path,
        extension,
        mime,
        size,
        list_image
    ) => {
        let sendParams = [
            type,
            pk_id,
            name,
            file_path,
            extension,
            mime,
            size
        ];

        IO.sendRequest(
            serviceList.insert_file,
            sendParams,
            (reqInfoMap, result) => insertFileCallback(reqInfoMap, result, list_image, pk_id),
            true,
            timeOutFunct,
            15000
        );
    };

    const insertFileCallback = (reqInfoMap, result, list_image, pk_id) => {
        if (list_image.length > 0) {
            uploadImage(list_image, pk_id)
        } else {
            setLoading(false);
            notify({
                show: true,
                titleModal: 'uploadSuccess',
                color: color.LIGHT.GREEN_1,
            })
            closeModal(true);
        }

        if (result["proc_status"] == "1") {

        } else {

        }
    };

    const deleteFile = (list) => {
        IO.sendRequest(
            serviceList.delete_list_file,
            [list.map((item) => { return item.id })],
            deleteFileCallback,
            true,
            timeOutFunct,
            15000
        );
    };

    const deleteFileCallback = (reqInfoMap, result) => {
        if (result["proc_status"] == "1") {

        } else {

        }
    };


    const timeOutFunct = (reqInfo) => {
        setLoading(false);
    };

    // Hàm xử lý khi người dùng bấm nút để chọn ảnh
    const openImagePicker = () => {
        const options = {
            mediaType: 'photo',
            includeBase64: false,
        };

        launchImageLibrary(options, async (response) => {
            if (response.didCancel || response.error) {
                return;
            } else {

                let image = response.assets?.[0];

                if (image.fileSize / (1024 * 1024) > 20) {
                    notify({
                        color: color.LIGHT.ORANGE_1,
                        show: true,
                        titleModal: 'image_too_large'
                    })
                    return;
                }

                let filepath = Platform.select({
                    ios: image.uri.replace("file:", ""),
                    android: image.uri.replace('file://', ''),
                });
                try {
                    const base64Data = await RNFetchBlob.fs.readFile(filepath, "base64");
                    setSelectedImage([...selectedImage, {
                        link: base64Data,
                        file: image
                    }]);
                } catch (error) {
                    return;
                }
            }

        });
    };

    const handleCameraLaunch = () => {

        checkDeviceCamera();
        const options = {
            mediaType: 'photo',
            includeBase64: false,
        };

        launchCamera(options, async response => {
            if (response.didCancel || response.error) {
                return;
            } else {

                let image = response.assets?.[0];
                if (image.fileSize / (1024 * 1024) > 20) {
                    notify({
                        color: color.LIGHT.ORANGE_1,
                        show: true,
                        titleModal: 'image_too_large'
                    })
                    return;
                }

                let filepath = Platform.select({
                    ios: image.uri.replace("file:", ""),
                    android: image.uri.replace('file://', ''),
                });
                try {
                    const base64Data = await RNFetchBlob.fs.readFile(filepath, "base64");
                    setSelectedImage([...selectedImage, {
                        link: base64Data,
                        file: image
                    }]);
                } catch (error) {
                    return;
                }
            }
        });
    }

    const checkDeviceCamera = async () => {
        check(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)
            .then((result) => {

                switch (result) {

                    case RESULTS.UNAVAILABLE:
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
                        //  setVisibleCamera(true);
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
                    //   setVisibleCamera(true);
                    break;
                case 'denied':
                    // Không cho phép (từ chối)
                    //  setVisibleCamera(false);
                    break;
            }
        });
    }


    return (
        <Modal
            visible={visibleModal}
            presentationStyle="overFullScreen"
            onDismiss={() => closeModal(false)}
            contentContainerStyle={styles.contentStyle}
        >
            <View style={styles.cardModal}>
                <View>
                    <View style={styles.cardHeader}>
                        <View
                            style={{
                                flex: 1,
                                flexDirection: "row",
                                marginLeft: dimensions.indent,
                                justifyContent: "center",
                                padding: dimensions.moderate(15),

                            }}
                        >
                            <TextComp
                                value={`${t('add_feedback')}`}
                                style={{ textAlign: 'center' }}
                                textColor={color.LIGHT.BLUE_2}
                                fontSize={fontSizes.normal}
                                fontWeight={fontWeights.normal}
                            />

                        </View>

                    </View>
                </View>
                <ScrollView style={{ margin: dimensions.moderate(10), zIndex: 999999999 }}>
                    <InputField label={t('title')}
                        onChangeText={(x) => {
                            setTitle(x);
                        }}
                        value={title}
                    ></InputField>
                    <View>
                        <InputField label={t('content')}
                            multiline={true}
                            numberOfLines={6}
                            height={dimensions.vertical(100)}
                            onChangeText={(x) => {
                                setContent(x);
                            }}
                            value={content}
                        ></InputField>
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
                        <View style={{ flex: 1, marginRight: dimensions.moderate(5) }}>
                            <ButtonComp
                                icon_name={''}
                                buttonColor={color.LIGHT.BG__PRIMARY}
                                mode="text"
                                onPress={() => {
                                    if (selectedImage.length >= 10) {
                                        notify({
                                            show: true,
                                            color: color.LIGHT.ORANGE_1,
                                            titleModal: 'please_max_image'
                                        })
                                        return;
                                    }
                                    openImagePicker();
                                }}
                                text={t('uploadImage')}
                            />
                        </View>
                        <View style={{ flex: 1, marginLeft: dimensions.moderate(5) }}>
                            <ButtonComp
                                icon_name={''}
                                buttonColor={color.LIGHT.BG__PRIMARY}
                                mode="text"
                                onPress={() => {
                                    if (selectedImage.length >= 10) {
                                        notify({
                                            show: true,
                                            color: color.LIGHT.ORANGE_1,
                                            titleModal: 'please_max_image'
                                        })
                                        return;
                                    }
                                    handleCameraLaunch();
                                }}
                                text={t('cameraImage')}
                            />
                        </View>

                    </View>
                    <View>
                        {
                            !selectedImage ? <></> :
                                <>

                                    <View>
                                        {
                                            selectedImage.map((img, index) => {
                                                return <TouchableOpacity onPress={() => {
                                                    if (removeImage) {
                                                        setRemoveImage(false);
                                                        return;
                                                    }
                                                    setIndexView(index);
                                                    setIsVisible(true);
                                                }} key={index} style={{
                                                    padding: dimensions.moderate(10),
                                                    borderWidth: 1,
                                                    borderColor: color.LIGHT.BORDER__COLOR,
                                                    marginTop: dimensions.vertical(10),
                                                    borderRadius: dimensions.moderate(5),
                                                    position: 'relative'
                                                }}>
                                                    <Image
                                                        source={{ uri: `data:image/png;base64,${img.link}` }}
                                                        alt={"skm"}
                                                        style={{
                                                            width: '100%',
                                                            height: dimensions.vertical(200),
                                                            objectFit: 'contain',
                                                        }}
                                                    />
                                                    <View style={{ position: 'absolute', top: dimensions.vertical(10), right: dimensions.moderate(10), zIndex: 999, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                        <TouchableOpacity style={{ padding: dimensions.moderate(10) }} onPress={() => {
                                                            setRemoveImage(true);
                                                            if (img.id) setImageRemove([...imageRemove, img]);
                                                            setSelectedImage(selectedImage.filter(((img, i) => {
                                                                return i != index
                                                            })))
                                                        }} >
                                                            <View style={{ backgroundColor: color.LIGHT.ORANGE_1, zIndex: 999, width: dimensions.moderate(30), height: dimensions.moderate(30), borderRadius: dimensions.moderate(30), display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                <TextComp value={'X'} textColor={color.LIGHT.WHITE}></TextComp>
                                                            </View>
                                                        </TouchableOpacity>
                                                    </View>
                                                </TouchableOpacity>

                                            })
                                        }



                                    </View>
                                </>
                        }

                    </View>


                </ScrollView>
                <View
                    style={{
                        padding: dimensions.moderate(10),
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    <ButtonComp
                        icon_name={'cancel'}
                        btnColor={color.LIGHT.BLUE_2}
                        buttonColor={color.LIGHT.BLUE_2}
                        mode="text"
                        onPress={() => closeModal(false)}
                        text={t('close')}
                        style={{ flex: 1, margin: dimensions.moderate(5) }}
                    />

                    <ButtonComp
                        icon_name={'check'}
                        btnColor={color.LIGHT.BLUE_2}
                        buttonColor={color.LIGHT.GREEN_1}
                        mode="add"
                        loading={loading}
                        disabled={!title.length || !content.length}
                        onPress={() => {
                            addFeedback(title, content);
                            if (imageRemove.length) deleteFile(imageRemove);
                        }}
                        text={t('add')}
                        style={{ flex: 1, margin: dimensions.moderate(5) }}
                    />
                </View>
            </View>
            <ImageView
                images={selectedImage.map((img) => {
                    return { uri: `data:image/png;base64,${img.link}` }
                })}
                imageIndex={indexView}
                visible={visible}
                onRequestClose={() => setIsVisible(false)}
            />
        </Modal>
    );
}

const styles = StyleSheet.create({
    cardModal: {
        backgroundColor: color.LIGHT.WHITE,
        borderRadius: dimensions.moderate(10),
        overflow: "hidden",
        display: 'flex',
        flexDirection: 'column'
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: color.LIGHT.SECOND__BG__COLOR,
    },
    remember_block: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        // marginTop: dimensions.moderate(5),
        marginBottom: dimensions.moderate(5),
    },
    text_link: {
        fontSize: fontSizes.normal,
        color: color.LIGHT.BLUE__COLOR,
        fontWeight: fontSizes.bold,
        paddingHorizontal: dimensions.moderate(5),
    },
    contentStyle: {
        margin: dimensions.indent,
        zIndex: 99999999999999999999999,
        // marginBottom: "90%",
        maxHeight: '100%',
        marginBottom: dimensions.vertical(150),
        marginTop: dimensions.vertical(150),
    },
});
