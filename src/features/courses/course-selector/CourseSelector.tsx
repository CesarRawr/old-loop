import {useEffect, useMemo} from 'react';
import {FormListGroup} from '@ui/index';
import {ActionMeta} from 'react-select';
import {setControl} from '@devices/deviceSlice';
import {useAppSelector, useAppDispatch} from '@app/hooks';

import type {NrcTag} from '@models/types';
import type {SelectorProps, Horario} from '@models/interfaces';

import {
  setLoanData,
  clearAction, 
  getTodayCourses, 
  getNearestCourse,
  getOrderedSchedules,
  thereAreConsecutives,
  getTodayCoursesSchedule,
} from './CourseSelectorHelper';

import {
  fetchCourses, 
  selectCourses, 
  selectNrcs
} from '@courses/courseSlice';

export default function CourseSelector(props: SelectorProps) {
  const dispatch = useAppDispatch();
  const nrcs = useAppSelector(selectNrcs);
  const courses = useAppSelector(selectCourses);

  // En caso de haber un valor inicial, se crea una función
  // estática para enviar el valor en su respectivo objeto.
  const {initialValue} = props;
  const defaultValue: any = useMemo(() => {
    return !initialValue ? undefined: {
      label: initialValue.materia.nombre,
      value: initialValue.materia._id,
    }
  }, [initialValue]);

  const {isLoading, disabled} = props;
  useEffect(() => {
    // Dejar que carguen los nrc primero
    if (!isLoading && !disabled) {
      dispatch(fetchCourses());
    }
  }, [dispatch, nrcs, isLoading]);

  const loadLoanData = (setValue: any, selectedItem: any) => {
    props.setValue('materias', selectedItem);

    // Si el curso no tiene horarios hoy
    const todayCourses: NrcTag[] = getTodayCourses(nrcs, selectedItem);
    if (!todayCourses.length) {
      return;
    }

    // Obtener los horarios de hoy de los cursos
    const horariosDesordenados: (NrcTag | undefined)[] = getTodayCoursesSchedule(todayCourses);
    if (!horariosDesordenados || !horariosDesordenados.length) {
      return;
    }

    // Ordenar los horarios de mas temprano a mas tarde
    const horariosActuales: (NrcTag | undefined)[] = getOrderedSchedules(horariosDesordenados);

    // Saber si existen horarios consecutivos
    const areConsecutive: boolean = thereAreConsecutives(horariosActuales as NrcTag[]);
    // Conseguir el horario mas cercano a la hora mas cercana
    const nearestCourse: NrcTag | undefined = getNearestCourse(horariosActuales, areConsecutive);
    if (!nearestCourse) {
      return;
    }

    return setLoanData(setValue, nearestCourse, dispatch);
  }

  const onChange = (selectedItem: any, {action}: ActionMeta<any>) => {
    const {setValue} = props;
    const options: any = {
      'clear': () => clearAction(setValue),
      'select-option': () => {
        loadLoanData(setValue, selectedItem);
      }
    }

    return options[action]();
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
        initialValue: defaultValue,
        disabled,
      }} />
  );
}