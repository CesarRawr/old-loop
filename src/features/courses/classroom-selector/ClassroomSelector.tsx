import React, {useEffect, useMemo} from 'react';
import {FormListGroup} from '../../@ui';
import {SelectorProps} from '../../../types';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';

import {setControl} from '../../devices/deviceSlice';
import {fetchClassrooms, selectClassrooms} from '../courseSlice';

export default function ClassroomSelector(props: SelectorProps) {
  const dispatch = useAppDispatch();
  const classrooms = useAppSelector(selectClassrooms);

  // En caso de haber un valor inicial, se crea una función
  // estática para enviar el valor en su respectivo objeto.
  const {initialValue} = props;
  const defaultValue: any = useMemo(() => {
    return !initialValue ? undefined: {
      label: initialValue.materia.horario.aula,
      value: initialValue.materia.horario.aula,
    }
  }, [initialValue]);

  const {isLoading, disabled} = props;
  useEffect(() => {
    if (!isLoading && !disabled) {
      dispatch(fetchClassrooms());
    }
  }, [dispatch, isLoading]);

  const onChange = (selectedItem: any) => {
    props.setValue('aulas', selectedItem);
    dispatch(setControl(selectedItem.value));
  }

  return (
    <FormListGroup 
      label={{
        text: 'Aula',
        styles: {
          marginBottom: ".5rem",
        }
      }}
      listInput={{
        isLoading: isLoading,
        name: 'aulas',
        placeholder: 'Aula',
        size: 5,
        optionList: classrooms,
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
