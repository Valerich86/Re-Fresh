import { StyleSheet, Text, View, SafeAreaView, ScrollView, ImageBackground } from "react-native";
import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../../context/GlobalProvider";
import CustomButton from "../../components/CustomButton";
import {
  getLastDate,
  addFitnessDate,
} from "../../database/controllers/fitness";

const globalStyles = require("../../constants/GlobalStyles");

const GetFitness = () => {
  const { fitnessData } = useGlobalContext();
  const [currentExercise, setCurrentExercise] = useState(fitnessData[0]);
  const [done, setDone] = useState(false);
  const currentDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    checkDate();
  }, [done]);

  const checkDate = async () => {
    try {
      const result = await getLastDate();
      if (result == currentDate) {
        setDone(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addDate = async () => {
    try {
      await addFitnessDate();
      setDone(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      {done && (
          <ImageBackground
            source={require("../../assets/images/fitness.jpg")}
            resizeMode='repeat'
            style={styles.image}
          >
            <View style={{backgroundColor: 'white', borderRadius: 50, padding: 5, borderWidth: 1}}>
            <Text style={styles.headerText}>
              На сегодня упражнения выполнены.
            </Text>
            </View>
          </ImageBackground>
      )}
      {!done && (
        <ScrollView>
          <Text style={styles.headerText}>Начнем ежедневные упражнения!</Text>
          <View style={styles.backView}>
            <Text
              style={[
                styles.text,
                { textAlign: "center", color: "white", fontSize: 25 },
              ]}
            >
              Упражнение № {currentExercise.id}:{`\n`}
              {currentExercise.title}
            </Text>
            <View style={styles.descriptionView}>
              {currentExercise.benefit && (
                <Text style={styles.text}>
                  Польза: {currentExercise.benefit}
                  {`\n\n`}
                </Text>
              )}
              <Text style={styles.text}>
                Что делаем: {currentExercise.description}
                {`\n\n`}
              </Text>
              <Text style={styles.text}>
                Количество повторов: {currentExercise.repetitions}
                {`\n\n`}
              </Text>
              {currentExercise.rest && (
                <Text style={styles.text}>
                  Перерыв: {currentExercise.rest}
                  {`\n\n`}
                </Text>
              )}
              <Text style={styles.text}>
                Количество подходов: {currentExercise.times}
                {`\n\n`}
              </Text>
              {currentExercise.required && (
                <Text style={styles.text}>
                  Что нужно: {currentExercise.required}
                  {`\n\n`}
                </Text>
              )}
              {currentExercise.muscles && (
                <Text style={styles.text}>
                  Что задействовано: {currentExercise.muscles}
                  {`\n\n`}
                </Text>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: currentExercise.id > 1 ? "90%" : "",
              }}
            >
              {currentExercise.id > 1 && (
                <CustomButton
                  handlePress={() =>
                    setCurrentExercise(fitnessData[currentExercise.id - 2])
                  }
                  label={"пред. "}
                />
              )}
              <CustomButton
                handlePress={() => {
                  if (currentExercise.id < fitnessData.length) {
                    setCurrentExercise(fitnessData[currentExercise.id]);
                  } else {
                    addDate();
                  }
                }}
                label={
                  fitnessData.length - currentExercise.id != 0
                    ? "след. "
                    : "Завершить "
                }
              />
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default GetFitness;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: "Caveat_600SemiBold",
    fontSize: 40,
    textAlign: "center",
  },
  text: {
    fontFamily: "Caveat_400Regular",
    fontSize: 20,
    textAlign: "center",
  },
  image: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10
  },
  descriptionView: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "gray",
    backgroundColor: "white",
    padding: 5,
    marginBottom: 25,
    marginTop: 5,
  },
  backView: {
    borderRadius: 20,
    backgroundColor: "#202321",
    padding: 5,
    marginBottom: 25,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
