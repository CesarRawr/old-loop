import React, {useEffect} from 'react';
import {FormListGroup} from '../../@ui';
import {SelectorProps} from '../../../types';
import type {Horario} from '../../../datatest/models';
import {getDecimalHour, getDayName, getDecimalMinutes, getMDYDateString} from '../../utils';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';

import {fetchCourses, selectCourses, selectNrcs, NrcTag} from '../courseSlice';

export default function CourseSelector(props: SelectorProps) {
  const dispatch = useAppDispatch();
  const nrcs = useAppSelector(selectNrcs);
  const courses = useAppSelector(selectCourses);

  const {isLoading, disabled} = props;
  useEffect(() => {
    // Dejar que carguen los nrc primero
    if (!isLoading && !disabled) {
      dispatch(fetchCourses());
    }
  }, [dispatch, nrcs, isLoading]);

  const onChange = (selectedItem: any) => {
    props.setValue('materias', selectedItem);

    // Obtener los nrc de la materia
    const courseNrcs: any = nrcs.filter((nrc: any) => nrc.materia._id === selectedItem._id);

    // Si el curso no tiene horarios hoy
    if (!courseNrcs.length) {
      return;
    }

    const dayName = getDayName();
    // Obtener los horarios de hoy de los cursos
    const horariosDesordenados: any = courseNrcs.map((course: NrcTag) => {
      const horarios: any = course.horarios.filter((horario: Horario) => {
        let isToday = false;
        if (horario.dia === dayName) {
          isToday = true;
        }

        return isToday;
      });

      return !!horarios.length ? {
        ...course,
        horarios,
      }: undefined;
    }).filter((item: any) => item !== undefined);

    if (!horariosDesordenados.length) {
      return;
    }

    // Ordenar los horarios de mas temprano a mas tarde
    const horariosActuales: any = horariosDesordenados.sort((a: any, b: any) => {
      return a.horarios[0].horaInicio - b.horarios[0].horaInicio;
    });

    let areConsecutive = false;
    if (horariosActuales.length > 1) {
      // Detectar horarios consecutivos
      for (let i = 1; i < horariosActuales.length; i++) {
        if (horariosActuales[i-1].horarios[0].horaFin === horariosActuales[i].horarios[0].horaInicio) {
          areConsecutive = true;
        }
      }
    }

    const actualHour = getDecimalHour();
    const actualMinutes = getDecimalMinutes();
    const actualDate = getMDYDateString(new Date());
    const actualTime = new Date(`${actualDate} ${actualHour}:${actualMinutes}`);
    // Conseguir el horario mas cercano a la hora mas cercana
    const nearest: any = horariosActuales.filter((course: any) => {
      let isNear = false;
      for (let horario of course.horarios) {
        // Si existen consecutivos
        if (areConsecutive) {
          // Parseando horas del horario a objetos Date
          const horaInicio = new Date(`${actualDate} ${horario.horaInicio-1}:40`);
          const horaFin = new Date(`${actualDate} ${horario.horaFin-1}:39`);

          // Si le faltan 20 mins para comenzar y hay consecutivos
          if (actualTime >= horaInicio && horaFin >= actualTime) {
            isNear = true;
            break;
          }

          break;
        }

        /* 
          Si no hay consecutivos 
        */
        
        // Parseando horas del horario a objetos Date
        const horaInicio = new Date(`${actualDate} ${horario.horaInicio-1}:40`);
        const horaFin = new Date(`${actualDate} ${horario.horaFin}:00`);

        if (actualTime >= horaInicio && horaFin >= actualTime) {
          isNear = true;
          break;
        }
      }

      return isNear;
    });

    if (!nearest.length) {
      return;
    }

    // Setteando nrc
    props.setValue('nrcs', nearest[0]);

    // Setteando maestro
    props.setValue('maestros', nearest[0].maestro ? {
      ...nearest[0].maestro,
      label: nearest[0].maestro.nombre,
      value: nearest[0].maestro._id,
    }: '');

    // Setteando aulas
    props.setValue('aulas', {
      label: nearest[0].horarios[0].aula,
      value: nearest[0].horarios[0].aula,
    });

    // Setteando hora de inicio
    props.setValue('horaInicio', {
      label: `${nearest[0].horarios[0].horaInicio}:00`,
      value: nearest[0].horarios[0].horaInicio,
    });

    // Setteando hora de fin
    props.setValue('horaFin', {
      label: `${nearest[0].horarios[0].horaFin}:00`,
      value: nearest[0].horarios[0].horaFin,
    });
  }

  return (
    <FormListGroup 
      label={{
        text: 'Materia',
        styles: {
          marginBottom: ".5rem",
        }
      }}
      listInput={{
        isLoading: isLoading,
        name: 'materias',
        placeholder: 'Materia',
        size: 70,
        optionList: courses,
        styles: {
          marginLeft: ".5rem",
        },
        select: true,
        onChange,
        disabled,
      }} />
  );
}