import {
  Alert,
  Animated, ImageBackground,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';
import Image = Animated.Image;

const DetailsScreen = ({ navigation, route }): JSX.Element => {
  const colors = useTheme().colors;
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [showError, setShowError] = useState(false);

  const onPressHandler = () => {
    if (name.length < 3) {
      Alert.alert(
        'Error',
        'Name should be longer than of 1 characters',
        [
          { text: 'OK', onPress: () => console.warn('OK pressed') },
          { text: 'Cancel', onPress: () => console.warn('Cancellation') }
        ],
        { cancelable: true, onDismiss: () => console.warn('Alert dismissed') }
      );
    }
    if (name.length > 1 && name.length < 5) {
      /**/
      ToastAndroid.showWithGravityAndOffset(
        'Name should be longer than of 3 characters',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        1,
        2
      );
      /**/
      setShowError(true);
    }
    setSubmitted(!submitted);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        backgroundColor: colors.background
      }}
    >
      <Modal
        visible={showError}
        transparent={true}
        onRequestClose={() => setShowError(false)}
        animationType={'slide'}
        hardwareAccelerated={true}
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
            <Pressable
              style={({ pressed }) => [
                styles.modalControls,
                { backgroundColor: pressed ? '#90fc5bff' : '#4ea822' }
              ]}
              onPress={() => setShowError(false)}
            >
              <Text style={[{ color: colors.text }, styles.text]}>FIX</Text>
            </Pressable>
          </View>
        </View>
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
        {submitted ? (
          <View style={[{ alignItems: 'center', justifyContent: 'center' }]}>
            <Image
              style={styles.imageBig}
              source={require('./assets/shield.png')}
              resizeMode={'stretch'}
            />
            <Text style={{ color: colors.text }}>
              You are registered: {name}
            </Text>
          </View>
        ) : (
          <Image
            style={styles.imageBig}
            source={require('./assets/warning_shield.png')}
            resizeMode={'stretch'}
          />
        )}

        <Text style={{ color: colors.text }}>Please type your name:</Text>
        <TextInput
          style={[
            { backgroundColor: colors.background, color: colors.text },
            styles.input
          ]}
          placeholder={'e.g. Nicolas'}
          onChangeText={(value) => setName(value)}
          keyboardType={'name-phone-pad'}
          maxLength={25}
          editable={true}
          secureTextEntry={false}
          placeholderTextColor={colors.text}
        />

        <Button
          mode={'contained-tonal'}
          onPress={onPressHandler}
          disabled={submitted}
        >
          {submitted ? 'Clear' : 'Submit'}
        </Button>

        <TouchableOpacity
          style={styles.button}
          onPress={onPressHandler}
          activeOpacity={0.5}
        >
          <Text style={{ color: colors.text, margin: 10, fontSize: 20 }}>
            {submitted ? 'Clear' : 'Submit TO'}
          </Text>
        </TouchableOpacity>

        <TouchableHighlight
          style={styles.button}
          onPress={onPressHandler}
          activeOpacity={0.5}
          underlayColor={'#47491b'}
        >
          <Text style={{ color: colors.text, margin: 10, fontSize: 20 }}>
            {submitted ? 'Clear' : 'Submit TH'}
          </Text>
        </TouchableHighlight>

        <TouchableWithoutFeedback
          style={styles.button}
          onPress={onPressHandler}
        >
          <Text style={{ color: colors.text, margin: 10, fontSize: 20 }}>
            {submitted ? 'Clear' : 'Submit WF'}
          </Text>
        </TouchableWithoutFeedback>

        <Pressable
          onPress={onPressHandler}
          android_ripple={{ color: '#ff0000' }}
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: pressed ? '#97fa00' : '#177e17' }
          ]}
        >
          <Text style={[{ color: colors.text }, styles.text]}>
            {submitted ? 'Clear' : 'Submit P'}
          </Text>
        </Pressable>
      </ImageBackground>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Test', { prop1: 'value1' })}
      >
        Go to test screen
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    margin: 15,
    fontSize: 15
  },
  input: {
    borderWidth: 1,
    width: 200,
    borderColor: '#555',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20
  },
  button: {
    backgroundColor: '#177e17',
    width: 150,
    height: 50,
    alignItems: 'center'
  },
  errorModal: {
    height: 55,
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row'
  },
  topView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: '#00000099'
  },
  modalIcon: {
    width: 42,
    backgroundColor: '#ff4156',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalText: {
    flex: 1,
    backgroundColor: '#ff4156',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalControls: {
    flex: 0.2,
    // backgroundColor: '#36910b',
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderColor: '#000'
  },
  imageBig: {
    height: 128,
    width: 128,
    margin: 10
  },
  imageIcon36: {
    width: 36
  }
});

export default DetailsScreen;
