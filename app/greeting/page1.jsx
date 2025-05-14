import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState, useEffect } from "react";
import { router } from 'expo-router';
import CustomInput from "../../components/CustomInput";
import { validate } from "../../services/validateValues";
import WrongInputMessage from "../../components/WrongInputMessage";
import CustomRadioButton from "../../components/CustomRadioButton";
import CustomButton from "../../components/CustomButton";
import { genders } from "../../constants/collections";
import { addData1 } from "../../database/controllers/user";

const globalStyles = require("../../constants/GlobalStyles");

const Page1 = () => {
  const [message, setMessage] = useState(null);
  const [form, setForm] = useState({
    name: "",
    gender: "male",
    age: 0,
  });
  const [selectedItem, setSelectedItem] = useState(genders[0]);

  const handleSubmit = async () => {
    let response = validate([
      { value: form.name.trim(), field: "Имя" },
      { value: form.age.toString().trim(), field: "Возраст" },
    ]);
    if (!response.isValid) {
      setMessage(response.message);
      return;
    }
    try {
      await addData1(form);
      router.push('greeting/page2');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <View style={styles.body}>
        <Text style={styles.headerText}>Давайте знакомиться!</Text>
        <View style={styles.form}>
          <CustomInput
            header={`\u{1F464} Как к Вам обращаться?`}
            value={form.name}
            handleChange={(e) => setForm({ ...form, name: e })}
          />
          <CustomRadioButton
            text={`\u{1F6BB} Какого Вы пола?`}
            data={genders}
            selectedItem={selectedItem}
            handlePress={(e) => {
              setSelectedItem(e);
              setForm({...form, gender: e.value})
            }}
          />
          <CustomInput
            header={`\u2753 Сколько полных лет?`}
            value={form.age}
            handleChange={(e) => setForm({ ...form, age: e })}
            type={'numeric'}
          />
          {message && <WrongInputMessage message={message} />}
          <CustomButton
            handlePress={handleSubmit}
            label={'Дальше'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Page1;

const styles = StyleSheet.create({
  body: {
    justifyContent: 'space-around',
  },
  headerText: {
    fontFamily: 'Caveat_600SemiBold',
    fontSize: 40,
    textAlign: 'center',
  },
  form: {
    height: '70%',
    justifyContent: 'space-between'
  }
});
