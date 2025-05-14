import { Tabs } from "expo-router";
import { View, StyleSheet } from "react-native";
import { Colors } from "../../constants/colors";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#202321',
            borderTopColor: 'gray',
            borderTopWidth: 1,
            height: 60,
          },
          tabBarActiveTintColor: Colors.tabActive,
          tabBarInactiveTintColor: Colors.tabInactive,
          headerShown: false,
          tabBarShowLabel: true,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Главная",
            tabBarIcon: ({ focused }) => {
              return (
                <FontAwesome5
                  name="home"
                  size={24}
                  color={focused ? Colors.tabActive : Colors.tabInactive}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="get-meals"
          options={{
            title: "Прием пищи",
            tabBarIcon: ({ focused }) => {
              return (
                <MaterialCommunityIcons
                  name="food-variant"
                  size={24}
                  color={focused ? Colors.tabActive : Colors.tabInactive}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="get-fitness"
          options={{
            title: "Упражнения",
            tabBarIcon: ({ focused }) => {
              return (
                <MaterialIcons
                  name="fitness-center"
                  size={24}
                  color={focused ? Colors.tabActive : Colors.tabInactive}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="monitored-data"
          options={{
            title: "Мониторинг",
            tabBarIcon: ({ focused }) => {
              return (
                <FontAwesome5
                  name="clipboard-list"
                  size={24}
                  color={focused ? Colors.tabActive : Colors.tabInactive}
                />
              );
            },
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;

