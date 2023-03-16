import React, {useEffect, useMemo} from 'react';
import {FormListGroup} from '../../@ui';
import {SelectorProps} from '../../../types';
import {getDayName} from '../../utils';
import {ActionMeta} from 'react-select';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';

import {selectSelectedLoan} from '../../loan/modify-loan-form/modifyLoanFormSlice';
import {fetchNrcs, selectNrcs, selectCourses} from '../courseSlice';
import {setControl} from '../../devices/deviceSlice';

export default function NrcSelector(props: SelectorProps) {
  const dispatch = useAppDispatch();
  const nrcs = useAppSelector(selectNrcs);
  const courses = useAppSelector(selectCourses);

  // En caso de haber un valor inicial, se crea una función
  // estática para enviar el valor en su respectivo objeto.
  const {initialValue} = props;
  const defaultValue: any = useMemo(() => {
    return !initialValue ? undefined: {
      label: initialValue.materia.nrc,
      value: initialValue.materia.nrc,
    }
  }, [initialValue]);

  const {isLoading, disabled} = props;
  useEffect(() => {
    if (!isLoading && !disabled) {
      dispatch(fetchNrcs());
    }
  }, [dispatch, isLoading]);

  const onChange = (selectedItem: any, actionMeta: ActionMeta<any>) => {
    if (actionMeta.action === 'clear') {
      props.setValue('nrcs', '');
      return;
    }

    props.setValue('nrcs', selectedItem);

    // Setteando maestro
    props.setValue('maestros', selectedItem.maestro ? {
      ...selectedItem.maestro,
      label: selectedItem.maestro.nombre,
      value: selectedItem.maestro._id,
    }: '');

    // Setteando materia
    props.setValue('materias', {
      ...selectedItem.materia,
      label: selectedItem.materia.nombre,
      value: selectedItem.materia._id,
    });

    // Si no hay clases en el horario, dejar vacios los campos de aula, horainicio y hora fin
    const dayNumber = new Date().getDay();
    if (dayNumber > 0 && dayNumber < 6) {
      const dayName = getDayName();
      const horario = selectedItem.horarios.filter((horario: any) => horario.dia === dayName);
      if (!horario.length) {
        props.setValue('aulas', '');
        props.setValue('horaInicio', '');
        props.setValue('horaFin', '');
        return;
      }

      dispatch(setControl(horario[0].aula));
      // Setteando aulas
      props.setValue('aulas', {
        label: horario[0].aula,
        value: horario[0].aula,
      });

      // Setteando hora de inicio
      props.setValue('horaInicio', {
        label: `${horario[0].horaInicio}:00`,
        value: horario[0].horaInicio,
      });

      // Setteando hora de fin
      props.setValue('horaFin', {
        label: `${horario[0].horaFin}:00`,
        value: horario[0].horaFin,
      });
    }
  }

  return (
    <FormListGroup 
      label={{
        text: 'Nrc',
        styles: {
          marginBottom: ".5rem",
        }
      }}
      listInput={{
        isLoading: isLoading,
        name: 'nrcs',
        placeholder: 'Nrc',
        size: 5,
        optionList: nrcs,
        styles: {
          marginLeft: ".5rem",
        },
        select: true,
        onChange,
        initialValue: defaultValue,
        disabled,
      }} />
  );
}
