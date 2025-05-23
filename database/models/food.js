import * as SQLite from 'expo-sqlite';

export async function createDailyMealsTable (dbName){
  const db = await SQLite.openDatabaseAsync(dbName);
  try {
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS dailyMeals (
      'id' INTEGER PRIMARY KEY AUTOINCREMENT, 
      'date' TEXT,
      'type' TEXT, 
      'food_id' INTEGER,
      'mass' INTEGER,
      'proteins' REAL,
      'fats' REAL,
      'carbs' REAL,
      'calories' REAL
      );
    `);
    console.log('таблица ежедневные нутриенты создана');
  } catch (error) {
    console.log(error);
  }
}

export async function createFoodTable (dbName) {
  const db = await SQLite.openDatabaseAsync(dbName);
  try{
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS food (
      'id' INTEGER PRIMARY KEY AUTOINCREMENT, 
      'title' TEXT, 
      'mass' INTEGER,
      'proteins' REAL,
      'fats' REAL,
      'carbs' REAL,
      'calories' REAL,
      'category' TEXT
      );
      `);
    await db.runAsync(`
      INSERT INTO food (title, mass, proteins, fats, carbs, calories, category) 
      VALUES
      ('Бутерброд с сыром', 45, 6.1, 10.1, 9.4, 155, 'Бутерброды'), 
      ('Бутерброд с колбасой полукопченой', 45, 5.6, 9.9, 9.3, 150, 'Бутерброды'), 
      ('Бутерброд с колбасой варено-копченой', 45, 6.3, 9.3, 9.3, 148, 'Бутерброды'), 
      ('Масло сливочное (порциями)', 15, 0.1, 12.4, 0.1, 112, 'Гастрономические товары'),
      ('Сыр (порциями)', 50, 11.5, 14.5, 0.0, 180, 'Гастрономические товары'),
      ('Хлеб ржаной (в среднем)', 100, 6.6, 1.2, 40.7, 190, 'Хлеб'),
      ('Хлеб ржано-пшеничный (в среднем)', 100, 6.8, 1.3, 44.1, 205, 'Хлеб'),
      ('Хлеб пшеничный (в среднем)', 100, 7.8, 0.9, 49.9, 226, 'Хлеб'),
      ('Батон нарезной (в среднем)', 100, 7.5, 2.9, 53.9, 259, 'Хлеб'),
      ('Чай - заварка', 100, 0.4, 0.0, 0.0, 2, 'Напитки'), 
      ('Чай с сахаром', 200, 0.1, 0.0, 0.75, 29, 'Напитки'), 
      ('Чай с медом', 200, 0.4, 0.0, 24.1, 95, 'Напитки'), 
      ('Чай с лимоном', 200, 0.3, 0.0, 15.2, 60, 'Напитки'), 
      ('Чай с молоком', 150, 1.6, 1.6, 17.3, 87, 'Напитки'), 
      ('Чай со сливками', 175, 0.9, 5.0, 15.9, 109, 'Напитки'), 
      ('Кофе на молоке', 100, 1.3, 1.8, 14.2, 76, 'Напитки'), 
      ('Кофе на молоке сгущенном (с сахаром)', 100, 1.2, 1.8, 13.9, 74, 'Напитки'), 
      ('Какао с молоком', 100, 2.5, 2.5, 16.3, 95, 'Напитки'), 
      ('Какао с молоком сгущенном (с сахаром)', 100, 2.4, 3.0, 15.9, 94, 'Напитки'), 
      ('Молоко', 100, 2.9, 3.2, 4.7, 60, 'Напитки'), 
      ('Кефир', 100, 2.8, 3.2, 4.1, 58.5, 'Напитки'), 
      ('Ацидофилин', 100, 2.8, 3.2, 3.8, 57.5, 'Напитки'), 
      ('Простокваша', 100, 2.8, 3.2, 4.1, 58, 'Напитки'), 
      ('Ряженка', 100, 3.0, 6.0, 4.1, 84.5, 'Напитки'), 
      ('Квас хлебный', 100, 0.0, 0.0, 6.5, 25, 'Напитки'),
      ('Сок (в среднем)', 100, 0.46, 0.07, 10.47, 46.68, 'Напитки'),
      ('Компот (в среднем)', 100, 0.66, 0.41, 15.14, 65.45, 'Напитки'),
      ('Кисель (в среднем)', 100, 0.1, 0.1, 12.7, 49.9, 'Напитки'),
      ('Салат из свежих огурцов', 100, 0.6, 7.1, 3.0, 7.9, 'Холодные блюда (салаты)'),
      ('Салат из свежих помидоров', 100, 0.9, 7.1, 3.9,  85, 'Холодные блюда (салаты)'),
      ('Салат из свежих помидоров со сладким перцем', 100, 1.0, 7.1, 4.2, 86, 'Холодные блюда (салаты)'),
      ('Салат с картофелем и огурцами', 100, 1.7, 10.3, 9.1, 137, 'Холодные блюда (салаты)'),
      ('Салат картофельный с огурцами и капустой', 100, 1.4, 5.4, 9.9, 96, 'Холодные блюда (салаты)'),
      ('Салат из белокочанной капусты', 100, 1.4, 5.1, 8.9, 88, 'Холодные блюда (салаты)'),
      ('Салат из краснокочанной капусты', 100, 0.8, 5.0, 10.4, 90, 'Холодные блюда (салаты)'),
      ('Салат из квашеной капусты', 100, 1.3, 5.0, 8.0, 84, 'Холодные блюда (салаты)'),
      ('Салат витаминный', 100, 1.3, 4.2, 7.1, 73, 'Холодные блюда (салаты)'),
      ('Салат из свежей свеклы с сыром и чесноком', 100, 5.4, 14.2, 7.2, 178, 'Холодные блюда (салаты)'), 
      ('Салат из моркови с яблоками', 100, 1.3, 3.1, 9.1, 70, 'Холодные блюда (салаты)'),
      ('Винегрет овощной (заправка) с луком зеленым', 100, 1.4, 3.6, 7.2, 68, 'Холодные блюда (салаты)'),
      ('Винегрет с сельдью (масло растительное), лук репчатый', 100, 1.4, 10.1, 6.8, 124, 'Холодные блюда (салаты)'),
      ('Икра баклажанная', 100, 2.2, 5.7, 9.3, 98, 'Холодные блюда (салаты)'),
      ('Икра из кабачков', 100, 1.4, 5.4, 9.0, 90, 'Холодные блюда (салаты)'),
      ('Икра свекольная', 100, 2.4, 7.6, 13.0, 129, 'Холодные блюда (салаты)'),
      ('Икра морковная', 100, 2.2, 7.6, 11.5, 123, 'Холодные блюда (салаты)'),
      ('Салат (огурцы свежие, помидоры свежие, салат зеленый)', 100, 1.1, 0.2, 3.0, 18, 'Холодные блюда (салаты)'),
      ('Салат из краснокочанной капусты с зеленым луком и огурцы свежие', 100, 1.3, 2.6, 6.5, 56, 'Холодные блюда (салаты)'), 
      ('Салат из квашеной капусты с зеленым луком и огурцы свежие', 100, 1.0, 2.6, 7.1, 57, 'Холодные блюда (салаты)'), 
      ('Огурцы свежие', 100, 0.8, 0.1, 2.6, 14, 'Холодные блюда (салаты)'), 
      ('Огурцы соленые', 100, 0.8, 0.1, 1.6, 12, 'Холодные блюда (салаты)'), 
      ('Помидоры свежие', 100, 1.1, 0.2, 3.8, 23, 'Холодные блюда (салаты)'), 
      ('Помидоры соленые', 100, 1.1, 0.1, 1.6, 16, 'Холодные блюда (салаты)'), 
      ('Редис красный', 100, 1.2, 0.1, 3.8, 21, 'Холодные блюда (салаты)'), 
      ('Лук репчатый', 100, 1.4, 0.0, 9.1, 41, 'Холодные блюда (салаты)'), 
      ('Лук зеленый', 100, 1.3, 0, 3.5, 19, 'Холодные блюда (салаты)'), 
      ('Борщ (с капустой квашеной)', 100, 0.7, 2.0, 3.8, 36, 'Супы'),
      ('Борщ с капустой и картофелем (капуста свежая)', 100, 0.8, 2.1, 5.2, 42, 'Супы'), 
      ('Щи из квашеной капусты', 100, 0.8, 2.0, 2.5, 32, 'Супы'), 
      ('Рассольник домашний', 100, 0.9, 1.8, 5.1, 40, 'Супы'), 
      ('Суп картофельный', 100, 1.1, 1.2, 8.2, 48, 'Супы'), 
      ('Суп крестьянский с крупой', 100, 1.0, 2.1, 5.7, 46, 'Супы'), 
      ('Суп из овощей', 100, 0.9, 1.76, 4.94, 39.6, 'Супы'), 
      ('Суп картофельный с клецками (манными)', 100, 1.7, 1.6, 11.3, 67, 'Супы'), 
      ('Суп с макаронными изделиями', 100, 1.0, 2.1, 6.3, 48, 'Супы'),
      ('Суп-лапша домашняя', 100, 1.1, 2.3, 5.5, 48, 'Супы'),
      ('Суп с крупой', 100, 1.3, 2.3, 7.5, 57, 'Супы'),
      ('Суп молочный с макаронными изделиями', 100, 2.8, 3.2, 9.9, 56, 'Супы'),
      ('Суп молочный с крупой', 100, 2.5, 3.1, 9.3, 75, 'Супы'),
      ('Суп молочный с овощами', 100, 2.4, 2.6, 6.6, 59, 'Супы'),
      ('Каша рассыпчатая (гречневая)', 100, 5.8, 5.2, 28.4, 186, 'Гарниры'),
      ('Каша рассыпчатая  (пшенная)', 100, 4.4, 5.0, 25.6, 167, 'Гарниры'),
      ('Каша рассыпчатая (рисовая)', 100, 2.4, 4.0, 24.5, 146, 'Гарниры'), 
      ('Каша рассыпчатая (перловая)', 100, 3.0, 4.0, 21.3, 136, 'Гарниры'), 
      ('Каша рассыпчатая (ячневая)', 100, 3.2, 4.1, 21.3, 137, 'Гарниры'), 
      ('Каша рассыпчатая (кукурузная)', 100, 2.7, 4.1, 23.0, 141, 'Гарниры'), 
      ('Каша вязкая (гречневая)', 100, 3.0, 4.5, 14.9, 114, 'Гарниры'), 
      ('Каша вязкая (пшенная)', 100, 2.8, 4.5, 16.0, 117, 'Гарниры'), 
      ('Каша вязкая (рисовая)', 100, 1.5, 3.9, 15.3, 104, 'Гарниры'), 
      ('Каша вязкая (перловая)', 100, 2.0, 3.9, 14.2, 101, 'Гарниры'), 
      ('Каша вязкая (ячневая)', 100, 2.1, 4.0, 14.2, 102, 'Гарниры'), 
      ('Каша вязкая (овсяная)', 100, 2.7, 5.2, 12.0, 106, 'Гарниры'), 
      ('Каша вязкая (из хлопьев овсяных «Геркулес»)', 100, 2.4, 5.0, 10.7, 98, 'Гарниры'), 
      ('Каша вязкая (кукурузная)', 100, 2.3, 4.0, 19.7, 126, 'Гарниры'), 
      ('Рис отварной', 100, 2.5, 4.1, 25.7, 152, 'Гарниры'), 
      ('Рис припущенный', 100, 2.4, 4.0, 24.7, 147, 'Гарниры'), 
      ('Бобовые отварные (фасоль)', 100, 9.6, 4.6, 21.3, 167, 'Гарниры'), 
      ('Бобовые отварные (горох)', 100, 9.4, 4.6, 2.3, 170, 'Гарниры'), 
      ('Бобовые отварные (горошек сушеный)', 100, 16.0, 3.9, 18.6, 173, 'Гарниры'), 
      ('Бобовые отварные (горошек зеленый консервированный)', 100, 3.0, 3.9, 6.3, 72, 'Гарниры'), 
      ('Бобовые отварные  (фасоль стручковая консервированная)', 100, 1.2, 3.8, 2.4, 49, 'Гарниры'), 
      ('Бобовые отварные (кукуруза сахарная консервированная)', 100, 2.1, 4.1, 10.8, 89, 'Гарниры'), 
      ('Бобовые отварные (фасоль овощная свежая)', 100, 3.3, 4.0, 3.9, 63, 'Гарниры'), 
      ('Бобовые отварные (горох зеленый свежий)', 100, 5.5, 3.9, 14, 113, 'Гарниры'), 
      ('Макаронные изделия отварные', 100, 3.5, 4.1, 23.5, 147, 'Гарниры'), 
      ('Макаронные изделия с томатом', 100, 3.5, 5.3, 22.1, 152, 'Гарниры'), 
      ('Картофель отварной', 100, 2.0, 4.1, 16.2, 111, 'Гарниры'), 
      ('Пюре картофельное', 100, 2.1, 4.5, 14.6, 109, 'Гарниры'), 
      ('Картофель жареный (из вареного)', 100, 2.5, 10.1, 20.2, 184, 'Гарниры'), 
      ('Картофель жареный (из сырого)', 100, 2.9, 10.5, 23.6, 204, 'Гарниры'), 
      ('Овощи отварные с маслом (морковь)', 100, 1.4, 3.8, 7.6, 69, 'Гарниры'), 
      ('Овощи отварные с маслом (капуста белокочанная)', 100, 1.9, 3.8, 4.9, 61, 'Гарниры'), 
      ('Овощи отварные с маслом (капуста цветная)', 100, 2.7, 4.0, 4.8, 66, 'Гарниры'), 
      ('Овощи отварные с маслом (капуста брюссельская)', 100, 5.4, 3.7, 6.7, 82, 'Гарниры'), 
      ('Овощи отварные с маслом (кольраби)', 100, 3.0, 3.7, 8.5, 78, 'Гарниры'), 
      ('Овощи отварные с маслом (тыква)', 100, 1.2, 3.8, 4.9, 58, 'Гарниры'), 
      ('Овощи припущенные с маслом (морковь)', 100, 1.5, 3.8, 9.9, 79, 'Гарниры'), 
      ('Овощи припущенные с маслом (репа)', 100, 1.7, 3.7, 8.0, 71, 'Гарниры'), 
      ('Овощи припущенные с маслом (тыква)', 100, 1.3, 3.8, 7.3, 68, 'Гарниры'), 
      ('Овощи припущенные с маслом (кабачки)', 100, 0.9, 4.1, 8.5, 73, 'Гарниры'), 
      ('Пюре из моркови', 100, 1.4, 3.8, 8.9, 75, 'Гарниры'), 
      ('Пюре из свеклы', 100, 1.7, 3.8, 11.0, 83, 'Гарниры'), 
      ('Капуста тушенная (свежая)', 100, 2.5, 4.6, 10.7, 94, 'Гарниры'), 
      ('Капуста тушенная (квашеная)', 100, 2.2, 4.5, 7.3, 83, 'Гарниры'), 
      ('Свекла тушеная', 100, 1.8, 3.8, 10.9, 85, 'Гарниры'), 
      ('Свекла тушеная в сметанном соусе', 100, 2.0, 3.4, 11.2, 83, 'Гарниры'), 
      ('Кабачки, тушенные в сметане', 100, 1.1, 5.2, 7.4, 80, 'Гарниры'), 
      ('Тыква, тушенная в сметане', 100, 1.4, 5.0, 6.3, 75, 'Гарниры'), 
      ('Рагу овощное', 100, 2.3, 5.1, 10.7, 97, 'Гарниры'), 
      ('Тыква жареная', 100, 1.8, 6.2, 8.6, 97, 'Гарниры'), 
      ('Кабачки жареные', 100, 1.4, 6.5, 10.7, 106, 'Гарниры'), 
      ('Баклажаны жареные', 100, 2.1, 6.2, 9.9, 104, 'Гарниры'), 
      ('Яблоки печеные', 100, 0.5, 1.3, 15.3, 75, 'Гарниры'), 
      ('Рыба (филе) отварная (окунь морской)', 100, 22.1, 4.0, 0.0, 124, 'Блюда из рыбы'), 
      ('Рыба (филе) отварная (треска)', 100, 19.3, 0.7, 0.0, 84, 'Блюда из рыбы'), 
      ('Рыба (не пластованная кусками) отварная (судак)', 100, 19.8, 1.2, 0.0, 90, 'Блюда из рыбы'), 
      ('Рыба (напластованная кусками) отварная (зубатка)', 100, 19.5, 5.3, 0.0, 126, 'Блюда из рыбы'), 
      ('Рыба (напластованная кусками) отварная (палтус)', 100, 14.7, 18.5, 0.0, 225, 'Блюда из рыбы'), 
      ('Рыба (филе) припущенная (судак)', 100, 20.3, 1.4, 0.0, 93, 'Блюда из рыбы'), 
      ('Рыба (филе) припущенная (окунь морской)', 100, 20.0, 3.6, 0.0, 113.9, 'Блюда из рыбы'), 
      ('Рыба (филе) припущенная (хек серебристый)', 100, 19.8, 2.7, 0.0, 103.5, 'Блюда из рыбы'), 
      ('Рыба (непластованная кусками) припущенная (минтай)', 100, 16.0, 1.1, 0.0, 73.9, 'Блюда из рыбы'), 
      ('Рыба по-русски (судак)',  100, 12.7, 3.7, 4.2, 99, 'Блюда из рыбы'), 
      ('Рыба по-русски (треска)', 100, 11.2, 3.4, 4.2, 90.5, 'Блюда из рыбы'), 
      ('Рыба по-русски (окунь морской)', 100, 12.5, 5.5, 4.2, 110.5, 'Блюда из рыбы'), 
      ('Судак фаршированный целиком', 100, 15.5, 7.1, 9.4, 164, 'Блюда из рыбы'), 
      ('Щука фаршированная целиком', 100, 15.5, 7.1, 9.4, 164, 'Блюда из рыбы'), 
      ('Треска (непластованная кусками) фаршированная', 100, 16.4, 3.5, 2.8, 109, 'Блюда из рыбы'), 
      ('Рыба жареная (зубатка)', 100, 22.3, 11.9, 4.1, 213, 'Блюда из рыбы'), 
      ('Рыба жареная (треска)', 100, 19.5, 6.8, 4.1, 156, 'Блюда из рыбы'), 
      ('Рыба жаренная (окунь морской)', 100, 21.6, 9.9, 4.1, 192, 'Блюда из рыбы'), 
      ('Котлеты и биточки рыбные (треска)', 100, 12.9, 8.7, 15.2, 192, 'Блюда из рыбы'), 
      ('Котлеты и биточки рыбные (сом)', 100, 13.7, 11.6, 15.2, 222, 'Блюда из рыбы'), 
      ('Тефтели рыбные (судак)', 100, 14.0, 8.9, 12.8, 188, 'Блюда из рыбы'), 
      ('Тефтели рыбные (треска)', 100, 12.4, 8.6, 12.8, 179, 'Блюда из рыбы'), 
      ('Тефтели рыбные (ледяная рыба)', 100, 13.5, 9.6, 12.8, 193, 'Блюда из рыбы'),
      ('Мясо отварное (говядина)', 100, 31.3, 5.9, 0, 177.3, 'Блюда из мяса'),
      ('Мясо отварное (свинина)', 100, 24.5, 49.0, 0, 538.7, 'Блюда из мяса'),
      ('Мясо отварное (телятина)', 100, 30.3, 1.7, 0, 136, 'Блюда из мяса'), 
      ('Сосиски отварные (молочные)', 100, 11.0, 23.9, 1.6, 265.3, 'Блюда из мяса'), 
      ('Сардельки отварные (говяжьи)', 100, 11.5, 18.3, 1.5, 216.0, 'Блюда из мяса'), 
      ('Печень жаренная с маслом (говяжья)', 100, 24.3, 22.5, 4.25, 317.5, 'Блюда из мяса'), 
      ('Печень жаренная с маслом (свиная)', 100, 25.4, 22.8, 4.25, 323.8, 'Блюда из мяса'), 
      ('Мясо тушеное (говядина)', 100, 15.2, 5.9, 3.9, 133, 'Блюда из мяса'), 
      ('Мясо тушеное (свинина)', 100, 10.0, 22.5, 3.9, 258.9, 'Блюда из мяса'), 
      ('Мясо шпигованное (говядина)', 100, 13.6, 5.4, 4.8, 120.5, 'Блюда из мяса'), 
      ('Мясо шпигованное (свинина)', 100, 9.0, 19.8, 4.8, 233, 'Блюда из мяса'), 
      ('Мясо духовое (говядина)', 100, 19.3, 4.9, 10.2, 122.5, 'Блюда из мяса'), 
      ('Мясо духовое (свинина)', 100, 6.9, 14.7, 9.9, 200.6, 'Блюда из мяса'), 
      ('Зразы отбивные (говядина) (яйцо)', 100, 16.6, 11.1, 7.9, 198.8, 'Блюда из мяса'), 
      ('Зразы отбивные (свинина) (яйцо)', 100, 12.6, 30.2, 7.9, 355.4, 'Блюда из мяса'), 
      ('Жаркое по-домашнему (говядина)', 100, 8.9, 4.9, 10.8, 123.4, 'Блюда из мяса'), 
      ('Жаркое по-домашнему (свинина)', 100, 6.4, 13.9, 10.8, 194.8, 'Блюда из мяса'), 
      ('Гуляш из говядины', 100, 13.9, 6.5, 4.0, 130.3, 'Блюда из мяса'), 
      ('Гуляш из свинины', 100, 10.0, 22.5, 4.0, 259, 'Блюда из мяса'), 
      ('Сердце в соусе', 100, 12.9, 8.2, 5.1, 145, 'Блюда из мяса'), 
      ('Азу', 100, 8.9, 4.8, 9.7, 119, 'Блюда из мяса'), 
      ('Плов (говядина)', 100, 10.8, 5.9, 19, 173.8, 'Блюда из мяса'), 
      ('Плов (свинина)', 100, 8.0, 16.5, 19.0, 257.8, 'Блюда из мяса'), 
      ('Плов по-узбекски (говядина)', 100, 7.2, 9.5, 22.7, 206.8, 'Блюда из мяса'), 
      ('Бифштекс рубленный', 100, 20.6, 37.3, 0.0, 418.5, 'Блюда из мяса'), 
      ('Бифштекс рубленный с яйцом', 100, 17.7, 32.5, 0.27, 363.6, 'Блюда из мяса'), 
      ('Бифштекс рубленный с луком',  100, 15.3, 29.9, 10.3, 370.5, 'Блюда из мяса'), 
      ('Шницель натуральный рубленый (свинина)', 100, 15.1, 69.3, 10.2, 726, 'Блюда из мяса'), 
      ('Шницель натуральный рубленый (говядина)', 100, 19.5, 33.4, 10.2, 421, 'Блюда из мяса'), 
      ('Котлеты, биточки, шницели (говядина)', 100, 15.9, 14.4, 16.0, 158.7, 'Блюда из мяса'), 
      ('Котлеты, биточки, шницели (свинина)', 100, 11.1, 38.1, 16.0, 453, 'Блюда из мяса'), 
      ('Котлеты, биточки, шницели (телятина)', 100, 17.9, 7.9, 16.0, 208, 'Блюда из мяса'), 
      ('Зразы рубленые  (говядина)', 100, 13.5, 16.3, 15.5, 263.6, 'Блюда из мяса'), 
      ('Зразы рубленые  (свинина)', 100, 10.0, 33.5, 15.5, 404.3, 'Блюда из мяса'), 
      ('Зразы рубленые  (телятина)', 100, 14.4, 11.5, 15.5, 224.3, 'Блюда из мяса'), 
      ('Зразы из говядины, фаршированные рисом (паровые)', 100, 11.5, 7.6, 15.3, 177, 'Блюда из мяса'), 
      ('Рулет с яйцом (говядина)',  100, 14.5, 11.8, 6.6, 191.5, 'Блюда из мяса'), 
      ('Рулет с яйцом (телятина)', 100, 15.4, 7.5, 6.6, 156.6, 'Блюда из мяса'), 
      ('Рулет с луком и яйцом (говядина)', 100, 12.8, 10.6, 10.3, 188, 'Блюда из мяса'), 
      ('Биточки паровые (говядина)', 100, 14.7, 10.9, 8.1, 189.3, 'Блюда из мяса'), 
      ('Биточки паровые  (телятина)', 100, 15.9, 4.3, 8.1, 136, 'Блюда из мяса'), 
      ('Кабачки фаршированные мясом и рисом (говядина)', 100, 9.4, 7.3, 8.4, 136.5, 'Блюда из мяса'), 
      ('Баклажаны фаршированные мясом и рисом (говядина)', 100, 9.7, 7.1, 8.2, 136, 'Блюда из мяса'), 
      ('Перец сладкий фаршированный мясом и рисом (говядина)', 100, 9.7, 7.1, 8.3, 135.7, 'Блюда из мяса'), 
      ('Помидоры фаршированные мясом и рисом (говядина)', 100, 9.6, 7.2, 7.4, 134.2, 'Блюда из мяса'), 
      ('Голубцы с мясом и рисом', 100, 8.6, 6.7, 6.6, 122.5, 'Блюда из мяса'), 
      ('Птица отварная с гарниром (курица)', 100, 19.1, 7.4, 0.5, 145, 'Блюда из птицы и кролика'),
      ('Птица отварная с гарниром (цыпленок)', 100, 16.5, 4.3, 0.4, 107, 'Блюда из птицы и кролика'), 
      ('Птица отварная с гарниром (индейка)', 100, 50.4, 11.3, 0.8, 187, 'Блюда из птицы и кролика'), 
      ('Котлета натуральная из филе птицы под соусом паровым (курица)', 100, 14.9, 13.2, 7.5, 207.8, 'Блюда из птицы и кролика'), 
      ('Котлета натуральная из филе птицы под соусом паровым (бройлер – цыпленок)', 100, 13.9, 15, 7.4, 220.6, 'Блюда из птицы и кролика'), 
      ('Рагу из птицы  (курица)', 100, 6.3, 4.9, 9.7, 108.6, 'Блюда из птицы и кролика'), 
      ('Рагу из птицы (бройлер – цыпленок)', 100, 6.0, 5.6, 9.7, 113.7, 'Блюда из птицы и кролика'), 
      ('Рагу из птицы (индейка)', 100, 7.0, 6.1, 9.7, 123.4, 'Блюда из птицы и кролика'), 
      ('Рагу из кролика', 100, 6.5, 5.7, 9.5, 115.7, 'Блюда из птицы и кролика'), 
      ('Плов из птицы  (курица)', 100, 7.6, 6.5, 18.1, 163, 'Блюда из птицы и кролика'), 
      ('Плов из птицы (бройлер – цыпленок)', 100, 8.01, 7.9, 18.0, 177, 'Блюда из птицы и кролика'), 
      ('Плов из птицы (индейка)', 100, 8.5, 8, 18.2, 180.7, 'Блюда из птицы и кролика'), 
      ('Плов из кролика', 100, 7.8, 7.4, 17.9, 171.7, 'Блюда из птицы и кролика'), 
      ('Птица, тушенная в соусе с овощами (курица)', 100, 6.5, 5.9, 9.4, 11.6, 'Блюда из птицы и кролика'), 
      ('Птица, тушенная в соусе с овощами (индейка)', 100, 5.4, 6.3, 9.4, 137.7, 'Блюда из птицы и кролика'), 
      ('Кролик, тушенный в соусе с овощами', 100, 6.8, 6.6, 9.3, 124, 'Блюда из птицы и кролика'), 
      ('Птица жареная (курица)', 100, 19.2, 12.1, 0.7, 188, 'Блюда из птицы и кролика'), 
      ('Птица жареная  (бройлер – цыпленок)', 100, 18.7, 15.3, 0.6, 215, 'Блюда из птицы и кролика'), 
      ('Птица жареная (индейка)', 100, 19.6, 15.5, 0.9, 222, 'Блюда из птицы и кролика'), 
      ('Кролик жареный', 100, 21.3, 15.8, 0.1, 228, 'Блюда из птицы и кролика'), 
      ('Котлета натуральная из филе птицы с гарниром  (курица)', 100, 29.4, 19.6, 1.0, 296, 'Блюда из птицы и кролика'), 
      ('Котлета натуральная из филе птицы с гарниром (бройлер цыпленок)', 100, 27.2, 23.8, 0.8, 326, 'Блюда из птицы и кролика'), 
      ('Котлета натуральная из кролика с гарниром', 100, 26.6, 22.2, 0.0, 306, 'Блюда из птицы и кролика'), 
      ('Котлеты по-киевски', 100, 16.3, 37.4, 10.1, 443.8, 'Блюда из птицы и кролика'), 
      ('Фрикадельки из кур', 100, 16.9, 11.1, 7.4, 198, 'Блюда из птицы и кролика'), 
      ('Пельмени  из говядины и свинины', 100, 10.1, 12.5, 22.2, 244, 'Мучные блюда'),
      ('Пельмени со свининой и свежей капустой', 100, 7.9, 14.5, 23.0, 256, 'Мучные блюда'), 
      ('Пельмени из говядины и свинины отварные (с маслом)', 100, 8.9, 14.9, 19.6, 250, 'Мучные блюда'), 
      ('Пельмени со свининой и свежей капустой (с маслом)', 100, 7.0, 16.7, 10.2, 261, 'Мучные блюда'), 
      ('Вареники с творожным фаршем (с маслом)', 100, 10.9, 8.9, 26.2, 230.9, 'Мучные блюда'), 
      ('Вареники с вишневым фаршем (с маслом)', 100, 3.6, 3.0, 31.4, 169.3, 'Мучные блюда'), 
      ('Вареники с яблочным фаршем (с маслом)', 100, 3.3, 2.9, 31.6, 165.8, 'Мучные блюда'), 
      ('Блины с маслом', 100, 5.25, 10.1, 33.0, 246.3, 'Мучные блюда'), 
      ('Оладьи (с маслом)', 100, 7.5, 12.4, 40.9, 308, 'Мучные блюда'), 
      ('Оладьи (с джемом)', 100, 7.2, 7.0, 45.8, 277.6, 'Мучные блюда'), 
      ('Абрикос', 100, 0.9,	0.1,	9.0,	44, 'Фрукты, ягоды'),
      ('Абрикос консервированный', 100, 0.4,	0.1,	15.5,	67, 'Фрукты, ягоды'),
      ('Авокадо', 100,	2.0,	20.0,	6.0,	212, 'Фрукты, ягоды'),
      ('Айва', 100,	0.6,	0.5,	9.8,	40, 'Фрукты, ягоды'),
      ('Ананас', 100,	0.4,	0.2,	10.6,	49, 'Фрукты, ягоды'),
      ('Ананас консервированный', 100,	0.1,	0.1,	14.0,	57, 'Фрукты, ягоды'),
      ('Апельсин', 100,	0.9,	0.2,	8.1,	36, 'Фрукты, ягоды'),
      ('Арбуз', 100,	0.6,	0.1,	5.8,	25, 'Фрукты, ягоды'),
      ('Банан',	100, 1.5,	0.2,	21.8,	95, 'Фрукты, ягоды'),
      ('Вишня',	100, 0.8,	0.5,	11.3,	52, 'Фрукты, ягоды'),
      ('Вишня замороженная',	100, 0.9,	0.4,	11.0,	46, 'Фрукты, ягоды'),
      ('Гранат', 100,	0.9,	0.0,	13.9,	52, 'Фрукты, ягоды'),
      ('Грейпфрут',	100, 0.7,	0.2,	6.5,	29, 'Фрукты, ягоды'),
      ('Груша',	100, 0.4,	0.3,	10.9,	42, 'Фрукты, ягоды'),
      ('Груша консервированная',	100, 0.2,	0.0,	15.6,	65, 'Фрукты, ягоды'),
      ('Гуава', 100,	2.6,	1.0,	8.9,	68, 'Фрукты, ягоды'),
      ('Дыня',	100, 0.6,	0.3,	7.4,	33, 'Фрукты, ягоды'),
      ('Инжир',	100, 0.7,	0.2,	13.7,	49, 'Фрукты, ягоды'),
      ('Киви',	100, 1.0,	0.6,	10.3,	48, 'Фрукты, ягоды'),
      ('Кизил',	100, 1.0,	0.0,	10.5,	44, 'Фрукты, ягоды'),
      ('Кумкват',	100, 1.9,	0.9,	9.4,	71, 'Фрукты, ягоды'),
      ('Лайм',	100, 0.9,	0.1,	3.0,	16, 'Фрукты, ягоды'),
      ('Лимон',	100, 0.9,	0.1,	3.0,	16, 'Фрукты, ягоды'),
      ('Личи',	100, 0.8,	0.3,	14.4,	65, 'Фрукты, ягоды'),
      ('Манго',	100, 0.5,	0.3,	11.5,	67, 'Фрукты, ягоды'),
      ('Мандарин',	100, 0.8,	0.2,	7.5,	33, 'Фрукты, ягоды'),
      ('Маракуйя',	100, 2.4,	0.4,	13.4,	68, 'Фрукты, ягоды'),
      ('Нектарин',	100, 0.9,	0.2,	11.8,	48, 'Фрукты, ягоды'),
      ('Папайя',	100, 0.6,	0.1,	9.2,	48, 'Фрукты, ягоды'),
      ('Персик',	100, 0.9,	0.1,	11.3,	46, 'Фрукты, ягоды'),
      ('Персики консервированные', 100,	0.3,	0.1,	14.7,	68, 'Фрукты, ягоды'),
      ('Питайя', 100,	0.5,	0.3,	12.0,	50, 'Фрукты, ягоды'),
      ('Помело',	100, 0.6,	0.2,	6.7,	32, 'Фрукты, ягоды'),
      ('Рамбутан',	100, 0.6,	0.2,	19.0, 82, 'Фрукты, ягоды'),
      ('Свити',	100, 0.7,	0.2,	9.0,	58, 'Фрукты, ягоды'),
      ('Слива',	100, 0.8,	0.3,	9.6,	42, 'Фрукты, ягоды'),
      ('Фейхоа',	100, 1.0,	1.0,	11.0, 49, 'Фрукты, ягоды'),
      ('Хурма',	100, 0.5,	0.4,	15.3,	67, 'Фрукты, ягоды'),
      ('Черешня',	100, 1.1,	0.4,	11.5,	50, 'Фрукты, ягоды'),
      ('Яблоко Голден', 100,	0.5,	0.2,	10.7, 53, 'Фрукты, ягоды'),
      ('Яблоко Гренни Смит', 100,	0.4,	0.4,	9.7,	48, 'Фрукты, ягоды'),
      ('Яблоко Фуджи',	100, 0.4,	0.2,	19.1, 71, 'Фрукты, ягоды')
      `);
    console.log("Таблица еда добавлена");
  } catch (error) {
    console.log(error);
  }
}