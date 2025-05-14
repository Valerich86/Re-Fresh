import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { PieChart } from "react-native-gifted-charts";
import CustomButton from "../../components/CustomButton";
import { getAllUserData, addResultData } from "../../database/controllers/user";
import { desiredResults } from "../../constants/collections";
import { useGlobalContext } from "../../context/GlobalProvider";

const globalStyles = require("../../constants/GlobalStyles");

const Page5 = () => {
  const [desiredResult, setDesiredResult] = useState({});
  const [isLoading, setIsloading] = useState(true);
  const [centerlabelText, setCenterlabelText] = useState("");
  const { getGlobalData } = useGlobalContext();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const result = await getAllUserData();
      desiredResults.forEach((element) => {
        if (element.value == result.desired_result) {
          setDesiredResult(element);
          setCenterlabelText(element.ratio[2].text);
        }
      });
    } catch (error) {
      console.log(error);
    } finally {
      setIsloading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await addResultData(desiredResult);
      await getGlobalData();
      router.replace('(tabs)/home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <ScrollView>
        <Text style={styles.headerText}>
          Итак, Вы выбрали {desiredResult.title}
        </Text>
        <View style={{ alignItems: "center" }}>
          <View style={styles.descriptionView}>
            <Text style={[styles.text, { textAlign: "center" }]}>
              {`\u{270C}\n`}{desiredResult.nutritionDescription}
            </Text>
          </View>
          {!isLoading && (
            <View style={styles.chartView}>
              <Text style={[styles.text, { textAlign: "center", color: 'white', fontSize: 25 }]}>
              Нормальное соотношение нутриентов для наших целей: 
            </Text>
            <PieChart
              data={desiredResult.ratio}
              donut
              innerRadius={80}
              radius={130}
              sectionAutoFocus
              focusOnPress
              onPress={(item, index) => setCenterlabelText(item.text)}
              innerCircleColor={'#202321'}
              centerLabelComponent={() => {
                return (
                  <View
                    style={{ justifyContent: "center", alignItems: "center"}}
                  >
                    <Text
                      style={{ fontSize: 22, fontFamily: "Caveat_600SemiBold", color: 'white' }}
                    >
                      {centerlabelText}
                    </Text>
                  </View>
                );
              }}
            />
            </View>
          )}
          <View style={styles.descriptionView}>
            <Text style={[styles.text, { textAlign: "center" }]}>
              {`\u{1F370}\n`}{desiredResult.deficitDescription}
            </Text>
          </View>
          <View style={styles.chartView}>
            <Text style={[styles.text, { textAlign: "center", color: 'white' }]}>
              {`\u{1F4AA}\n`}{desiredResult.fitnessDescription}
            </Text>
          </View>
          <View style={{margin: 20}}>
          <Text style={[styles.text, { textAlign: "center", fontSize: 30 }]}>
            Кстати,{`\n`} входные данные собраны {`\u{2714}\n`}
          </Text>
          <CustomButton handlePress={handleSubmit} label={"На главную"} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Page5;

const styles = StyleSheet.create({
  headerText: {
    fontFamily: "Caveat_600SemiBold",
    fontSize: 40,
    textAlign: "center",
  },
  text: {
    fontFamily: "Caveat_400Regular",
    fontSize: 20,
  },
  descriptionView: {
    borderWidth: 2,
    borderRadius: 20,
    borderColor: "gray",
    padding: 5,
    marginBottom: 5,
    marginTop: 5,
  },
  chartView: {
    borderRadius: 20,
    backgroundColor: '#202321',
    padding: 5,
    marginBottom: 5,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
