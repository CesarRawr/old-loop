import React, {useEffect} from 'react';
import {FormListGroup} from '../../@ui';
import {SelectorProps} from '../../../types';
import {getDecimalHour, getDayName} from '../../utils';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';

import {fetchTeachers, selectTeachers, selectNrcs} from '../courseSlice';

export default function TeacherSelector(props: SelectorProps) {
  const dispatch = useAppDispatch();
  const nrcs = useAppSelector(selectNrcs);
  const teachers = useAppSelector(selectTeachers);

  useEffect(() => {
    // Dejar que carguen los nrc primero
    if (!!nrcs.length) {
      dispatch(fetchTeachers());
    }
  }, [dispatch, nrcs]);

  const onChange = (selectedItem: any) => {
    props.setValue('maestros', selectedItem);

    const decimalHour = getDecimalHour();
    console.log(nrcs);
    console.log(selectedItem);
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
