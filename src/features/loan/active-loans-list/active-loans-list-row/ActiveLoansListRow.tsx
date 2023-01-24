import React, {useEffect, useState} from 'react';
import '../ActiveLoansList.css';
import {getDate} from '../../../utils';
import {Prestamo} from '../../../../datatest/models';
import ReturnLoanButton from '../../return-loan/ReturnLoanButton';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import {setSelectedLoanIndex, selectSelectedLoanIndex} from '../activeLoansListSlice';
import {setSelectedLoan} from '../../slices';

export default function ActiveLoansListRow({id, prestamo}: ActiveLoansListRowProps) {
  const dispatch = useAppDispatch();
  const selectedLoanIndex = useAppSelector(selectSelectedLoanIndex);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Si el préstamo seleccionado cambia, se desactiva la activacion local
    if (selectedLoanIndex !== id) {
      setIsActive(false);
    }
  }, [selectedLoanIndex]);

  const onClick = () => {
    // Si el préstamo ya se encuentra activo y se selecciona otra vez
    // Se deselecciona
    if (isActive && selectedLoanIndex === id) {
      setIsActive(false);
      dispatch(setSelectedLoanIndex(-1));
      dispatch(setSelectedLoan(undefined));
      return;
    }

    setIsActive(true);
    dispatch(setSelectedLoanIndex(id));
    dispatch(setSelectedLoan(prestamo));
  }

  return (
    <tr 
      onClick={onClick} 
      style={{
        backgroundColor: selectedLoanIndex === id ? 'rgba(0, 0, 0, 0.07)': '',
      }}>
      {/* Fecha */}
      <td className="f-center">
        {
          getDate(new Date(prestamo.timelog.inicio))
        }
      </td>

      {/* Nrc */}
      <td className="f-center">{ prestamo.materia.nrc }</td>

      {/* Nombre del solicitante */}
      <td className="f-center">
        { 
          !!prestamo.alumno ? prestamo.alumno.nombre: prestamo.maestro.nombre 
        }
      </td>

      {/* Nombre de la materia */}
      <td className="f-center">{ prestamo.materia.nombre }</td>

      {/* Aula */}
      <td className="f-center">{ prestamo.materia.horario.aula }</td>

      {/* Fecha inicio */}
      <td className="f-center">{ `${prestamo.materia.horario.horaInicio}:00` }</td>

      {/* Fecha de fin */}
      <td className="f-center">{ `${prestamo.materia.horario.horaFin}:00` }</td>

      {/* Dispositivos */}
      <td className="f-center">2.1</td>

      {/* Tipo de solicitante */}
      <td className="f-center">
        { 
          !!prestamo.alumno ? 'Alumno': 'Maestro' 
        }
      </td>

      {/* Botón para devolver el préstamo */}
      <td>
        <ReturnLoanButton loanID={prestamo._id} />
      </td>
    </tr> 
  );
}

interface ActiveLoansListRowProps {
  id: number;
  prestamo: Prestamo;
}
