import {
  Alert,
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

const DetailsScreen = ({ navigation, route }): JSX.Element => {
  const colors = useTheme().colors;
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const onPressHandler = () => {
    if (name.length < 1) {
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
      ToastAndroid.showWithGravityAndOffset(
        'Name should be longer than of 3 characters',
        ToastAndroid.LONG,
        ToastAndroid.CENTER,
        1,
        2
      );
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
      <Text style={{ color: colors.text }}>
        Details Screen has parameter `name` {route.params.name}
      </Text>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#2ea9a9'
        }}
      >
        <Text style={{ color: colors.text }}>Please type your name:</Text>
        <TextInput
          style={styles.input}
          placeholder={'e.g. Nicolas'}
          onChangeText={(value) => setName(value)}
          keyboardType={'name-phone-pad'}
          maxLength={25}
          editable={true}
          secureTextEntry={false}
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
            {submitted ? 'Clear' : 'Submit'}
          </Text>
        </Pressable>

        {submitted ? (
          <Text style={{ color: colors.text, margin: 10 }}>
            You are registered: {name}
          </Text>
        ) : null}
      </View>

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
    backgroundColor: '#fff',
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
  }
});

export default DetailsScreen;
