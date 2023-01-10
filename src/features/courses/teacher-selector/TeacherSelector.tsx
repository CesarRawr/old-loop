import React, {useEffect} from 'react';
import {FormListGroup} from '../../@ui';
import {SelectorProps} from '../../../types';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';

import {fetchTeachers, selectTeachers} from '../courseSlice';

export default function TeacherSelector(props: SelectorProps) {
  const dispatch = useAppDispatch();
  const teachers = useAppSelector(selectTeachers);

  useEffect(() => {
    dispatch(fetchTeachers());
  }, [dispatch]);

  const onChange = (selectedItem: any) => {
    props.setValue('maestros', selectedItem);
  }

  return (
    <FormListGroup 
      styles={{
        width: "20vw"
      }}
      label={{
        text: 'Maestro',
        styles: {
          marginBottom: ".5rem",
        }
      }}
      listInput={{
        name: 'maestros',
        placeholder: 'Maestro',
        size: 70,
        optionList: teachers,
        styles: {
          marginLeft: ".5rem",
        },
        select: true,
        onChange,
      }} />
  );
}
