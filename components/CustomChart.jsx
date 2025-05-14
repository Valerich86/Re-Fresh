import { StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import React, { useState, useEffect } from "react";
import Fontisto from '@expo/vector-icons/Fontisto';

const CustomChart = ({ entity }) => {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    calculateOffset();
  }, []);

  const calculateOffset = () => {
    if (entity.start < entity.end) {
      setOffset(entity.start - 10);
    } else {
      setOffset(entity.end - 10);
    }
  };

  return (
    <>
      <View
      style={{
        marginTop: 50,
        backgroundColor: "#f5f3a8",
        paddingBottom: 10,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 10,
        borderColor: 'orange',
        borderStyle: 'dotted'
      }}
    >
      <Text
        style={{
          fontFamily: "Caveat_400Regular",
          fontSize: 30,
          textAlign: "center",
        }}
      >
        {" "}
        {entity.title}{" "}
      </Text>
      <LineChart
        data={entity.data}
        yAxisOffset={offset}
        height={200}
        spacing={50}
        initialSpacing={20}
        color={"green"}
        dataPointsHeight={6}
        dataPointsWidth={6}
        dataPointsColor={"green"}
        textShiftY={-3}
        textFontSize={13}
        isAnimated
        rotateLabel
      />
    <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', justifyContent: 'center', marginTop: 30}}>
      <Text style={{ fontFamily: "Caveat_400Regular", fontSize: 30, marginRight: 10}}>
        {entity.start}{entity.um}{" "} 
      </Text>
      <Fontisto name="arrow-right-l" size={50} color="black" />
      <Text style={{ fontFamily: "Caveat_400Regular", fontSize: 30, marginLeft: 10}}>
        {entity.end}{entity.um}{" "}
      </Text>
    </View>
    </View>
    </>
  );
};

export default CustomChart;
