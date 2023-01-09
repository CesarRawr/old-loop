import React from 'react';
import {AlertDialog} from '../@ui';
import {useAppSelector, useAppDispatch} from '../../app/hooks';
import {serializeFunction, deserializeFunction} from '../utils';

import {
  open,
  close, 
  setTitle, 
  selectTitle, 
  selectIsOpen, 
  setDescription, 
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

  // Algunas funciones abren dialogos
  const openDialog = (title: string, descripcion: string) => {
    dispatch(setTitle(title));
    dispatch(setDescription(descripcion));
    dispatch(open());
  }

  // Funcion del botón de aceptar para el dialogo
  const acceptHandler = () => {
    // Se cierra el dialogo actual
    dispatch(close());

    // Quitar la opcion del dialogo
    dispatch(setAcceptOptions({
      isOptionEnabled: false,
      callbackData: {},
      callback: serializeFunction(() => {}),
    }));
    
    /* Se realizan operaciones */
    // La función serializada se debe convertir de nuevo a función y ejecutarse
    deserializeFunction(callback)(callbackData);
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
