import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { router } from 'expo-router';
import { addData2 } from "../../database/controllers/user";
import CustomInput from "../../components/CustomInput";
import { validate } from "../../services/validateValues";
import WrongInputMessage from "../../components/WrongInputMessage";
import CustomButton from "../../components/CustomButton";

const globalStyles = require("../../constants/GlobalStyles");

const Page2 = () => {
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    weight: 0,
    height: 0
  });

  const handleSubmit = async () => {
    let response = validate([
      { value: form.weight.toString().trim(), field: "Вес" },
      { value: form.height.toString().trim(), field: "Рост" }
    ]);
    if (!response.isValid) {
      setMessage(response.message);
      return;
    }
    try {
      await addData2(form);
      router.push('greeting/page3');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <ScrollView >
        <Text style={styles.headerText}>Укажите Ваш текущий вес и рост:</Text>
        <View style={styles.form}>
          <CustomInput
            header={`\u{1F4CB} Вес`}
            value={form.weight}
            handleChange={(e) => setForm({ ...form, weight: e })}
            type={'numeric'}
            focused={true}
          />
          <CustomInput
            header={`\u{1F4CB} Рост`}
            value={form.height}
            handleChange={(e) => setForm({ ...form, height: e })}
            type={'numeric'}
          />
          {message && <WrongInputMessage message={message} />}
          <CustomButton
            handlePress={handleSubmit}
            label={'Дальше'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page2;

const styles = StyleSheet.create({
  body: {
    justifyContent: 'space-around',
  },
  headerText: {
    fontFamily: 'Caveat_600SemiBold',
    fontSize: 40,
    textAlign: 'center',
  },
  description: {
    fontFamily: 'Caveat_400Regular',
    fontSize: 30,
    textAlign: 'center',
  },
  form: {
    height: '70%',
    justifyContent: 'space-between'
  }
});
