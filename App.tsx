import React, { useState } from 'react';
import { Text, useColorScheme, View } from 'react-native';
import {
  DefaultTheme,
  DarkTheme,
  useTheme,
  NavigationContainer
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
    customScreenText: 'This is text which shown on test screen'
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
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background
      }}
    >
      <Text style={{ color: extraData.customTextColor }}>
        {extraData.customScreenText}
      </Text>
      <Text style={{ color: extraData.customTextColor, fontSize: 24 }}>
        {count}
      </Text>
      <Button mode="contained" onPress={onClickHandler}>
        Add
      </Button>
    </View>
  );
};

export default App;
