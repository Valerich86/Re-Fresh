import * as SQLite from 'expo-sqlite';

export async function createUserDataTable(dbName){
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS user_data (
      'id' INTEGER PRIMARY KEY AUTOINCREMENT, 
      'date' TEXT DEFAULT '2025-05-01',
      'name' TEXT,
      'gender' TEXT DEFAULT 'male',
      'age' INTEGER DEFAULT 30,
      'height' REAL DEFAULT 175,
      'weight' REAL DEFAULT 75,
      'physical_activity' REAL DEFAULT 1.2,
      'desired_result' TEXT DEFAULT 'loss',
      'number_of_meals' INTEGER DEFAULT 3,
      'dci' INTEGER DEFAULT 0,
      'proteins' REAL DEFAULT 0,
      'fats' REAL DEFAULT 0,
      'carbs' REAL DEFAULT 0,
      'calories' REAL DEFAULT 0,
      'deficit' REAL DEFAULT 0,
      'ready' TEXT DEFAULT 'false'
      );
    `);
    await db.runAsync(`
      INSERT INTO user_data (name) VALUES ('User')
    `);
    console.log("Таблица данные пользователя добавлена");
  }
  catch(error){
    console.log(error);
  }
}

export async function createMonitoredDataTable(dbName){
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS monitored_data (
      'id' INTEGER PRIMARY KEY AUTOINCREMENT,
      'date' TEXT,
      'weight' REAL DEFAULT 0,
      'bust' REAL DEFAULT 0,
      'waist' REAL DEFAULT 0,
      'belly' REAL DEFAULT 0,
      'hips' REAL DEFAULT 0
      );
    `);
    console.log("Таблица данные для мониторинга добавлена");
  }
  catch(error){
    console.log(error);
  }
}

