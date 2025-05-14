import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import CustomRadioButton from "../../components/CustomRadioButton";
import CustomButton from "../../components/CustomButton";
import { physicalActivities, desiredResults } from '../../constants/collections';
import { addData3 } from "../../database/controllers/user";

const globalStyles = require("../../constants/GlobalStyles");

const Page3 = () => {
  const [form, setForm] = useState({
    physical_activity: 1.2,
    desired_result: 'loss',
  });
  const [selectedActivity, setSelectedActivity] = useState(physicalActivities[0]);
  const [selectedResult, setSelectedResult] = useState(desiredResults[0]);

  const handleSubmit = async () => {
    try {
      await addData3(form);
      router.push('greeting/page4');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={globalStyles.mainContainer}>
      <View style={styles.body}>
        <Text style={styles.headerText}>Что мы имеем сейчас и чего хотим в будущем?</Text>
        <View style={styles.form}>
          <CustomRadioButton
            text={`\u{1F3C3} Насколько Вы активны?`}
            data={physicalActivities}
            selectedItem={selectedActivity}
            handlePress={(e) => {
              setSelectedActivity(e);
              setForm({...form, physical_activity: e.value})
            }}
          />
          <CustomRadioButton
            text={`\u{1F4C8} Ваша цель:`}
            data={desiredResults}
            selectedItem={selectedResult}
            handlePress={(e) => {
              setSelectedResult(e);
              setForm({...form, desired_result: e.value})
            }}
          />
          <CustomButton
            handlePress={handleSubmit}
            label={'Дальше'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Page3;

const styles = StyleSheet.create({
  body: {
    justifyContent: 'space-between',
  },
  headerText: {
    fontFamily: 'Caveat_600SemiBold',
    fontSize: 40,
    textAlign: 'center',
  },
  form: {
    height: '80%',
    justifyContent: 'space-between'
  }
});
