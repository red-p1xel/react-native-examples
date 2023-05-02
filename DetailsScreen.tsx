import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { Button } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

const DetailsScreen = ({ navigation, route }): JSX.Element => {
  const colors = useTheme().colors;
  const [name, setName] = useState('');

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
      <View style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2ea9a9',
      }}>
        <Text style={{ color: colors.text }}>
          Please type your name:
        </Text>
        <TextInput
          style={styles.input}
          placeholder={'e.g. Nicolas'}
          onChangeText={(value) => setName(value)}
          keyboardType={'name-phone-pad'}
          maxLength={25}
          editable={true}
          secureTextEntry={false}
        />
        <Text style={{color: colors.text}}>Your name is: {name}</Text>
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
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    width: 200,
    borderColor: "#555",
    borderRadius: 5,
    textAlign: "center",
    fontSize: 20,
  }
})
export default DetailsScreen;
