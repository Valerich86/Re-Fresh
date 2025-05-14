import * as SQLite from 'expo-sqlite';
import * as FS from 'expo-file-system';
import { createFoodTable, createDailyMealsTable } from './models/food';
import { createUserDataTable, createMonitoredDataTable } from './models/user';
import { createWeightLossExercisesTable, createWeightGainExercisesTable, createFitnessDatesTable } from './models/fitness';

export const dbName = 'fresh.db';

export const checkExistenceDb = async () => {
  const dbDir = FS.documentDirectory + 'SQLite/';
  const dirInfo = await FS.getInfoAsync(dbDir + dbName);
  if (!dirInfo.exists){
    await createTablesIfNotExists();
  }
}

export async function createTablesIfNotExists () {
  try{
    await createFoodTable(dbName);
    await createWeightLossExercisesTable(dbName);
    await createWeightGainExercisesTable(dbName);
    await createFitnessDatesTable(dbName);
    await createDailyMealsTable(dbName);
    await createUserDataTable(dbName);
    await createMonitoredDataTable(dbName);
  } catch (error) {
    console.log(error);
  } 
}

export async function removeDb () {
  const db = await SQLite.openDatabaseAsync(dbName);
  await db.closeAsync();
  try{
    await SQLite.deleteDatabaseAsync(dbName);
    console.log('База данных удалена')
    // await createTablesIfNotExists();
  } catch (error) {
    console.log(error);
  }
}
