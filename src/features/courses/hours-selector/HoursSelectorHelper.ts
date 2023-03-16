// Obtener la lista de horas para el input inicial
export const getInitialHoursList = (hourNumber: number) => {
  let list: ValueList[] = [{
    label: 'Otro',
    value: -1,
  }];

  for (let i = hourNumber; i < hourNumber+3; i++) {
    list.push({
      label: `${i}:00`,
      value: i,
    });

    if (i === 20) break;
  }

  return list;
}

//Obtener la lista de horas para el input final
export const getLastHoursList = (hourNumber: number) => {
  let list: ValueList[] = [{
    label: 'Otro',
    value: -1,
  }];
  
  for (let i = hourNumber+1; i < hourNumber+6; i++) {
    list.push({
      label: `${i}:00`,
      value: i,
    });

    if (i === 21) break;
  }

  return list;
}

export interface ValueList {
  label: string;
  value: number;
}
