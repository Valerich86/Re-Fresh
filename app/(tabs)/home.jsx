import {
  Text,
  View,
  ImageBackground,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { router } from "expo-router";
import CustomButton from "../../components/CustomButton";
import { useGlobalContext } from "../../context/GlobalProvider";

const globalStyles = require("../../constants/GlobalStyles");

export default function Home() {
  const { userData } = useGlobalContext();
  const [menuVisible, setMenuVisible] = useState(false);
  const date = new Date().toLocaleDateString();

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.text}>
          Сегодня {date}
        </Text>
        {!menuVisible && (
          <TouchableOpacity onPress={() => setMenuVisible(true)}>
            <MaterialCommunityIcons name="menu-down-outline" size={30} color="black" />
          </TouchableOpacity>
        )}
        {menuVisible && (
          <TouchableOpacity onPress={() => setMenuVisible(false)}>
            <MaterialCommunityIcons name="menu-up-outline" size={30} color="black" />
          </TouchableOpacity>
        )}
        {menuVisible && (
          <View style={styles.menu}>
            <CustomButton
              handlePress={() => router.push('views/program')}
              label={'Текущая программа'}
            />
            <CustomButton
              handlePress={() => router.push('greeting/page1')}
              label={'Обновить данные'}
            />
            <CustomButton
              handlePress={() => router.push('views/deficit')}
              label={'Дефициты/профициты'}
            />
            <CustomButton
              handlePress={() => router.push('views/dynamics')}
              label={'Динамика'}
            />
          </View>
        )}
      </View>
      <ScrollView>
        <ImageBackground
          source={require("../../assets/images/sunset.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={[styles.textView, {marginTop: 50}]}>
          <Text style={styles.text}>
            Доброго времени суток, {userData.name}.
          </Text>
          </View>
        </ImageBackground>
        <ImageBackground
          source={require("../../assets/images/success.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={[styles.textView, {marginTop: 270}]}>
          <Text style={styles.text}>
            Мы подобрали для Вас программу питания и тренировок исходя из Ваших предпочтений.
          </Text>
          </View>
        </ImageBackground>
        <ImageBackground
          source={require("../../assets/images/add-data.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={[styles.textView, {marginTop: 300}]}>
          <Text style={styles.text}>
            Не забывайте вовремя добавлять информацию для мониторинга...
          </Text>
          </View>
        </ImageBackground>
        <ImageBackground
          source={require("../../assets/images/calculator.jpg")}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={[styles.textView, {marginTop: 10}]}>
          <Text style={styles.text}>
            ...а приложение поможет посчитать калории или увидеть прогресс. 
          </Text>
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textView: {
    borderRadius: 20,
    backgroundColor: 'orange',
    padding: 5,
  },
  text: {
    fontFamily: "Caveat_400Regular",
    fontSize: 28,
    textAlign: 'center'
  },
  image: {
    height: 400,
    alignItems: 'center',
    marginTop: 10
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menu: {
    width: '90%',
    position: 'absolute',
    zIndex: 1,
    top: 35,
    backgroundColor: 'white',
    left: '10%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  }
});
