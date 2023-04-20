import { Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';

interface CheckBoxProps {
  isChecked: boolean;
  onPress: () => void;
}

const Checkbox = (props: CheckBoxProps) => {
  const { onPress, isChecked } = props;
  const name = isChecked ? 'checkmark-circle-outline' : 'radio-button-off';
  return (
    <Pressable onPress={onPress}>
      {/* <MaterialCommunityIcons name={name} size={24} color="white" /> */}
      <Ionicons name={name} size={24} color="gray" />
    </Pressable>
  );
};

export default Checkbox;
