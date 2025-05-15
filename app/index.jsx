import { Text, View, ImageBackground, Alert } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { checkExistenceDb, removeDb } from "../database/management";
import { getAllUserData, addTestMonitoredData, removeAllMonitoredData } from "../database/controllers/user";
import CustomButton from "../components/CustomButton";

const globalStyles = require("../constants/GlobalStyles");

export default function Index() {
  const [userIsReady, setUserIsReady] = useState(false);

  useEffect(() => {
    checkDb();
    checkUser();
  }, []);

  const checkDb = async () => {
    try {
      // await removeDb();
      await checkExistenceDb();
      await removeAllMonitoredData();
      await addTestMonitoredData();
    } catch (error) {
      console.log(error);
    }
  };

  const checkUser = async () => {
    try {
      const result = await getAllUserData();
      if (result.ready == "true") {
        setUserIsReady(true);
      } 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView
      style={globalStyles.mainContainer}
    >
      <ImageBackground
        source={require("../assets/images/vegetables.jpg")}
        resizeMode="contain"
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Text
          style={{
            fontFamily: "Caveat_600SemiBold",
            fontSize: 100,
            marginBottom: 150,
          }}
        >
          re-fresh
        </Text>
        <Text style={{ fontStyle: "italic" }}>Питание и фитнес для всех</Text>
      </ImageBackground>
      <View style={{ marginTop: 100 }}>
        <CustomButton handlePress={() => {
          if (!userIsReady){
            router.push('greeting/page1')
          } else {
            router.replace('(tabs)/home');
          }
        }} label={"Продолжаем"} />
      </View>
    </SafeAreaView>
  );
}
