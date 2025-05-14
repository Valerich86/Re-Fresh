import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

const CustomButton = ({ handlePress, label }) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text
        style={{
          fontFamily: "Caveat_400Regular",
          fontSize: 40,
          textDecorationLine: "underline",
          textAlign: "center",
          color: 'orange',
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({});
