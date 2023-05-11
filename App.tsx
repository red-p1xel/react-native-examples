import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, useColorScheme } from 'react-native';
import {
  DefaultTheme,
  DarkTheme,
  useTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import { Button } from 'react-native-paper';

const Stack = createStackNavigator();
let totalCount: number = 0;

function App(): JSX.Element {
  const theme = useColorScheme();

  const data = {
    customTextColor: 'green',
    customScreenText: 'This is text which shown on test screen',
  };

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Details' }}
        />
        <Stack.Screen name="Test">
          {(props) => <TestScreen {...props} extraData={data} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const TestScreen = ({ extraData }) => {
  const colors = useTheme().colors;
  const [count, increaseCount] = useState(totalCount);

  const onClickHandler = () => {
    totalCount = count + 5;
    increaseCount(totalCount);
  };

  return (
    <SafeAreaView
      style={[styles.testScreenView, { backgroundColor: colors.background }]}
    >
      <Text style={{ color: extraData.customTextColor }}>
        {extraData.customScreenText}
      </Text>
      <Text
        style={[
          styles.testScreenTextStyles,
          { color: extraData.customTextColor },
        ]}
      >
        {count}
      </Text>
      <Button mode="contained" onPress={onClickHandler}>
        Add
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  testScreenView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  testScreenTextStyles: {
    fontSize: 24,
  },
});

export default App;
