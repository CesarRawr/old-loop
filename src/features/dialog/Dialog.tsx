import React from 'react';
import {AlertDialog} from '../@ui';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {serializeFunction, deserializeFunction} from '../utils';

import {
  close,
  selectTitle, 
  selectIsOpen, 
  selectDescription, 
} from './dialogSlice';

export default function Dialog() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpen);
  const title = useAppSelector(selectTitle);
  const description = useAppSelector(selectDescription);

  const handleClose = () => {
    dispatch(close());
  }

  return (
    <AlertDialog 
      isOpen={isOpen}
      title={title}
      description={description}
      handleClose={handleClose} />
  );
}
