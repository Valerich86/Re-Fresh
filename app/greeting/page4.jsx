import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import CustomRadioButton from "../../components/CustomRadioButton";
import CustomButton from "../../components/CustomButton";
import { addData4 } from "../../database/controllers/user";
import { numberOfMeals } from "../../constants/collections";

const globalStyles = require("../../constants/GlobalStyles");

const Page4 = () => {
  const [form, setForm] = useState({
    number_of_meals: 1,
  });
  const [selectedItem, setSelectedItem] = useState(numberOfMeals[0]);

  const handleSubmit = async () => {
    try {
      await addData4(form);
      router.push('greeting/page5');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <View style={styles.body}>
        <Text style={styles.headerText}>Немного о питании...</Text>
        <View>
          <View style={styles.descriptionView}>
            <Text style={[styles.text, {textAlign: 'center'}]}>
              {`Предлагаем несколько вариантов питания для расчета рекомендуемого распределения калорий в течение дня 
\u{1F447}        \u{1F447}        \u{1F447}        \u{1F447}        \u{1F447}`}
            </Text>
          </View>
          <CustomRadioButton
            text={"Выберите подходящий вариант:"}
            data={numberOfMeals}
            selectedItem={selectedItem}
            handlePress={(e) => {
              setSelectedItem(e);
              setForm({ ...form, number_of_meals: e.id });
            }}
          />
          {selectedItem == numberOfMeals[0] && (
            <View style={styles.descriptionView}>
              <Text style={styles.text}>
                {`\u{1F374} Трехразовое питание: 
\u{1F373} 30% - на завтрак
\u{1F35E} 45% - на обед 
\u{1F357} 25% - на ужин.
\u2757 Однако такой вариант может быть непосилен для тех, кто слишком рано начинает или поздно заканчивает работу.
`}
              </Text>
            </View>
          )}
          {selectedItem == numberOfMeals[1] && (
            <View style={styles.descriptionView}>
              <Text style={styles.text}>
                {`\u{1F374} Четырехразовое питание: 
\u{1F373} 30% - плотный утренний (до ухода на работу) завтрак
\u{1F34C} 15-20% - второй завтрак (на работе)
\u{1F35E} 35-40% - обед (во время работы или после нее)
\u{1F357} 10-15% - ужин.
\u2757 При таком распределении калорий организм получает достаточно энергии для того, чтобы хорошо функционировать в течение дня, не перегружая при этом органы пищеварения.`}
              </Text>
            </View>
          )}
          {selectedItem == numberOfMeals[2] && (
            <View style={styles.descriptionView}>
              <Text style={styles.text}>
                {`\u{1F374} Четырехразовое питание: 
\u{1F373} 25% - на завтрак
\u{1F35E} 35% - на обед
\u{1F34C} 15% - на полдник
\u{1F357} 25% - на ужин.
\u2757 Для тех, кто привык к раннему обеду.`}
              </Text>
            </View>
          )}
          {selectedItem == numberOfMeals[3] && (
            <View style={styles.descriptionView}>
              <Text style={styles.text}>
                {`\u{1F374} 5-6 разовое питание: 
\u{1F35E} 5-6 раз в день небольшими порциями
\u2757 Если Вы выбрали для себя регулярные тренировки и набор мышечной массы.`}
              </Text>
            </View>
          )}
        </View>
        <CustomButton handlePress={handleSubmit} label={"Дальше"} />
      </View>
    </SafeAreaView>
  );
};

export default Page4;

const styles = StyleSheet.create({
  body: {
    justifyContent: "space-around",
    height: '100%'
  },
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
    borderColor: 'gray',
    padding: 5,
    marginBottom: 5,
  },
});
