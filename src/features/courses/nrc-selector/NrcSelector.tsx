import {useEffect, useMemo} from 'react';
import {ActionMeta} from 'react-select';
import {FormListGroup} from '@ui/index';

import type {NrcTag} from '@models/types';
import type {SelectorProps} from '@models/interfaces';
import {useAppSelector, useAppDispatch} from '@app/hooks';

import {
  fetchNrcs, 
  selectNrcs, 
  selectCourses
} from '@courses/courseSlice';

import {
  clearAction,
  setFirstLoanData,
  setSecondLoanData
} from './NrcSelectorHelper';

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

  // Cargar los nrc iniciales al montar el componente.
  const {isLoading, disabled} = props;
  useEffect(() => {
    if (!isLoading && !disabled) {
      dispatch(fetchNrcs());
    }
  }, [dispatch, isLoading]);

  // Cargar la información en los input del préstamo
  const loadLoanData = (setValue: any, selectedItem: NrcTag) => {
    // Settea el nrc, el maestro y la materia
    setFirstLoanData(setValue, selectedItem);

    // Si no hay clases en el horario, dejar vacios los campos de aula, horainicio y hora fin
    const dayNumber = new Date().getDay();
    if (dayNumber > 0 && dayNumber < 6) {
      setSecondLoanData(setValue, selectedItem, dispatch);
    }
  }

  // Ejecuta la opción que lanza el input.
  const onChange = (selectedItem: NrcTag, {action}: ActionMeta<any>) => {
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
