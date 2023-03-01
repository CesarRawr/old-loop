import {Prestamo} from '../../../datatest/models';
import {getDecimalHour} from '../../utils';

// Buscar préstamos expirados
export const searchExpiredLoans = (
  activeLoans: Prestamo[]
): Prestamo[] | undefined => {
  let isChanged: boolean = false;
  const actualHour: number = getDecimalHour();
  const today: Date = new Date(new Date().toLocaleDateString('en-US'));
  // Actualizar los préstamos activos de manera local
  const updatedActiveLoans: Prestamo[] = activeLoans.map((prestamo: Prestamo) => {
    // Obtener objetos date de las fechas con formato MM/DD/YYYY
    // para compararlas 
    const loanDay: Date = new Date(new Date(prestamo.timelog.inicio).toLocaleDateString('en-US'));

    // Si la hora o fecha actual es mayor a la hora de regreso y el status es diferente de deuda
    const isOutOfDay: boolean = loanDay < today;
    const isOutOfHour: boolean = actualHour >= prestamo.materia.horario.horaFin;
    if ((isOutOfDay || isOutOfHour) && prestamo.status !== "deuda" ) {
      isChanged = true;
      return {
        ...prestamo,
        status: "deuda",
      }
    }

    return prestamo;
  });

  return isChanged ? updatedActiveLoans: undefined;
}

// Ordena los préstamos por prioridad.
export const reorderActiveLoans = (loans: Prestamo[]): Prestamo[] => {
  const loansWithDebt: Prestamo[] = getLoanByStatus(loans, 'deuda');
  const nearLoans: Prestamo[] = getLoanByStatus(loans, 'entrante');
  const activeLoans: Prestamo[] = getLoanByStatus(loans, 'activo');
  const inactiveLoans: Prestamo[] = getLoanByStatus(loans, 'inactivo');

  return [
    ...loansWithDebt, 
    ...nearLoans, 
    ...activeLoans, 
    ...inactiveLoans
  ];
}

// Obtener préstamos dependiendo del status
const getLoanByStatus = (
  loans: Prestamo[], 
  status: "entrante" | "activo" | "deuda" | "inactivo"
): Prestamo[] => {
  return loans.filter((loan: Prestamo) => loan.status === status);
}
