import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, useColorScheme } from 'react-native';
import {
  DefaultTheme,
  DarkTheme,
  useTheme,
  NavigationContainer,
} from '@react-navigation/native';
import { HomeScreen } from './src/screens/HomeScreen';
import { DetailsScreen } from './src/screens/DetailsScreen';
import { Button } from 'react-native-paper';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';

let totalCount: number = 0;

export type RootStackParamList = {
  Home: { prop1: string | object };
  Details: { name: string };
  Test: {
    extraData?: object;
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App(): JSX.Element {
  const theme = useColorScheme();

  const data = {
    customTextColor: 'green',
    customScreenText: 'This is text which shown on test screen',
  };

  return (
    <NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Home">
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

type TestScreenProps = NativeStackScreenProps<RootStackParamList, 'Test'>;

const TestScreen: React.FC<TestScreenProps> = ({ extraData }) => {
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
