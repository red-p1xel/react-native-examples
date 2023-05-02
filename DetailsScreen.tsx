import { Text, View } from 'react-native';
import React from 'react';
import { Button } from 'react-native-paper';
import { useTheme } from '@react-navigation/native';

const DetailsScreen = ({ navigation, route }): JSX.Element => {
  const colors = useTheme().colors;

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.background
      }}
    >
      <Text style={{ color: colors.text }}>
        Details Screen has parameter `name` {route.params.name}
      </Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate('Test', { prop1: 'value1' })}
      >
        Go to test screen
      </Button>
    </View>
  );
};

export default DetailsScreen;
