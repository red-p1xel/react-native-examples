import {
  Image,
  ImageSourcePropType,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import AppButton from './ButtonComponent';

interface ErrorModalProps {
  icon: ImageSourcePropType;
  text: string;
  buttonCaption: string;
  visible: boolean;
  customStyles: object;
  onShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ErrorModal({
  icon,
  text,
  buttonCaption,
  visible,
  customStyles,
  onShow,
}: ErrorModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      onRequestClose={() => onShow(false)}
      animationType={'slide'}
      hardwareAccelerated={true}
    >
      <SafeAreaView style={styles.main}>
        <View style={styles.topView}>
          <View style={styles.errorModal}>
            <View style={styles.modalIcon}>
              <Image
                style={styles.imageIcon36}
                source={icon}
                resizeMode={'center'}
              />
            </View>
            <View style={styles.modalText}>
              <Text style={[customStyles]}>{text}</Text>
            </View>
            <AppButton
              title={buttonCaption}
              onSubmitAction={() => onShow(false)}
              customStyles={{
                styles: styles.modalControls,
                modalButton: { normal: '#4ea822', highlighted: '#90fc5bff' },
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  text: {
    margin: 12,
    fontSize: 12,
  },
  errorModal: {
    height: 55,
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
  },
  topView: {
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: '#00000099',
  },
  modalIcon: {
    width: 42,
    backgroundColor: '#ff4156',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    flex: 1,
    backgroundColor: '#ff4156',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalControls: {
    flex: 0.2,
    // backgroundColor: '#36910b',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderColor: '#000',
  },
  imageIcon36: {
    width: 36,
    height: 36,
  },
});
