import {
  Text,
  View,
  TextInput,
  Animated,
  ImageBackground,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import Image = Animated.Image;
import AppButton from '../components/ButtonComponent';
import ErrorModal from '../components/ModalComponent';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

type DetailsScreenProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

export const DetailsScreen: React.FC<DetailsScreenProps> = ({
  navigation,
  route,
}): JSX.Element => {
  const defaultNameLengthConstraints = {
    min: 2,
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
      style={[styles.screen, { backgroundColor: colors.background }]}
    >
      <ErrorModal
        icon={require('../../assets/warning_shield.png')}
        text={'Name should be least 2 characters'}
        buttonCaption={'FIX'}
        visible={showError}
        customStyles={{ color: useTheme().colors }}
        onShow={setShowError}
      />
      <Text style={{ color: colors.text }}>
        Details Screen has parameter `name` {route.params.name}
      </Text>
      <ImageBackground
        style={styles.screenBackground}
        source={require('../../assets/bg.jpg')}
      >
        {isCorrectNameLength ? (
          <View style={styles.centeredView}>
            <Image
              style={styles.imageBig}
              source={require('../../assets/shield.png')}
              resizeMode={'stretch'}
            />
          </View>
        ) : (
          <Image
            style={styles.imageBig}
            source={require('../../assets/warning_shield.png')}
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

      <Button mode="contained" onPress={() => navigation.navigate('Test', {})}>
        Go to test screen
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  screenBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2ea9a9',
  },
  centeredView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    width: 200,
    borderColor: '#555',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
  },
  imageBig: {
    height: 128,
    width: 128,
    margin: 10,
  },
});
