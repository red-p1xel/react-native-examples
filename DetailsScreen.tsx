import {
  Text,
  View,
  TextInput,
  Animated,
  Modal,
  ImageBackground,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import Image = Animated.Image;
import AppButton from './src/components/ButtonComponent';

const DetailsScreen = ({ navigation, route }): JSX.Element => {
  const defaultNameLengthConstraints = {
    min: 5,
    max: 16,
  };
  const colors = useTheme().colors;
  const [submitted, setSubmitted] = useState(false);
  const [isCorrectNameLength, changeStatus] = useState(false);
  const [showError, setShowError] = useState(false);

  type NameLengthConstraint = {
    min: number;
    max: number;
  };

  const validateInputLength = (
    textLength: number,
    constraints: NameLengthConstraint,
  ): boolean => {
    return !(textLength >= constraints.max || textLength < constraints.min);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: colors.background,
      }}
    >
      {/* @TODO: Move following model to `src/components/*` */}
      <Modal
        visible={showError}
        transparent={true}
        onRequestClose={() => setShowError(false)}
        animationType={'slide'}
        hardwareAccelerated={true}
      >
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: 'transparent',
          }}
        >
          <View style={styles.topView}>
            <View style={styles.errorModal}>
              <View style={styles.modalIcon}>
                <Image
                  style={styles.imageIcon36}
                  source={require('./assets/warning_shield.png')}
                  resizeMode={'center'}
                />
              </View>
              <View style={styles.modalText}>
                <Text style={[{ color: colors.text }]}>
                  Name should be least 5 characters
                </Text>
              </View>
              {/* @TODO: Use `AppButton` component. Look at improve component */}
              <Pressable
                style={({ pressed }) => [
                  styles.modalControls,
                  { backgroundColor: pressed ? '#90fc5bff' : '#4ea822' },
                ]}
                onPress={() => setShowError(false)}
              >
                <Text style={[{ color: colors.text }, styles.text]}>FIX</Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
      <Text style={{ color: colors.text }}>
        Details Screen has parameter `name` {route.params.name}
      </Text>
      <ImageBackground
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2ea9a9',
        }}
        source={require('./assets/bg.jpg')}
      >
        {isCorrectNameLength ? (
          <View style={[{ alignItems: 'center', justifyContent: 'center' }]}>
            <Image
              style={styles.imageBig}
              source={require('./assets/shield.png')}
              resizeMode={'stretch'}
            />
          </View>
        ) : (
          <Image
            style={styles.imageBig}
            source={require('./assets/warning_shield.png')}
            resizeMode={'stretch'}
          />
        )}

        <TextInput
          style={[
            { backgroundColor: colors.background, color: colors.text },
            styles.input,
          ]}
          placeholder={'Your name'}
          /* *
           * Alternatively we can display error used to `ToastAndroid` component
           *
           *       ToastAndroid.showWithGravityAndOffset(
           *         'Name should be longer than of {length} characters',
           *         ToastAndroid.LONG,
           *         ToastAndroid.CENTER,
           *         1,
           *         2
           *       );
           *
           * Or simpler `Alert` component
           *
           *       Alert.alert(
           *         'Error',
           *         'Name should be longer than of {length} characters',
           *         [
           *           { text: 'OK', onPress: () => console.warn('OK pressed') },
           *           { text: 'Cancel', onPress: () => console.warn('Cancellation') }
           *         ],
           *         { cancelable: true, onDismiss: () => console.warn('Alert dismissed') }
           *       );
           * */
          onChangeText={(value) => {
            changeStatus(
              validateInputLength(value.length, defaultNameLengthConstraints),
            );
          }}
          keyboardType={'name-phone-pad'}
          maxLength={defaultNameLengthConstraints.max}
          editable={true}
          secureTextEntry={false}
          placeholderTextColor={useTheme().dark ? colors.text : '#d4d4d4'}
          returnKeyType="done"
          onSubmitEditing={() => {
            !isCorrectNameLength
              ? setShowError(true)
              : setSubmitted(!submitted);
          }}
        />

        <AppButton
          // Uncomment following line to check typed data before call function `onSubmitAction`
          // disabled={isCorrectNameLength}
          title="Submit"
          onSubmitAction={() => {
            !isCorrectNameLength
              ? setShowError(true)
              : setSubmitted(!submitted);
          }}
        />
      </ImageBackground>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Test', { prop1: 'value1' })}
      >
        Go to test screen
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    margin: 12,
    fontSize: 12,
  },
  input: {
    borderWidth: 1,
    width: 200,
    borderColor: '#555',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
  },
  button: {
    backgroundColor: '#177e17',
    width: 150,
    height: 50,
    alignItems: 'center',
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
  imageBig: {
    height: 128,
    width: 128,
    margin: 10,
  },
  imageIcon36: {
    width: 36,
    height: 36,
  },
});

export default DetailsScreen;
