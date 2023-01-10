import React from 'react';
import {Label, ListInput} from '../../@ui';
import {SelectorProps} from '../../../types';
import styles from './HoursSelector.module.css';

export default function HoursSelector(props: SelectorProps) {

  const onChangeInicio = (selectedItem: any) => {
    props.setValue('horaInicio', selectedItem);
  }

  const onChangeFin = (selectedItem: any) => {
    props.setValue('horaFin', selectedItem);
  }

  return (
    <div className={styles.formGroup}>
      <div className={`${styles.marginBottom} ${styles.f}`}>
        <Label text="Horario" />
      </div>

      <div className={styles.f}>
        <div
          style={{
            width: "5.5vw",
          }}>
          <ListInput 
            name="horaInicio" 
            placeholder="Inicio"
            optionList={[
              {value: 7, label: "07:00"},
              {value: 9, label: "09:00"},
              {value: 11, label: "11:00"},
              {value: 13, label: "13:00"},
              {value: 15, label: "15:00"},
              {value: 17, label: "17:00"},
              {value: 19, label: "19:00"}
            ]} 
            size={5}
            styles={{
              marginLeft: ".5rem",
            }} 
            onChange={onChangeInicio} />
        </div>

        <div 
          style={{
            width: "5.5vw",
          }}>
          <ListInput 
            name="horaFin" 
            placeholder="Fin"
            optionList={[
              {value: 9, label: "09:00"},
              {value: 11, label: "11:00"},
              {value: 13, label: "13:00"},
              {value: 15, label: "15:00"},
              {value: 17, label: "17:00"},
              {value: 19, label: "19:00"},
              {value: 21, label: "21:00"}
            ]} 
            size={5}
            styles={{
              marginLeft: ".7rem",
            }}
            onChange={onChangeFin} />
        </div>
      </div>
    </div>
  );
}