export function validate(values = []) {
  for (let i = 0; i < values.length; i++) {
    let mes = `Поле "${values[i].field}" не заполнено.`;
    if (
      (values[i].field === "Имя" ||
      values[i].field === "Возраст" ||
      values[i].field === "Рост" ||
      values[i].field === "Вес") &&
      (values[i].value === "" ||
      values[i].value === null ||
      values[i].value === undefined ||
      values[i].value == "0")
    ) {
      return { isValid: false, message: mes };
    }
    if (
      values[i].field === "Возраст" ||
      values[i].field === "Рост" ||
      values[i].field === "Вес" ||
      values[i].field === "Талия" ||
      values[i].field === "Живот" ||
      values[i].field === "Бёдра" ||
      values[i].field === "Бюст"
    ) {
      mes = `Поле "${values[i].field}" заполнено не верно:
      * должно быть числовое значение 
      * дробная часть отделяется точкой`;
      if (isNaN(values[i].value) || String(values[i].value).includes(",")) {
        return { isValid: false, message: mes };
      }
    }
  }
  return { isValid: true, message: "" };
}
