import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import CustomInput from "../../components/CustomInput";
import { validate } from "../../services/validateValues";
import WrongInputMessage from "../../components/WrongInputMessage";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";
import {
  addDailyMeal,
  getTotalNutrientsByType,
  getTotalNutrientsByDate,
  getMealsByType
} from "../../database/controllers/food";
import { router } from "expo-router";

const globalStyles = require("../../constants/GlobalStyles");

const GetMeals = () => {
  const initDate = new Date().toISOString().split("T")[0];
  const { mealsTypeData, allMeals, userData } = useGlobalContext();
  const [currentType, setCurrentType] = useState("");
  const [remains, setRemains] = useState({});
  const [headerText, setHeaderText] = useState('');

  useEffect(() => {
    getNutritionsRemains();
  }, []);

  const getNutritionsRemains = async () => {
    try {
      const result = await getTotalNutrientsByDate(initDate);
      if (result.total_c !== null){
        setHeaderText('Продолжим...');
      } else {
        setHeaderText('Сегодня записей ещё не было...');
      }
      setRemains({
        p: Math.round(userData.proteins - result.total_p),
        f: Math.round(userData.fats - result.total_f),
        c: Math.round(userData.carbs - result.total_c),
        cal: Math.round(userData.calories - result.total_cal),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const FormItem = ({ type }) => {
    const [loading, setLoading] = useState(false);
    const [meals, setMeals] = useState([]);
    const [searchParams, setSearchParams] = useState("");
    const [mealsByType, setMealsByType] = useState([]);
    const [message, setMessage] = useState(null);
    const [totalByType, setTotalByType] = useState({});
    const [mealTitle, setMealTitle] = useState(null);
    const [form, setForm] = useState({
      food_id: null,
      type: "",
      mass: 0,
    });

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      setLoading(true);
      try {
        let result = await getTotalNutrientsByType(currentType, initDate);
        setTotalByType({
          total: {
            p: Math.round(result.total_p),
            f: Math.round(result.total_f),
            c: Math.round(result.total_c),
            cal: Math.round(result.total_cal),
          },
          diff: {
            p: Math.round(type.p - result.total_p),
            f: Math.round(type.f - result.total_f),
            c: Math.round(type.c - result.total_c),
          },
        });
        result = await getMealsByType(currentType, initDate);
        setMealsByType(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    const handleSubmit = async () => {
      let response = validate([
        { value: form.mass.toString().trim(), field: "Количество" },
      ]);
      if (!response.isValid) {
        setMessage(response.message);
        return;
      }
      try {
        await addDailyMeal(form);
        setMealTitle("");
        await fetchData();
        await getNutritionsRemains();
      } catch (error) {
        console.log(error);
      } finally {
        setForm({
          food_id: 0,
          type: "",
          mass: 0,
        });
      }
    };

    return (
      <>
        <View style={[styles.textView2, { transform: [{ rotateZ: "10deg" }] }]}>
          <Text style={[styles.text, { color: "white" }]}>
            Рекомендуется
            {`\n`}
            {type.p} г белков
            {`\n`}
            {type.f} г жиров
            {`\n`}
            {type.c} г углеводов
          </Text>
        </View>
        {loading && <ActivityIndicator color={"gray"} />}
        {!loading && mealsByType.length > 0 && (
          <View style={{ width: "100%" }}>
            {mealsByType.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => {router.push(`/views/meal_detail/${item.id}`)}}
                style={{ borderBottomWidth: 1, marginTop: 10 }}
              >
                <Text style={[styles.text, { textAlign: "left" }]}>
                  {item.title} - {item.mass}г
                </Text>
              </Pressable>
            ))}
            <View style={[styles.textView1, { padding: 10 }]}>
              <Text style={styles.text}>Всего съедено:</Text>
              <Text
                style={[
                  styles.text,
                  totalByType.diff.p < 0
                    ? { color: "red", textAlign: "left" }
                    : { textAlign: "left" },
                ]}
              >
                белки: {totalByType.total.p}г ({totalByType.diff.p})
              </Text>
              <Text
                style={[
                  styles.text,
                  totalByType.diff.f < 0
                    ? { color: "red", textAlign: "left" }
                    : { textAlign: "left" },
                ]}
              >
                жиры: {totalByType.total.f}г ({totalByType.diff.f})
              </Text>
              <Text
                style={[
                  styles.text,
                  totalByType.diff.c < 0
                    ? { color: "red", textAlign: "left" }
                    : { textAlign: "left" },
                ]}
              >
                углеводы: {totalByType.total.c}г ({totalByType.diff.c})
              </Text>
              <Text style={[styles.text, { fontSize: 25, textAlign: "right" }]}>
                всего {totalByType.total.cal} ккал{` `}
              </Text>
            </View>
          </View>
        )}
        <CustomInput
          header={"Добавить блюдо:"}
          value={searchParams}
          placeholder={"начните вводить название..."}
          handleChange={(str) => {
            let tmp = [];
            if (str.length > 1) {
              allMeals.forEach((el) => {
                if (el.title.includes(str)) {
                  tmp.push(el);
                }
              });
            }
            setMeals(tmp);
            setSearchParams(str);
          }}
        />
        {meals.length > 0 && (
          <View style={{ backgroundColor: "#202321" }}>
            {meals.map((item) => (
              <Pressable
                key={item.id}
                onPress={() => {
                  setForm({ ...form, food_id: item.id, type: currentType });
                  setMeals([]);
                  setSearchParams("");
                  setMealTitle(item.title);
                }}
                style={styles.searchItem}
              >
                <Text style={styles.text}>{item.title}</Text>
              </Pressable>
            ))}
          </View>
        )}
        <CustomInput
          header={"Количество (г)"}
          value={form.mass}
          placeholder={"0"}
          handleChange={(e) => setForm({ ...form, mass: e })}
          type={"numeric"}
        />
        {mealTitle && (
          <Text style={styles.title}>
            {mealTitle} - {form.mass}г
          </Text>
        )}
        <View
          style={{
            width: "100%",
            alignItems: "center",
            marginTop: 30,
            marginBottom: 20,
          }}
        >
          <TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
            <MaterialCommunityIcons
              name="checkbox-marked-circle"
              size={55}
              color="black"
            />
          </TouchableOpacity>
        </View>
        {message && <WrongInputMessage message={message} />}
      </>
    );
  };

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <Text style={styles.headerText}>{headerText}</Text>
      <ScrollView keyboardShouldPersistTaps="always">
        <ImageBackground
          source={require("../../assets/images/food.jpg")}
          resizeMode="repeat"
          style={styles.image}
        >
          <View style={{ width: "100%" }}>
            <View style={styles.textView1}>
              <Text style={styles.text}>
                У Вас выбрано {mealsTypeData.description}
              </Text>
            </View>
            <View style={styles.textView2}>
              <Text style={[styles.text, { color: "white" }]}>
                Мы расчитали рекомендуемое количество нутриентов для каждого
                приема пищи.
              </Text>
            </View>
            <View style={styles.textView1}>
              <Text style={styles.text}>
                Вы можете придерживаться этого количества или ориентироваться на
                суточное потребление калорий.
              </Text>
            </View>
          </View>
          <View style={styles.buttonView}>
            <View>
            <Text style={styles.text}>Остаток нутриентов на сегодня:</Text>
            <Text
              style={[
                styles.text,
                remains.cal < 0
                  ? { color: "red", textAlign: "left" }
                  : { textAlign: "left" },
              ]}
            >
              ккал: {remains.cal} 
            </Text>
            <Text
              style={[
                styles.text,
                remains.p < 0
                  ? { color: "red", textAlign: "left" }
                  : { textAlign: "left" },
              ]}
            >
              белки: {remains.p}г 
            </Text>
            <Text
              style={[
                styles.text,
                remains.f < 0
                  ? { color: "red", textAlign: "left" }
                  : { textAlign: "left" },
              ]}
            >
              жиры: {remains.f}г
            </Text>
            <Text
              style={[
                styles.text,
                remains.c < 0
                  ? { color: "red", textAlign: "left" }
                  : { textAlign: "left" },
              ]}
            >
              углеводы: {remains.c}г
            </Text>
            </View>
            <CustomButton
              handlePress={() => setCurrentType("breakfast")}
              label={"Записать завтрак "}
            />
            {currentType == "breakfast" && (
              <FormItem type={mealsTypeData.breakfast} />
            )}
            {mealsTypeData.sec_breakfast && (
              <CustomButton
                handlePress={() => setCurrentType("sec_breakfast")}
                label={"Записать 2 завтрак "}
              />
            )}
            {currentType == "sec_breakfast" && (
              <FormItem type={mealsTypeData.sec_breakfast} />
            )}
            <CustomButton
              handlePress={() => setCurrentType("lunch")}
              label={"Записать обед "}
            />
            {currentType == "lunch" && <FormItem type={mealsTypeData.lunch} />}
            {mealsTypeData.afternoon_snack && (
              <CustomButton
                handlePress={() => setCurrentType("afternoon_snack")}
                label={"Записать полдник "}
              />
            )}
            {currentType == "afternoon_snack" && (
              <FormItem type={mealsTypeData.afternoon_snack} />
            )}
            <CustomButton
              handlePress={() => setCurrentType("dinner")}
              label={"Записать ужин "}
            />
            {currentType == "dinner" && (
              <FormItem type={mealsTypeData.dinner} />
            )}
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GetMeals;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: "Caveat_600SemiBold",
    fontSize: 40,
    textAlign: "center",
  },
  textView1: {
    borderRadius: 20,
    width: "70%",
    backgroundColor: "orange",
    marginTop: 10,
  },
  textView2: {
    borderRadius: 20,
    width: "70%",
    padding: 5,
    marginLeft: "30%",
    marginTop: 10,
    backgroundColor: "#202321",
  },
  buttonView: {
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: "white",
    borderWidth: 1,
    padding: 20,
  },
  text: {
    fontFamily: "Caveat_400Regular",
    fontSize: 20,
    textAlign: "center",
  },
  title: {
    fontFamily: "Caveat_400Regular",
    fontSize: 30,
    color: "green",
  },
  image: {
    paddingTop: 10,
    paddingBottom: 100,
  },
  searchItem: {
    borderRadius: 20,
    width: "100%",
    borderWidth: 1,
    backgroundColor: "white",
    minHeight: 50,
    justifyContent: "center",
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#a5f9ae",
    alignItems: "center",
    justifyContent: "center",
  },
});
