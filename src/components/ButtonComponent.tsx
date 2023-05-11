import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface AppButtonProps {
  title: string;
  onSubmitAction: () => void;
  disabled?: boolean;
}

const AppButton = ({ title, onSubmitAction, disabled }: AppButtonProps) => {
  const colors = useTheme().colors;

  return (
    <Pressable
      onPress={onSubmitAction}
      android_ripple={{ color: '#ff0000' }}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? '#97fa00' : '#177e17' },
      ]}
      disabled={disabled !== undefined ? !disabled : false}
    >
      <Text style={[{ color: colors.text }, styles.text]}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  text: {
    margin: 15,
    fontSize: 15,
  },
  button: {
    backgroundColor: '#177e17',
    width: 150,
    height: 50,
    alignItems: 'center',
  },
});

export default AppButton;
