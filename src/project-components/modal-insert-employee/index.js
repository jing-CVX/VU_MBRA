import React, { useContext, useEffect, useState } from "react";
import { ButtonComp, InputField, TextComp } from "../../basic-components";
import { dimensions, fontSizes, color, fontWeights } from "../../styles";
import { useTranslation } from "react-i18next";
import { Modal } from "react-native-paper";
import { View, StyleSheet, ScrollView, Image, Platform } from "react-native";
import { AttachmentType, ProductionExperienceTypeValueStatic } from "../../utils/constant/key";
import { TouchableOpacity } from "react-native-gesture-handler";
import { serviceList } from "../../utils";
import { IO } from "../../utils/sendRequest";
import { launchImageLibrary } from 'react-native-image-picker';
import { launchCamera } from 'react-native-image-picker';
import { environment } from "../../environments/environment.prod";
import RNFetchBlob from "rn-fetch-blob";
import { NotifyAuto } from "../../components";
import axios from "axios";
import ImageView from "react-native-image-viewing";
import { StoreContext } from "../../store";

export function ModalInsertEmployee({
    visibleModal,
    closeModal,
    poDetail,
    poDetailId,
    stepCode,
    poId,
    focus,
    title,
    btnColor,
    btnIcon,
    btnText,
    date
}) {
    const { t } = useTranslation();
    const { colors } = useContext(StoreContext);
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [key, setKey] = useState('');
    const [addKey, setAddKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState([]);
    const [notify, setNotify] = useState({
        show: false,
        titleModal: "",
        iconLeft: "",
        color: "",
    });
    const [visible, setIsVisible] = useState(false);
    const [indexView, setIndexView] = useState(0);
    const [removeImage, setRemoveImage] = useState(false);
    useEffect(() => {
        setKey(`${stepCode}`);
        setSelectedImage([]);
        setLoading(false);
        setContent('');
        setName('');
        setIndexView(0);
    }, [stepCode]);

    const addExperian = (title, content, key) => {
        setLoading(true);

        IO.sendRequest(
            serviceList.insert_production_experience,
            [
                title,
                content,
                key,
                ProductionExperienceTypeValueStatic.typeExperience,
                '', //type err
                poId || 0,
                poDetailId || 0,
                '' //reason err
            ],
            (requestInfo, result) => callBackAddExperian(requestInfo, result),
            true,
            timeOutFunct,
            15000,
            "insert_production_experience"
        );

    };

    const callBackAddExperian = (requestInfo, result) => {

        let message = result["proc_message"];
        if (+result["proc_status"] == 1) {
            let data = result["proc_data"]['rows'][0];
            setName('');
            setContent('');
            if (selectedImage.length) {
                uploadImage(selectedImage, data['o_1']);
                return;
            } else {
                setLoading(false);
                closeModal(message);
            }

        } else {
            setLoading(false);
        }
    };

    const uploadImage = async (list_image, experian_id) => {
        try {
            const imgInput = {
                fileType: list_image[0].file?.type,
                file_data: list_image[0].link,
                size: list_image[0].file.fileSize,
                path: "/production-experience/",
                encodeType: "base64"
            };
            const url = `${environment.domain + "upload-file/"}`;
            const req = await axios.post(url, imgInput);
            if (req?.data?.success) {
                const result = req.data.data;
                insertAttachment(
                    experian_id,
                    AttachmentType.production_experience,
                    list_image[0].file.fileName,
                    result.fileName,
                    list_image[0].file?.type,
                    list_image[0].file.fileSize,
                    list_image[0].file?.type.split('/')[1],
                    '',
                    list_image.slice(1, list_image.length)
                )
            }

          
        } catch (error) {
            return;
        }
    }


    const insertAttachment = (
        attachment_for_id,
        attachment_type,
        file_name,
        file_path,
        mime,
        size,
        extension,
        note,
        list_image
    ) => {
        let sendParams = [
            attachment_for_id,
            attachment_type,
            file_name,
            file_path,
            mime,
            size,
            extension,
            note,
        ];

        IO.sendRequest(
            serviceList.insert_attachments,
            sendParams,
            (reqInfoMap, result) => insertAttachmentCallBack(reqInfoMap, result, list_image, attachment_for_id),
            true,
            timeOutFunct,
            15000
        );
    };


    const insertAttachmentCallBack = (reqInfoMap, result, list_image, experian_id) => {
        if (list_image.length>0) {
            uploadImage(list_image, experian_id)
        } else {
            setLoading(false);
            closeModal();
        }

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
                    setNotify({
                        color: colors.TEXT__WARNING,
                        show: true,
                        iconLeft: '',
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
                    setNotify({
                        color: colors.TEXT__WARNING,
                        show: true,
                        iconLeft: '',
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


    return (
        <Modal
            visible={visibleModal}
            onDismiss={() => closeModal(false)}
            contentContainerStyle={styles.contentStyle}
        >
            <View style={[styles.cardModal, {backgroundColor:colors.BG__SCREEN}]}>
                <View>
                    <View style={[styles.cardHeader,{backgroundColor:colors.BG__SECONDARY}]}>
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
                                value={`${t('THÊM NHÂN VIÊN')}`}
                                style={{ textAlign: 'center' }}
                                textColor={colors.TEXT__SUCCESS}
                                fontSize={fontSizes.normal}
                                fontWeight={fontWeights.bold}
                            />

                        </View>

                    </View>
                </View>
                <ScrollView style={{ margin: dimensions.moderate(10), zIndex: 999999999 }}>
                    <InputField label={t('Mã nhân viên')}
                        onChangeText={(x) => {
                            setName(x);
                        }}
                        value={name}
                    ></InputField>
                    <View>
                        <InputField label={t('Tên nhân viên')}
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
                                buttonColor={colors.BUTTON__WARNING}
                                mode="text"
                                onPress={() => {
                                    if (selectedImage.length >= 5) {
                                        setNotify({
                                            show: true,
                                            color: colors.TEXT__WARNING,
                                            iconLeft: '',
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
                                buttonColor={colors.BUTTON__WARNING}
                                mode="text"
                                onPress={() => {
                                    if (selectedImage.length >= 5) {
                                        setNotify({
                                            show: true,
                                            color: colors.TEXT__WARNING,
                                            iconLeft: '',
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
                                                    borderColor: colors.BORDER__SECONDARY,
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
                                                            setSelectedImage(selectedImage.filter(((img, i) => {
                                                                return i != index
                                                            })))
                                                        }} >
                                                            <View style={{ backgroundColor: colors.BUTTON__PRIMARY, zIndex: 999, width: dimensions.moderate(30), height: dimensions.moderate(30), borderRadius: dimensions.moderate(30), display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                                <TextComp value={'X'} textColor={colors.TEXT__WHITE}></TextComp>
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

                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <View style={{ flex: 1, marginRight: dimensions.moderate(5) }}>
                            <InputField label={t('wordSearch')}
                                onChangeText={(x) => {
                                    setAddKey(x);
                                }}

                                onBlur={() => {
                                    if (!addKey) return;
                                    setKey(`${!key.length ? '' : key + ', '}${addKey}`);
                                    setAddKey('');
                                }}

                                value={addKey}
                            ></InputField>
                        </View>
                        <View style={{ marginLeft: dimensions.moderate(5), flex: 1 }}>
                            <ButtonComp
                                icon_name={''}
                                buttonColor={colors.BUTTON__PRIMARY}
                                mode="text"
                                onPress={() => {
                                    if (!addKey) return;
                                    setKey(`${!key.length ? '' : key + ', '}${addKey}`);
                                    setAddKey('');
                                }}
                                text={t('addWord')}
                            />
                        </View>

                    </View>
                    {
                        !key.length ? <></>
                            :
                            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                {
                                    key.split(',').map((word, indexKey) => {
                                        return <View key={indexKey} style={{ marginLeft: dimensions.moderate(5), marginBottom: dimensions.vertical(5) }}>

                                            <ButtonComp
                                                icon_name={''}
                                                textColor={colors.TEXT__WHITE}
                                                buttonColor={colors.BUTTON__PRIMARY__DISABLED}
                                                mode="text"
                                                onPress={() => {
                                                    const k = key.split(',').filter((k, i) => { return i != indexKey });
                                                    setKey(k.join(','));

                                                }}
                                                text={'#' + word}
                                            ></ButtonComp>
                                        </View>
                                    })
                                }


                            </View>
                    }
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
                        buttonColor={colors.BUTTON__CANCEL}
                        mode="text"
                        onPress={() => closeModal(false)}
                        text={t('close')}
                        style={{ flex: 1, margin: dimensions.moderate(5) }}
                    />

                    <ButtonComp
                        icon_name={'check'}
                        buttonColor={colors.BUTTON__SUCCESS}
                        mode="add"
                        loading={loading}
                        disabled={!name.length}
                        onPress={() => {
                            addExperian(name, content, key)
                        }}
                        text={t('add')}
                        style={{ flex: 1, margin: dimensions.moderate(5) }}
                    />
                </View>

            </View>

            {
                notify.show && (
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
                )
            }

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
        borderRadius: dimensions.moderate(10),
        overflow: "hidden",
        display: 'flex',
        flexDirection: 'column'
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    remember_block: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        // marginTop: dimensions.moderate(5),
        marginBottom: dimensions.moderate(5),
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
