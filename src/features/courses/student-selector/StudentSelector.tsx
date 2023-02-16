import React, {useEffect, useMemo} from 'react';
import {ListInput} from '../../@ui';
import {SelectorProps} from '../../../types';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';

import {fetchStudents, selectStudents} from '../courseSlice';

export default function StudentSelector(props: SelectorProps) {
  const dispatch = useAppDispatch();
  const students = useAppSelector(selectStudents);

  // En caso de haber un valor inicial, se crea una función
  // estática para enviar el valor en su respectivo objeto.
  const {initialValue} = props;
  const defaultValue: any = useMemo(() => {
    return !initialValue ? undefined: (!initialValue.alumno ? '': {
      label: initialValue.alumno.nombre,
      value: initialValue.alumno._id,
    })
  }, [initialValue]);

  const {isLoading, disabled} = props;
  useEffect(() => {
    // Solo en caso de contar con una base de datos de los alumnos
    // Eliminar si no es así
    if (!isLoading && !disabled) {
      dispatch(fetchStudents());
    }
  }, [dispatch, isLoading]);

  const onChange = (selectedItem: any) => {
    props.setValue('alumnos', selectedItem);
  }

  return (
    <div>
      <ListInput 
        isLoading={isLoading}
        name="alumnos" 
        placeholder="Alumno"
        optionList={students}
        onChange={onChange} 
        clearable
        disabled={disabled}
        initialValue={defaultValue} />
    </div>
  );
}