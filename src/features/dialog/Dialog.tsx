import React from 'react';
import {AlertDialog} from '../@ui';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {serializeFunction, deserializeFunction} from '../utils';

import {
  close, 
  open,
  selectTitle, 
  selectIsOpen, 
  setAcceptOptions,
  selectDescription, 
  selectAcceptOptions,
} from './dialogSlice';

export default function Dialog() {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectIsOpen);
  const title = useAppSelector(selectTitle);
  const description = useAppSelector(selectDescription);
  const {isOptionEnabled, callbackData, callback} = useAppSelector(selectAcceptOptions);

  const handleClose = () => {
    dispatch(close());
  }

  // Funcion del botón de aceptar para el dialogo
  const acceptHandler = () => {
    // La función serializada se debe convertir de nuevo a función y ejecutarse
    deserializeFunction(callback)(callbackData);

    // Quitar la opcion del dialogo
    dispatch(setAcceptOptions({
      isOptionEnabled: false,
      callbackData: {},
      callback: serializeFunction(() => {}),
    }));

    // Cerrar diaogo
    dispatch(close());
  }

  return (
    <AlertDialog 
      isOpen={isOpen}
      title={title}
      description={description}
      handleClose={handleClose} 
      isOptionEnabled={isOptionEnabled}
      acceptHandler={acceptHandler} />
  );
}
