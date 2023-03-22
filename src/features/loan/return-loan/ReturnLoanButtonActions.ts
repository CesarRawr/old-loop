//////////////////////////////////
// reloadAll imports
/////////////////////////////////
import {
  fetchClassrooms,
  fetchCourses,
  fetchNrcs,
  fetchTeachers
} from '@courses/courseSlice';

import {fetchDevices} from '@devices/deviceSlice';
//////////////////////////////////

//////////////////////////////////
// returnLoanAction imports
/////////////////////////////////
import {
  fetchActiveLoans, 
  setStatus, 
  setSelectedLoanIndex
} from '@loan/active-loans-list/activeLoansListSlice';

import {openDialog} from '@utils/index';
import {returnLoan} from './returnLoanSlice';
import {setSelectedLoan} from '@loan/modify-loan-form/modifyLoanFormSlice';
/////////////////////////////////

// Reload all input data
export const reloadAll = (dispatch: any): void => {
  dispatch(fetchNrcs());
  dispatch(fetchDevices());
  dispatch(fetchClassrooms());
  dispatch(fetchCourses());
  dispatch(fetchTeachers());
};

// Regresa un préstamo en la base de datos
export const returnLoanAction = (loanID: string, dispatch: any): void => {
  // Eliminar el dispositivo seleccionado en caso de que sea devuelto
  dispatch(setSelectedLoanIndex(-1));
  dispatch(setSelectedLoan(undefined));

  // Poner en loading la lista de préstamos activos
  dispatch(setStatus('loading'));
  // Devolver el préstamo
  dispatch(returnLoan(loanID as string)).unwrap()
  .then((result: any) => {
    if (!result.error) {
      reloadAll(dispatch);
      dispatch(fetchActiveLoans());
    }
  })
  .catch((e: any) => {
    console.log(e);
    dispatch(setStatus('idle'));
    openDialog('Error', 'Error en el servidor al intentar devolver el prestamo');
  });
}
