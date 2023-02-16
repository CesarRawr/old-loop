import React from 'react';
import {DropdownButton} from '../../@ui';
import {MetaDispositivo} from '../../../datatest/models';

// Botón para desplegar la lista de dispositivos 
// prestados en la lista de prestamos activos
export default function DevicesDropdown(props: DevicesDropdownProps) {
  const listItems: string[] = props.devicesList.map((dispositivo: MetaDispositivo) => `${dispositivo.nombre} (${dispositivo.localPrestado})`);

  return (
    <DropdownButton text='Dispositivos' listItems={listItems} />
  );
}

interface DevicesDropdownProps {
  devicesList: MetaDispositivo[];
}
