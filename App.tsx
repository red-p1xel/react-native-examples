/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Button } from 'react-native-paper';
import HomeScreen from "./HomeScreen";
import DetailsScreen from "./DetailsScreen";

const Stack = createStackNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const mode = {
    backgroundColor: isDarkMode ? 'black' : 'white',
    textColor: isDarkMode ? 'white' : 'black'
  };
  const extraData: string = "test some data";

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen name="Home" component={HomeScreen} options={{title: "Home"}} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{title: "Details"}} />
        <Stack.Screen name="Test">
          {(props) => <TestScreen {...props} extraData={mode} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const TestScreen = ({extraData}) => {
  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: extraData.backgroundColor
    }}>
      <Text style={{ color: extraData.textColor }}>Test screen text with extraData = {extraData.backgroundColor} and {extraData.tex}</Text>
    </View>
  );
};
export let styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
