import React, {useEffect, useState} from 'react';
import '../ActiveLoansList.css';
import {getDate} from '../../../utils';
import {Prestamo} from '../../../../datatest/models';
import ReturnLoanButton from '../../return-loan/ReturnLoanButton';

export default function ActiveLoansListRow({prestamo}: ActiveLoansListRowProps) {
  const [isActive, setIsActive] = useState<boolean>(false);

  const onClick = () => {
    if (!isActive) {
      console.log(prestamo);
    }

    setIsActive(current => !current);
  }

  return (
    <tr 
      onClick={onClick} 
      style={{
        backgroundColor: isActive ? 'rgba(0, 0, 0, 0.07)': '',
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
  prestamo: Prestamo;
}
