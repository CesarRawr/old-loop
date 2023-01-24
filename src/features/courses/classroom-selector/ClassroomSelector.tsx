import React, {useEffect} from 'react';
import {FormListGroup} from '../../@ui';
import {SelectorProps} from '../../../types';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';

import {fetchClassrooms, selectClassrooms} from '../courseSlice';

export default function ClassroomSelector(props: SelectorProps) {
  const dispatch = useAppDispatch();
  const classrooms = useAppSelector(selectClassrooms);

  const {isLoading} = props;
  useEffect(() => {
    if (!isLoading) {
      dispatch(fetchClassrooms());
    }
  }, [dispatch, isLoading]);

  const onChange = (selectedItem: any) => {
    props.setValue('aulas', selectedItem);
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
      }} />
  );
}
