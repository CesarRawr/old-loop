import {useEffect, useState} from 'react';
import '../ActiveLoansList.css';
import {getDate} from '../../../utils';
import {Prestamo} from '../../../../datatest/models';
import ReturnLoanButton from '../../return-loan/ReturnLoanButton';
import {useAppDispatch, useAppSelector} from '../../../../app/hooks';
import DevicesDropdown from '../../../devices/devices-dropdown/DevicesDropdown';
import {setSelectedLoan} from '../../slices';
import {LabelTooltip} from '../../../@ui';

import {
  setSelectedLoanIndex, 
  selectSelectedLoanIndex, 
  selectSelectedLoanIsDisabled
} from '../activeLoansListSlice';

import {
  setSelectedLoanIndex, 
  selectSelectedLoanIndex, 
  selectSelectedLoanIsDisabled
} from '../activeLoansListSlice';

export default function ActiveLoansListRow({id, prestamo}: ActiveLoansListRowProps) {
  const dispatch = useAppDispatch();
  const selectedLoanIndex = useAppSelector(selectSelectedLoanIndex);
  const loanIsDisabled = useAppSelector(selectSelectedLoanIsDisabled);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Si el préstamo seleccionado cambia, se desactiva la selección local
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
      onClick={!loanIsDisabled ? onClick: () => {}} 
      style={{
        backgroundColor: selectedLoanIndex === id ? 'rgba(0, 0, 0, 0.07)': (prestamo.status === 'deuda' ? '#FF8A80': ''),
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
          prestamo.maestro.nombre 
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
      <td className="f-center">
        <DevicesDropdown devicesList={prestamo.dispositivos} />
      </td>

      {/* Observaciones */}
      <td className="f-center">
        <LabelTooltip visibleWords={10} text={prestamo.observaciones} />  
      </td>

      {/* Botón para devolver el préstamo */}
      <td>
        <ReturnLoanButton 
          loanID={prestamo._id}
          dispositivos={prestamo.dispositivos} />
      </td>
    </tr> 
  );
}

interface ActiveLoansListRowProps {
  id: number;
  prestamo: Prestamo;
}
