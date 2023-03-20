import jwtDecode from "jwt-decode";
import {AlertDialog} from '../@ui';
import dayjs from 'dayjs';

//////////////////////////////
// Time Utils
/////////////////////////////
export const addDays = (date: Date, days: number): Date => {
  const newDate: Date = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

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
const getDayName = (): Semana => {
  const days: Semana[] = [
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

export const getDayjsFormatByHour = (hour?: number) => {
  const time = new Date();

  if (!!hour) time.setHours(hour); 

  time.setMinutes(0);
  time.setSeconds(0);

  return dayjs(time.toISOString());
}

type Semana = "lunes" | "martes" | "miercoles" | "jueves" | "viernes" | "sabado" | "domingo";

//////////////////////////////
// JWT Utils
/////////////////////////////
export const decodeToken = (): any => {
  const token: string | null = localStorage.getItem('token');
  return !!token ? jwtDecode(token): null;
}

//////////////////////////////
// Dialog Utils
/////////////////////////////
const basicConfigs: any = {
  width: '22em',
  padding:'0',
  showClass: {
    popup: 'animate__animated animate__fadeInDown'
  },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
  }
}

export const openDialog = (
  title: string, 
  text: string | JSX.Element
) => {
  const content: any = typeof text === 'string' ? {text}: {html: text};
  AlertDialog.fire({
    title,
    ...basicConfigs,
    ...content,
  });
}

export const openAcceptDialog = (
  title: string, 
  text: string | JSX.Element, 
  callback: (args?: any) => void,
  args?: any,
) => {
  const content: any = typeof text === 'string' ? {text}: {html: text};
  AlertDialog.fire({
    title,
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar',
    ...basicConfigs,
    ...content,
  }).then((result) => {
    if (result.isConfirmed) {
      callback(args);
    }
  })
}

//////////////////////////////
// Form Utils
/////////////////////////////
type LoanInputName = "nrcs" | "maestros" | "materias" | "aulas" | "horaInicio" | "horaFin" | "observaciones";
export const resetFormInputs = (setValue: any, inputs: LoanInputName[]) => {
  inputs.forEach((inputName: LoanInputName) => {
    setValue(inputName, '');
  });
}

export {
  getDate,
  getDecimalHour,
  getDayName,
  getDecimalMinutes,
  getMDYDateString,
}
