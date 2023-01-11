// Obtener string de la hora en el formato dd/mm/yyyy
const getDate = (date: Date): string => {
  const formatedDate: string = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;
  return formatedDate;
}

const getMDYDateString = (date: Date): string => {
  const formatedDate: string = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;
  return formatedDate;
}

// Obtener minutos
const getDecimalMinutes = (): number => new Date().getMinutes();
// Obtener el número decimal de la hora actual
const getDecimalHour = (): number => new Date().getHours();
// Obtener nombre del dia
const getDayName = (): string => {
  const days = [
      "domingo",
      "lunes",
      "martes",
      "miercoles",
      "jueves",
      "viernes",
      "sabado"
  ];

  return days[new Date().getDay()];
};

export {
  getDate,
  getDecimalHour,
  getDayName,
  getDecimalMinutes,
  getMDYDateString,
}
