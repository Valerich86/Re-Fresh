import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { updateDeficit } from "../../database/controllers/user";

const globalStyles = require("../../constants/GlobalStyles");

const Deficit = () => {
  const { userData, getGlobalData } = useGlobalContext();
  const [text, setText] = useState("");
  const [deficit, setDeficit] = useState(0);
  const [ratio, setRatio] = useState(1);

  useEffect(() => {
    if (userData.desired_result == "loss") {
      setText("уменьшение");
    } else if (userData.desired_result == "gain") {
      setText("увеличение");
      setRatio(-1);
    } else {
      setText("поддержание формы");
    }
    setDeficit(Math.abs(userData.deficit).toString());
  }, []);

  const handleSubmit = async () => {
    try {
      await updateDeficit(userData, deficit*ratio);
      await getGlobalData();
    } catch (error) {
      console.log(error);
    } finally {
      setRatio(1);
    }
  }

  return (
    <SafeAreaView style={[globalStyles.mainContainer, {paddingBottom: 20}]}>
      <ScrollView keyboardShouldPersistTaps="always">
        <Text style={styles.headerText}>Дефицит / профицит</Text>
        <View style={[styles.textView]}>
          <Text style={styles.text}>
            Мы выбрали {text} суточной нормы калорий на{" "}
            {Math.abs(userData.deficit * 4)} ({text} углеводов на{" "}
            {Math.abs(userData.deficit)}г)
          </Text>
        </View>
        <View style={[styles.textView2]}>
          <Text style={styles.text2}>
            Тогда рекомендуемое кол-во углеводов - {userData.carbs}г в сутки.
            Если значение ниже 100г, нужно уменьшить дефицит 
          </Text>
        </View>
        <Image
          source={require("../../assets/images/thinking.jpg")}
          resizeMode="cover"
          style={styles.image}
        />
        <View style={styles.textView3}>
          <Text style={styles.text2}>
            Если эти цифры не подходят для Вас или не приносят ожидаемого
            результата, ниже можно изменить этот параметр {`\u{270C}`}
          </Text>
        </View>
        <CustomInput
          value={deficit}
          handleChange={(e) => setDeficit(Math.abs(e))}
          type={'numeric'}
        />
        <CustomButton
          label={'Готово'}
          handlePress={handleSubmit}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Deficit;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: "Caveat_600SemiBold",
    fontSize: 40,
    textAlign: "center",
  },
  textView: {
    borderRadius: 20,
    backgroundColor: "orange",
    padding: 5,
    marginTop: 20
  },
  textView2: {
    borderRadius: 20,
    backgroundColor: "black",
    padding: 5,
    marginTop: 20
  },
  textView3: {
    borderRadius: 20,
    backgroundColor: "gray",
    padding: 5,
    marginTop: 20
  },
  text: {
    fontFamily: "Caveat_400Regular",
    fontSize: 28,
    textAlign: "center",
  },
  text2: {
    fontFamily: "Caveat_400Regular",
    fontSize: 28,
    textAlign: "center",
    color: "white",
  },
  image: {
    height: 200,
    width: "100%",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20
  },
});
