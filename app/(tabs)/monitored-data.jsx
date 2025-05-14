import { StyleSheet, Text, View, SafeAreaView, ScrollView, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import { router } from 'expo-router';
import { getTodayData, addMonitoredData, removeData } from "../../database/controllers/user";
import CustomInput from "../../components/CustomInput";
import { validate } from "../../services/validateValues";
import WrongInputMessage from "../../components/WrongInputMessage";
import CustomButton from "../../components/CustomButton";

const globalStyles = require("../../constants/GlobalStyles");

const MonitoredDataForm = () => {
  const [message, setMessage] = useState(null);
  const currentDate = new Date().toISOString().split('T')[0];
  const [headerText, setHeaderText] = useState('');
  const [subHeaderText, setSubHeaderText] = useState('');
  const [dataEntered, setDataEntered] = useState(false);
  const [form, setForm] = useState({
    weight: 0,
    bust: 0,
    waist: 0,
    belly: 0,
    hips: 0
  });

  const handleDelete = async () => {
    try {
      await removeData(currentDate);
      await fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async () => {
    console.log(currentDate)
    let response = validate([
      { value: form.weight.toString().trim(), field: "Вес" },
    ]);
    if (!response.isValid) {
      setMessage(response.message);
      return;
    }
    try {
      await addMonitoredData({...form, date: currentDate});
      await fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const result = await getTodayData(currentDate);
      if (result){
        setForm(result);
        setDataEntered(true);
      } else {
        setDataEntered(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      {dataEntered && (
        <ImageBackground
          source={require("../../assets/images/fitness.jpg")}
          resizeMode='repeat'
          style={styles.image}
        >
          <View style={{backgroundColor: 'white', borderRadius: 50, padding: 5, borderWidth: 1}}>
          <Text style={styles.headerText}>
           Сегодня данные внесены.
          </Text>
          <CustomButton
            handlePress={handleDelete}
            label={'Удалить'}
          />
          </View>
        </ImageBackground>
      )}
      {!dataEntered && (
      <ScrollView >
        <Text style={styles.headerText}>Данные для мониторинга</Text>
        <View style={styles.textView}>
          <Text style={styles.description}>
          Вносите те параметры, динамика которых вас интересует. Можете фиксировать ежедневно или раз в неделю / месяц
          </Text>
        </View>
          <View style={styles.form}>
          <CustomInput
            header={`\u{1F4CB} Вес`}
            value={form.weight}
            handleChange={(e) => setForm({ ...form, weight: e })}
            type={'numeric'}
            placeholder={`\u{2754}`}
          />
          <CustomInput
            header={`\u{1F4CB} Талия`}
            value={form.waist}
            handleChange={(e) => setForm({ ...form, waist: e })}
            type={'numeric'}
            placeholder={`\u{2754}`}
          />
          <CustomInput
            header={`\u{1F4CB} Живот`}
            value={form.belly}
            handleChange={(e) => setForm({ ...form, belly: e })}
            type={'numeric'}
            placeholder={`\u{2754}`}
          />
          <CustomInput
            header={`\u{1F4CB} Бёдра`}
            value={form.hips}
            handleChange={(e) => setForm({ ...form, hips: e })}
            type={'numeric'}
            placeholder={`\u{2754}`}
          />
          <CustomInput
            header={`\u{1F4CB} Бюст`}
            value={form.bust}
            handleChange={(e) => setForm({ ...form, bust: e })}
            type={'numeric'}
            placeholder={`\u{2754}`}
          />
          {message && <WrongInputMessage message={message} />}
          <CustomButton
            handlePress={handleSubmit}
            label={'Готово'}
          />
        </View>
      </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default MonitoredDataForm;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: 'Caveat_600SemiBold',
    fontSize: 40,
    textAlign: 'center',
  },
  textView: {
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: "white",
    borderWidth: 1,
    padding: 20,
  },
  description: {
    fontFamily: 'Caveat_400Regular',
    fontSize: 25,
    textAlign: 'center',
  },
  form: {
    height: 600,
    marginTop: 20,
    justifyContent: 'space-between'
  },
  image: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
});
