import * as SQLite from 'expo-sqlite';
import {dbName} from '../management';

export async function addFitnessDate(){
  const currentDate = new Date().toISOString().split('T')[0];
  const db = await SQLite.openDatabaseAsync(dbName);
  try {
    await db.runAsync(`INSERT INTO fitnessDates (date) VALUES ('${currentDate}')`)
  } catch (error) {
    console.log(error);
  }
}

export async function getLastDate () {
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    const result = await db.getFirstAsync(`
      SELECT date FROM fitnessDates ORDER BY date DESC 
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

export async function getWeightLossExercises(){
  const db = await SQLite.openDatabaseAsync(dbName);
  try {
    const result = await db.getAllAsync(
      `SELECT * FROM weightLossExercises`
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getWeightGainExercises(gender){
  const db = await SQLite.openDatabaseAsync(dbName);
  try {
    const result = await db.getAllAsync(
      `SELECT * FROM weightGainExercises WHERE gender="${gender}"`
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getWeightNormExercises(){
  const db = await SQLite.openDatabaseAsync(dbName);
  try {
    const result = await db.getFirstAsync(
      `SELECT * FROM weightNormExercises`
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}

