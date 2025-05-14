import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState, useEffect } from "react";
import CustomChart from "../../components/CustomChart";
import {getDataForChart} from "../../database/controllers/user";

const globalStyles = require("../../constants/GlobalStyles");

const Dynamics = () => {
  const [chartData, setChartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const result = await getDataForChart();
      setChartData(result);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <Text style={styles.headerText}>Проверьте свою динамику:</Text>
      {isLoading && <ActivityIndicator color={"black"} />}
      {!isLoading && (
        <ScrollView>
          <View style={styles.content}>
            {chartData.map((item) => (
              item.data.length > 0 && (
                <CustomChart 
                  key={item.title}
                  entity={item}
                />
              )
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Dynamics;

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'orange',
    paddingBottom: 50
  },
  headerText: {
    fontFamily: "Caveat_600SemiBold",
    fontSize: 40,
    textAlign: "center",
  },
});
