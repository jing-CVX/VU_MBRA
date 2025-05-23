import React, { useEffect, useRef, useState } from "react";
import { InputField, ButtonComp, TextComp, DatePicker } from "../../basic-components";
import { dimensions, fontSizes, color, fontWeights } from "../../styles";
import { useTranslation } from "react-i18next";
import { glb_sv, screens } from "../../utils";
import { Modal, IconButton, Divider } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import moment from "moment";

export function ModalChangePassword({
  visibleModal,
  closeModal,
  focus,
  title,
  btnColor,
  btnIcon,
  btnText,
  date
}) {
  const { t } = useTranslation();
  const [note, setNote] = useState('');
  const [freshing, setFreshing] = useState(false);
  const [isFromDtVisible, setIsFromDtVisible] = useState(false);
  const fromDtRef = useRef(glb_sv.formatDate(new Date(), null, "YYYYMMDD"));
  const [from_dt, setFrom_dt] = useState(glb_sv.formatDate(moment().format('DD/MM/YYYY'), null, "DD/MM/YYYY"));


  const resetModal = () => {
    setNote('');
    setFreshing(false);
    setIsFromDtVisible(false);
  }

  useEffect(() => {
    if (visibleModal) {
      resetModal();
      setTimeout(() => {
       
      }, 200);
    }
  }, [visibleModal]);

  const confirm = () => {
    setFreshing(true);
    closeModal(true, note || '');
  };





  return (
    <Modal
      visible={visibleModal}
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
              }}
            >
              <TextComp
                value={title || ''}
            
                style={{ marginLeft: dimensions.indent }}
                textColor={color.LIGHT.BLUE_2}
                fontSize={fontSizes.normal}
                fontWeight={fontWeights.normal}
              />
            </View>
            <IconButton
              icon="close"
              style={{ margin: dimensions.moderate(5) }}
              onPress={() => closeModal(false)}
            />
          </View>


          <View
            style={{
              flexDirection: "column",
              margin: dimensions.indent,
            }}
          >
            <InputField
              value={note}
              type="password"
              onChangeText={(x) => setNote(x)}
              label={t('new_password')}
            />
            <TextComp value={t('detect_pass')} textColor={color.LIGHT.BLACK} fontSize={fontSizes.miniScale} fontWeight={fontWeights.light}></TextComp>
            <View
              style={{
                flexDirection: "row",
                marginTop: dimensions.moderate(5),
                justifyContent: "space-between",
              }}
            >
              <ButtonComp
                icon_name={btnIcon}
                mode="text"
                loading={freshing}
                disabled={note.length<8}
                style={{
                  flex: 1,
                  marginTop: dimensions.moderate(5),
                  borderRadius: dimensions.moderate(10),
                  marginLeft: dimensions.moderate(5),
                  backgroundColor: btnColor
                }}
                onPress={() => confirm()}
                text={t('change_pass')}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  cardModal: {
    backgroundColor: color.LIGHT.WHITE,
    borderRadius: dimensions.moderate(10),
    overflow: "hidden",
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
  },
});
