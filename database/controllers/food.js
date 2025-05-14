import * as SQLite from 'expo-sqlite';
import {dbName} from '../management';

export async function addDailyMeal (data) {
  const currentDate = new Date().toISOString().split('T')[0];
  const db = await SQLite.openDatabaseAsync(dbName);
  try {
    const meal = await getMealById(data.food_id);
    const proteins = Math.round(data.mass/meal.mass*meal.proteins);
    const fats = Math.round(data.mass/meal.mass*meal.fats);
    const carbs = Math.round(data.mass/meal.mass*meal.carbs);
    const calories = Math.round(data.mass/meal.mass*meal.calories);
    await db.runAsync(`
      INSERT INTO dailyMeals (date, type, food_id, mass, proteins, fats, carbs, calories) VALUES 
      ('${currentDate}', '${data.type}', ${data.food_id}, ${data.mass}, ${proteins}, ${fats}, ${carbs}, ${calories})
    `);
  } catch (error) {
    console.log(error);
  }
}

export async function getMealById (id) {
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    const result = await db.getFirstAsync(`
      SELECT * FROM food WHERE id=${id}
    `);
    return result;
  } catch (error) {
    console.log(error);
  } 
}

export async function updateDailyMeal (id, food_id, mass) {
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    const meal = await getMealById(food_id);
    const proteins = Math.round(mass/meal.mass*meal.proteins);
    const fats = Math.round(mass/meal.mass*meal.fats);
    const carbs = Math.round(mass/meal.mass*meal.carbs);
    const calories = Math.round(mass/meal.mass*meal.calories);
    await db.runAsync(`
      UPDATE dailyMeals SET mass=${mass}, proteins=${proteins}, 
      fats=${fats}, carbs=${carbs}, calories=${calories} WHERE id=${id}
    `);
    return result;
  } catch (error) {
    console.log(error);
  } 
}

export async function removeDailyMeal (id) {
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    await db.runAsync(`
      DELETE FROM dailyMeals WHERE id=${id}
    `);
    return result;
  } catch (error) {
    console.log(error);
  } 
}

export async function getDailyMealById (id) {
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    const result = await db.getFirstAsync(`
      SELECT dailyMeals.*, food.title FROM dailyMeals 
      JOIN food ON food.id=dailyMeals.food_id
      WHERE dailyMeals.id='${id}' 
    `);
    return result;
  } catch (error) {
    console.log(error);
  } 
}

export async function getTotalNutrientsByDate (date) {
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    const result = await db.getAllAsync(`
      SELECT SUM(proteins) AS total_p, SUM(fats) AS total_f, SUM(carbs) AS total_c, SUM(calories) AS total_cal FROM dailyMeals
      WHERE date='${date}'
    `);
    return result[0];
  } catch (error) {
    console.log(error);
  } 
}

export async function getTotalNutrientsByType (type, date) {
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    const result = await db.getAllAsync(`
      SELECT SUM(proteins) AS total_p, SUM(fats) AS total_f, SUM(carbs) AS total_c, SUM(calories) AS total_cal FROM dailyMeals
      WHERE type='${type}' AND date='${date}'
    `);
    return result[0];
  } catch (error) {
    console.log(error);
  } 
}

export async function getMealsByType (type, date) {
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    const result = await db.getAllAsync(`
      SELECT dailyMeals.*, food.title FROM dailyMeals 
      JOIN food ON food.id=dailyMeals.food_id
      WHERE type='${type}' AND date='${date}' 
    `);
    return result;
  } catch (error) {
    console.log(error);
  } 
}

export async function getAllMeals () {
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    const result = await db.getAllAsync(`
      SELECT * FROM food ORDER BY title ASC
    `);
    return result;
  } catch (error) {
    console.log(error);
  } 
}

export async function getLastDate () {
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    const result = await db.getFirstAsync(`
      SELECT date FROM dailyMeals ORDER BY date DESC 
    `);
    if (result){
      return result.date;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  } 
}