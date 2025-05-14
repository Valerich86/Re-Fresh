import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { getDailyMealById, updateDailyMeal, removeDailyMeal } from "../../../database/controllers/food";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";

const globalStyles = require("../../../constants/GlobalStyles");

const MealDetail = () => {
  const { id } = useLocalSearchParams();
  const [data, setData] = useState({});
  const [mass, setMass] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let result = await getDailyMealById(id);
      setData(result);
      setMass(result.mass.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      await updateDailyMeal(id, data.food_id, mass);
      await fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelete = async () => {
    try {
      await removeDailyMeal(id);
      router.back();
    } catch (error) {
      console.log(error);
    }
  }
 

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <ImageBackground
        source={require("../../../assets/images/food.jpg")}
        resizeMode="repeat"
        style={styles.image}
      >
        <Text style={styles.headerText}>
          {data.title} - {data.mass}г
        </Text>
        <View style={styles.textView}>
          <View>
            <Text style={styles.textCentered}>В {data.mass}г содержится:</Text>
            <Text style={styles.text}>ккал: {data.calories}</Text>
            <Text style={styles.text}>белки: {data.proteins}г</Text>
            <Text style={styles.text}>жиры: {data.fats}г</Text>
            <Text style={styles.text}>углеводы: {data.carbs}г</Text>
          </View>
        <CustomInput
          header={'Хотите изменить количество?'}
          value={mass}
          handleChange={(e) => setMass(e)}
          type={'numeric'}
        />
        <CustomButton
          handlePress={handleSubmit}
          label={'Изменить кол-во'}
        />
        <CustomButton
          handlePress={handleDelete}
          label={'Удалить запись'}
        />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default MealDetail;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: "Caveat_600SemiBold",
    fontSize: 40,
    textAlign: "center",
    backgroundColor: 'white'
  },
  textView: {
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: "white",
    borderWidth: 1,
    padding: 20,
  },
  text: {
    fontFamily: "Caveat_400Regular",
    fontSize: 20,
  },
  textCentered: {
    fontFamily: "Caveat_400Regular",
    fontSize: 20,
    textAlign: 'center'
  },
  image: {
    height: '100%'
  },
});
