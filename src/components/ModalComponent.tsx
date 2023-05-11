import {
  Image,
  ImageSourcePropType,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

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
            {/* @TODO: Use `AppButton` component. Look at improve component */}
            <Pressable
              style={({ pressed }) => [
                styles.modalControls,
                {
                  backgroundColor: pressed ? '#90fc5bff' : '#4ea822',
                },
              ]}
              onPress={() => onShow(false)}
            >
              <Text style={[customStyles, styles.text]}>{buttonCaption}</Text>
            </Pressable>
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
