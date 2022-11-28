/* eslint-disable react/prop-types */
import React from 'react';
import {
  Text, TouchableOpacity, View,
} from 'react-native';

export default function BasicButton({
  onPress, text, color, textColor, width,
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{
        marginVertical: 3,
        marginHorizontal: 20,
        padding: 10,
        backgroundColor: color,
        width,
      }}
      >
        <Text style={{
          fontSize: 22,
          color: textColor,
          textAlign: 'center',
        }}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
