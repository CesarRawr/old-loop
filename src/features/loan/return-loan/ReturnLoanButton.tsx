import React from 'react';
import {Button} from '../../@ui';
import type {MouseElementEvent} from '../../../types';

import {useAppDispatch} from '../../../app/hooks';
import {returnLoan} from './returnLoanSlice';
import {setTitle, setDescription, open} from '../../dialog/dialogSlice';
import {fetchActiveLoans, setStatus} from '../active-loans-list/activeLoansListSlice';

import {
  fetchClassrooms,
  fetchCourses,
  fetchNrcs,
  fetchStudents,
  fetchTeachers
} from '../../courses/courseSlice';

import {fetchDevices} from '../../devices/deviceSlice';

export default function ReturnLoanButton({loanID}: ReturnLoanButton) {
  const dispatch = useAppDispatch();

  const reloadAll = () => {
    dispatch(fetchNrcs());
    dispatch(fetchDevices());
    dispatch(fetchClassrooms());
    dispatch(fetchCourses());
    dispatch(fetchStudents());
    dispatch(fetchTeachers());
  }

  const onClick = (e: MouseElementEvent) => {
    e.stopPropagation();

    // Poner en loading la lista de préstamos activos
    dispatch(setStatus('loading'));
    // Devolver el préstamo
    dispatch(returnLoan(loanID as string)).unwrap()
    .then((result) => {
      if (!result.error) {
        reloadAll();
        dispatch(fetchActiveLoans());
      }
    })
    .catch((e) => {
      console.log(e);
      dispatch(setStatus('idle'));
      openDialog('Error', 'Error en el servidor al intentar devolver el prestamo');
    });
  }

  // Abrir dialogo
  const openDialog = (title: string, descripcion: string) => {
    dispatch(setTitle(title));
    dispatch(setDescription(descripcion));
    dispatch(open());
  }

  return (
    <Button 
      text="Devolver"
      style={{flexGrow: 1}}
      onClick={onClick} />
  );
}

interface ReturnLoanButton {
  loanID?: string;
}
