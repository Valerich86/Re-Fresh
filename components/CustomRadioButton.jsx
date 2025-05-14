import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const CustomRadioButton = ({ text, data, selectedItem, handlePress }) => {
  return (
    <View>
      <Text style={styles.header}>{text}</Text>
      <View style={styles.container}>
        {data.map((item) => (
          <Pressable
            onPress={() => handlePress(item)}
            key={item.id}
            style={{ alignItems: "center", flexDirection: "row", marginBottom: 10 }}
          >
            {selectedItem.title !== item.title && (
              <MaterialIcons name="radio-button-off" size={24} color="gray" />
            )}
            {selectedItem.title === item.title && (
              <MaterialIcons name="radio-button-on" size={24} color="gray" />
            )}
            <Text style={{marginLeft: 10}}>{item.title}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default CustomRadioButton;

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    fontSize: 25,
    fontFamily: "Caveat_400Regular",
  },
  container: {
    width: "100%",
    opacity: 0.7,
  },
});
