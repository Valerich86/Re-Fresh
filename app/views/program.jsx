import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import { PieChart } from "react-native-gifted-charts";
import { useGlobalContext } from "../../context/GlobalProvider";

const globalStyles = require("../../constants/GlobalStyles");

const Program = () => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [centerlabelText, setCenterlabelText] = useState("");
  const { userData, fitnessData } = useGlobalContext();

  const lineData = [
      {value: 0, dataPointText: '0'},
      {value: 10, dataPointText: '10'},
      {value: 8, dataPointText: '8'},
      {value: 58, dataPointText: '58'},
      {value: 56, dataPointText: '56'},
      {value: 78, dataPointText: '78'},
      {value: 74, dataPointText: '74'},
      {value: 98, dataPointText: '98'},
    ];
  
    const lineData2 = [
      {value: 0, dataPointText: '0'},
      {value: 20, dataPointText: '20'},
      {value: 18, dataPointText: '18'},
      {value: 40, dataPointText: '40'},
      {value: 36, dataPointText: '36'},
      {value: 60, dataPointText: '60'},
      {value: 54, dataPointText: '54'},
      {value: 85, dataPointText: '85'},
    ];

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setChartData([
        {
          value: userData.proteins,
          text: userData.proteins.toString() + "г - б",
          color: "#f6d95f",
        },
        {
          value: userData.fats,
          text: userData.fats.toString() + "г - ж",
          color: "#60f773",
        },
        {
          value: userData.carbs,
          text: userData.carbs.toString() + "г - у",
          color: "#fa7581",
        },
      ]);
      setCenterlabelText(userData.calories + " ккал\n  в сутки");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <ScrollView>
        <Text style={styles.headerText}>Ваша текущая программа:</Text>
        <View style={{ alignItems: "center" }}>
          <View style={styles.descriptionView}>
            <Text style={styles.text}>Важно{`\u{2757}\u{2757}\u{2757}`}</Text>
            <Text style={[styles.text, { fontSize: 10 }]}>
              {`Программа носит рекомендательный характер.
При отсутствии ожидаемых результатов попробуйте изменить данные для подбора программы`}
            </Text>
          </View>
          <Text style={[styles.text, { fontSize: 30 }]}>
            {`\u{1F449}`} Ваша суточная норма калорий с учётом текущей
            физической активности {userData.dci} ккал.
          </Text>
          <Text
            style={[
              styles.text,
              { fontSize: 30, marginTop: 25},
            ]}
          >
            {`\u{1F449}`} Выбранный дефицит (профицит) углеводов {userData.deficit} г.
          </Text>
          <Text
            style={[
              styles.text,
              { fontSize: 30, marginTop: 25, marginBottom: 25 },
            ]}
          >
            {`\u{1F449}`} С учетом дефицита (профицита) норма калорий: {`\n`}{userData.calories} г.
          </Text>
          {!isLoading && (
            <>
              <View style={styles.chartView}>
                <Text
                  style={[
                    styles.text,
                    { textAlign: "center", color: "white", fontSize: 25 },
                  ]}
                >
                  Рекомендуемое соотношение нутриентов (г) с учётом дефицита
                  (профицита):
                </Text>
                <PieChart
                  data={chartData}
                  donut
                  showText
                  textSize={12}
                  textColor="black"
                  innerRadius={60}
                  radius={150}
                  sectionAutoFocus
                  focusOnPress
                  onPress={(item, index) => setCenterlabelText(item.text)}
                  innerCircleColor={"#202321"}
                  centerLabelComponent={() => {
                    return (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 22,
                            fontFamily: "Caveat_600SemiBold",
                            color: "white",
                          }}
                        >
                          {centerlabelText}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
              <View style={styles.chartView}>
                <Text
                  style={[
                    styles.text,
                    { textAlign: "center", color: "white", fontSize: 25 },
                  ]}
                >
                  Рекомендуемые упражнения:
                </Text>
                {fitnessData.map((item) => (
                  <View style={styles.descriptionView} key={item.id}>
                    <Text style={[styles.text, {fontSize: 25}]}>{item.id}. {item.title}</Text>
                    {item.benefit && (
                      <Text style={styles.text}>Польза: {item.benefit}{`\n\n`}</Text>
                    )}
                    <Text style={styles.text}>Что делаем: {item.description}{`\n\n`}</Text>
                    <Text style={styles.text}>Количество повторов: {item.repetitions}{`\n\n`}</Text>
                    {item.rest && (
                      <Text style={styles.text}>Перерыв: {item.rest}{`\n\n`}</Text>
                    )}
                    <Text style={styles.text}>Количество подходов: {item.times}{`\n\n`}</Text>
                    {item.required && (
                      <Text style={styles.text}>Что нужно: {item.required}{`\n\n`}</Text>
                    )}
                    {item.muscles && (
                      <Text style={styles.text}>Что задействовано: {item.muscles}{`\n\n`}</Text>
                    )}
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Program;

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
  descriptionView: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "gray",
    backgroundColor: 'white',
    padding: 5,
    marginBottom: 25,
    marginTop: 5,
  },
  chartView: {
    borderRadius: 20,
    backgroundColor: "#202321",
    padding: 5,
    marginBottom: 25,
    marginTop: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
