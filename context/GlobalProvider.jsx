import { createContext, useContext, useState, useEffect } from "react";
import { getAllUserData } from "@/database/controllers/user";
import { getAllMeals } from "@/database/controllers/food";
import {
  getWeightGainExercises,
  getWeightLossExercises,
  getWeightNormExercises,
} from "@/database/controllers/fitness";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [fitnessData, setFitnessData] = useState([]);
  const [mealsTypeData, setMealsTypeData] = useState({});
  const [allMeals, setAllMeals] = useState([]);

  useEffect(() => {
    getGlobalData();
  }, []);

  const getGlobalData = async () => {
    try {
      let result = await getAllUserData();
      setUserData(result);
      getMealsData(result);
      if (result.desired_result == "loss") {
        result = await getWeightLossExercises();
      } else if (result.desired_result == "gain") {
        result = await getWeightGainExercises(result.gender);
      } else {
        result = await getWeightNormExercises();
      }
      setFitnessData(result);
      result = await getAllMeals();
      setAllMeals(result);
    } catch (error) {
      console.log(error);
    }
  };

  const getMealsData = (user) => {
    switch (user.number_of_meals) {
      case 1:
        setMealsTypeData({
          description: "Трехразовое питание",
          breakfast: {
            p: Math.round(user.proteins * 0.3),
            f: Math.round(user.fats * 0.3),
            c: Math.round(user.carbs * 0.3),
          },
          lunch: {
            p: Math.round(user.proteins * 0.45),
            f: Math.round(user.fats * 0.45),
            c: Math.round(user.carbs * 0.45),
          },
          dinner: {
            p: Math.round(user.proteins * 0.25),
            f: Math.round(user.fats * 0.25),
            c: Math.round(user.carbs * 0.25),
          },
        });
        break;
      case 2:
        setMealsTypeData({
          description: "Четырёхразовое питание (второй завтрак)",
          breakfast: {
            p: Math.round(user.proteins * 0.3),
            f: Math.round(user.fats * 0.3),
            c: Math.round(user.carbs * 0.3),
          },
          sec_breakfast: {
            p: Math.round(user.proteins * 0.15),
            f: Math.round(user.fats * 0.15),
            c: Math.round(user.carbs * 0.15),
          },
          lunch: {
            p: Math.round(user.proteins * 0.4),
            f: Math.round(user.fats * 0.4),
            c: Math.round(user.carbs * 0.4),
          },
          dinner: {
            p: Math.round(user.proteins * 0.15),
            f: Math.round(user.fats * 0.15),
            c: Math.round(user.carbs * 0.15),
          },
        });
        break;
      case 3:
        setMealsTypeData({
          description: "Четырёхразовое питание (полдник)",
          breakfast: {
            p: Math.round(user.proteins * 0.25),
            f: Math.round(user.fats * 0.25),
            c: Math.round(user.carbs * 0.25),
          },
          lunch: {
            p: Math.round(user.proteins * 0.35),
            f: Math.round(user.fats * 0.35),
            c: Math.round(user.carbs * 0.35),
          },
          afternoon_snack: {
            p: Math.round(user.proteins * 0.15),
            f: Math.round(user.fats * 0.15),
            c: Math.round(user.carbs * 0.15),
          },
          dinner: {
            p: Math.round(user.proteins * 0.25),
            f: Math.round(user.fats * 0.25),
            c: Math.round(user.carbs * 0.25),
          },
        });
        break;
      case 4:
        setMealsTypeData({
          description: "Пятиразовое питание (равные доли)",
          breakfast: {
            p: Math.round(user.proteins / 5),
            f: Math.round(user.fats / 5),
            c: Math.round(user.carbs / 5),
          },
          sec_breakfast: {
            p: Math.round(user.proteins / 5),
            f: Math.round(user.fats / 5),
            c: Math.round(user.carbs / 5),
          },
          lunch: {
            p: Math.round(user.proteins / 5),
            f: Math.round(user.fats / 5),
            c: Math.round(user.carbs / 5),
          },
          afternoon_snack: {
            p: Math.round(user.proteins / 5),
            f: Math.round(user.fats / 5),
            c: Math.round(user.carbs / 5),
          },
          dinner: {
            p: Math.round(user.proteins / 5),
            f: Math.round(user.fats / 5),
            c: Math.round(user.carbs / 5),
          },
        });
        break;
      default: return;
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        getGlobalData,
        userData,
        fitnessData,
        mealsTypeData,
        allMeals
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
