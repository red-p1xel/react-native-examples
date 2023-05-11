import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useTheme } from '@react-navigation/native';

interface AppButtonProps {
  title: string;
  onSubmitAction: () => void;
  disabled?: boolean;
  customStyles?: {
    styles?: {};
    modalButton?: { highlighted?: string; normal?: string };
  };
}

const AppButton = ({
  title,
  onSubmitAction,
  disabled,
  customStyles,
}: AppButtonProps) => {
  const colors = useTheme().colors;

  return (
    <Pressable
      onPress={onSubmitAction}
      android_ripple={{ color: '#ff0000' }}
      style={({ pressed }) => [
        {
          backgroundColor: pressed
            ? customStyles?.modalButton?.highlighted
            : customStyles?.modalButton?.normal,
        },
        customStyles?.styles ? customStyles.styles : styles.defaultButton,
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
  defaultButton: {
    backgroundColor: '#177e17',
    width: 150,
    height: 50,
    alignItems: 'center',
  },
});

export default AppButton;
