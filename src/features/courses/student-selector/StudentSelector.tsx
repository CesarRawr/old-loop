import React, {useEffect} from 'react';
import {ListInput} from '../../@ui';
import {SelectorProps} from '../../../types';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';

import {fetchStudents, selectStudents} from '../courseSlice';

export default function StudentSelector(props: SelectorProps) {
  const dispatch = useAppDispatch();
  const students = useAppSelector(selectStudents);

  useEffect(() => {
    // Solo en caso de contar con una base de datos de los alumnos
    // Eliminar si no es así
    dispatch(fetchStudents());
  }, [dispatch]);

  const onChange = (selectedItem: any) => {
    props.setValue('alumnos', selectedItem);
  }

  return (
    <div>
      <ListInput 
        isLoading={props.isLoading}
        name="alumnos" 
        placeholder="Alumno" 
        optionList={students}
        onChange={onChange} 
        clearable />
    </div>
  );
}