import React, {useEffect} from 'react';
import {FormListGroup} from '../../@ui';
import {SelectorProps} from '../../../types';
import {getDayName} from '../../utils';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';

import {fetchNrcs, selectNrcs, selectCourses} from '../courseSlice';

export default function NrcSelector(props: SelectorProps) {
  const dispatch = useAppDispatch();
  const nrcs = useAppSelector(selectNrcs);
  const courses = useAppSelector(selectCourses);

  useEffect(() => {
    dispatch(fetchNrcs());
  }, [dispatch]);

  const onChange = (selectedItem: any) => {
    props.setValue('nrcs', selectedItem);

    // Setteando maestro
    props.setValue('maestros', selectedItem.maestro ? {
      label: selectedItem.maestro.nombre,
      value: selectedItem.maestro._id,
    }: '');

    // Setteando materia
    props.setValue('materias', {
      label: selectedItem.materia.nombre,
      value: selectedItem.materia._id,
    });

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
      styles={{
        width: "6.5vw"
      }}
      label={{
        text: 'Nrc',
        styles: {
          marginBottom: ".5rem",
        }
      }}
      listInput={{
        name: 'nrcs',
        placeholder: 'Nrc',
        size: 5,
        optionList: nrcs,
        styles: {
          marginLeft: ".5rem",
        },
        select: true,
        onChange,
      }} />
  );
}
