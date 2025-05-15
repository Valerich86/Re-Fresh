import * as SQLite from 'expo-sqlite';
import {dbName} from '../management';

export async function getAllUserData(){
  const db = await SQLite.openDatabaseAsync(dbName);
  try {
    const result = await db.getFirstAsync(
      `SELECT * FROM user_data`
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function addResultData (desiredResult) {
  const db = await SQLite.openDatabaseAsync(dbName);
  let BMR, dci, calories, proteins, fats, carbs;
  try{
    const user = await getAllUserData();
    if (user.gender == 'male'){
      BMR = Math.round(9.99 * user.weight + 6.25 * user.height - 4.92 * user.age + 5);
    } else {
      BMR = Math.round(9.99 * user.weight + 6.25 * user.height - 4.92 * user.age - 161);
    }

    dci = Math.round(BMR * user.physical_activity);
    proteins = Math.round(dci * desiredResult.ratio[0].value / 4);
    fats = Math.round(dci * desiredResult.ratio[1].value / 9);
    carbs = Math.round(dci * desiredResult.ratio[2].value / 4 - desiredResult.deficit);
    calories = Math.round(dci - desiredResult.deficit * 4);

    await db.runAsync(
      'UPDATE user_data SET dci=?, calories=?, proteins=?, fats=?, carbs=?, deficit=?, ready=?', 
      dci, calories, proteins, fats, carbs, desiredResult.deficit, 'true'
    );
    const result = await getAllUserData();
    return result;
  } catch (error) {
    console.log(error);
  } 
}

export async function updateDeficit (lastData, deficit){
  const db = await SQLite.openDatabaseAsync(dbName);
  let carbs, calories;
  try{
    carbs = Math.round(lastData.carbs + lastData.deficit - deficit);
    calories = Math.round(lastData.calories + lastData.deficit * 4 - deficit * 4);
    await db.runAsync(
      'UPDATE user_data SET carbs=?, calories=?, deficit=?', 
      carbs, calories, deficit
    );
  } catch (error) {
    console.log(error);
  } 
}

export async function addData1 (data) {
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    await db.runAsync(
      'UPDATE user_data SET name=?, gender=?, age=?', 
      data.name, data.gender, data.age
    );
  } catch (error) {
    console.log(error);
  } 
}

export async function addData3 (data) {
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    await db.runAsync(
      'UPDATE user_data SET physical_activity=?, desired_result=?', 
      data.physical_activity, data.desired_result
    );
  } catch (error) {
    console.log(error);
  } 
}

export async function addData4 (data) {
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    await db.runAsync(
      'UPDATE user_data SET number_of_meals=?', 
      data.number_of_meals
    );
  } catch (error) {
    console.log(error);
  } 
}

export async function addData2 (data) {
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    await db.runAsync(
      'UPDATE user_data SET weight=?, height=?', 
      data.weight, data.height
    );
  } catch (error) {
    console.log(error);
  } 
}

export async function addMonitoredData (data) {
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    await db.runAsync(
      `INSERT INTO monitored_data (date, weight, bust, waist, belly, hips) VALUES  
      ("${data.date}", ${data.weight}, ${data.bust}, ${data.waist}, ${data.belly}, ${data.hips})`
    );
  } catch (error) {
    console.log(error);
  } 
}

export async function addTestMonitoredData () {
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    await db.runAsync(`
      INSERT INTO monitored_data (date, weight, belly) VALUES  
      ('2025-04-01', 94, 90),
      ('2025-04-15', 94.4, 90),
      ('2025-04-30', 93.1, 89),
      ('2025-05-10', 94, 90),
      ('2025-05-20', 93, 88),
      ('2025-05-31', 91.5, 87)
    `);
    console.log('Test data is added')
  } catch (error) {
    console.log(error);
  } 
}

export async function getDataForChart(){
  const db = await SQLite.openDatabaseAsync(dbName);
  try {
    const totals = await db.getAllAsync(`
      SELECT SUM(weight) AS weightTotal, SUM(bust) AS bustTotal, SUM(waist) AS waistTotal, SUM(belly) AS bellyTotal, SUM(hips) AS hipsTotal FROM monitored_data 
    `);
    const result = await db.getAllAsync(`
      SELECT * FROM monitored_data ORDER BY date ASC
    `);
    
    if (result != null){
      let weightData = [], bustData = [], waistData = [], bellyData = [], hipsData = [];
      result.forEach(e => {
        if (totals[0].weightTotal > 0){
          weightData.push({
            label: new Date(e.date).toLocaleString().substring(0, 5),
            value: e.weight,
            dataPointText: e.weight.toString()
          });
        }
        if (totals[0].bustTotal > 0){
          bustData.push({
            label: new Date(e.date).toLocaleString().substring(0, 5),
            value: e.bust,
            dataPointText: e.bust.toString()
          });
        }
        if (totals[0].waistTotal > 0){
          waistData.push({
            label: new Date(e.date).toLocaleString().substring(0, 5),
            value: e.waist,
            dataPointText: e.waist.toString()
          });
        }
        if (totals[0].bellyTotal > 0){
          bellyData.push({
            label: new Date(e.date).toLocaleString().substring(0, 5),
            value: e.belly,
            dataPointText: e.belly.toString()
          });
        }
        if (totals[0].hipsTotal > 0){
          hipsData.push({
            label: new Date(e.date).toLocaleString().substring(0, 5),
            value: e.hips,
            dataPointText: e.hips.toString()
          });
        }
      });
      return [
        {title: 'Вес', data: weightData, start: result[0].weight, end: result[result.length-1].weight, um: 'кг'}, 
        {title: 'Бюст', data: bustData, start: result[0].bust, end: result[result.length-1].bust, um: 'см'}, 
        {title: 'Талия', data: waistData, start: result[0].waist, end: result[result.length-1].waist, um: 'см'}, 
        {title: 'Живот', data: bellyData, start: result[0].belly, end: result[result.length-1].belly, um: 'см'}, 
        {title: 'Бёдра', data: hipsData, start: result[0].hips, end: result[result.length-1].hips, um: 'см'}
      ];
    }
    return null;
  } catch (error) {
    console.log(error);
  }
}

export async function getTodayData (date) {
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    const result = await db.getFirstAsync(`
      SELECT * FROM monitored_data WHERE date="${date}" 
    `);
    return result;
  } catch (error) {
    console.log(error);
  } 
}

export async function removeData (date) {
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    await db.runAsync(`DELETE FROM monitored_data WHERE date="${date}"`);
  } catch (error) {
    console.log(error);
  } 
}

export async function removeAllMonitoredData () {
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    await db.runAsync(`DELETE FROM monitored_data`);
  } catch (error) {
    console.log(error);
  } 
}