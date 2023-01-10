import React, {useEffect} from 'react';
import {FormListGroup} from '../../@ui';
import {SelectorProps} from '../../../types';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';

import {fetchCourses, selectCourses} from '../courseSlice';

export default function CourseSelector(props: SelectorProps) {
  const dispatch = useAppDispatch();
  const courses = useAppSelector(selectCourses);

  useEffect(() => {
    dispatch(fetchCourses());
    
  }, [dispatch]);

  const onChange = (selectedItem: any) => {
    props.setValue('materias', selectedItem);
  }

  return (
    <FormListGroup 
      styles={{
        width: "20vw"
      }}
      label={{
        text: 'Materia',
        styles: {
          marginBottom: ".5rem",
        }
      }}
      listInput={{
        name: 'materias',
        placeholder: 'Materia',
        size: 70,
        optionList: courses,
        styles: {
          marginLeft: ".5rem",
        },
        select: true,
        onChange,
      }} />
  );
}