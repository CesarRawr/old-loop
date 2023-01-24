import React, {useEffect, useState} from 'react';
import './ActiveLoansList.css';
import {Button, LoadingTableBody, TableMessage} from '../../@ui';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';
import ActiveLoansListRow from './active-loans-list-row/ActiveLoansListRow';

import {
  fetchActiveLoans, 
  selectActiveLoans, 
  selectStatus 
} from './activeLoansListSlice';

export default function ActiveLoansList() {
  const dispatch = useAppDispatch();

  const activeLoans = useAppSelector(selectActiveLoans);
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    dispatch(fetchActiveLoans());
  }, [])

  /* Cargar información dependiendo del status */
  const loadTable = () => {
    const options: any = {
      loading: () => <LoadingTableBody columnsNumber={10} rowsNumber={5} />,
      failed: () => <TableMessage msg="Error al obtener la lista de préstamos del servidor" />,
      idle: () => {
        return !!activeLoans.length ? (
          activeLoans.map((loan, index) => (<ActiveLoansListRow id={index} key={index} prestamo={loan} />))
        ):(
          <TableMessage msg="No hay préstamos que mostrar" />
        )
      }
    };

    return options[status]();
  }

  return (
   <div className="mainContainer">
    <div className="tableFixHead">
      <table>
        <thead>
          <tr>
            <th className="f-center">Fecha</th>
            <th className="f-center">Nrc</th>
            <th className="f-center">Nombre</th>
            <th className="f-center">Materia</th>
            <th className="f-center">Aula</th>
            <th className="f-center">Inicio</th>
            <th className="f-center">Fin</th>
            <th className="f-center">Dispositivos</th>
            <th className="f-center">Tipo</th>
            <th className="f-center">Acciones</th>
          </tr>
        </thead>
        <tbody className="scrollbar" style={{
            display: 'flex',
            flexFlow: 'column'
          }}>
          {
            loadTable()
          }
        </tbody>
      </table>
    </div>
   </div>
  );
}