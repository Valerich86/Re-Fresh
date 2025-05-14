import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";

const CustomInput = ({ header, value, handleChange, type, focused, placeholder}) => {
  return (
    <View>
      <Text style={styles.inputHeader}>{header}</Text>
      <View style={styles.inputView}>
        <TextInput
          value={value}
          onChangeText={handleChange}
          placeholderTextColor={"gray"}
          placeholder={placeholder? placeholder : ''}
          cursorColor={"gray"}
          style={{ fontSize: 18 }}
          keyboardType={type? type : 'default'}
          maxLength={60}
          autoFocus={focused ? focused : false}
        />
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  inputHeader: {
    fontSize: 25,
    fontFamily: 'Caveat_400Regular',
    textAlign: 'center'
  },
  inputView: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderBottomWidth: 2,
    borderRadius: 5,
    borderColor: "gray",
    backgroundColor: "white",
    opacity: 0.7,
    paddingLeft: 12
  },
});