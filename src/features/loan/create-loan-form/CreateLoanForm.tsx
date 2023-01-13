import React from 'react';
import {getDate} from '../../utils';
import {Form} from 'react-final-form';

import DeviceSelector from '../../devices/device-selector/DeviceSelector';
import {
  ClassroomSelector,
  CourseSelector,
  HoursSelector,
  NrcSelector,
  StudentSelector,
  TeacherSelector
} from '../../courses';

import {useAppSelector} from '../../../app/hooks';
import {selectSelectedDevices} from '../../devices/deviceSlice';

import {
  Label,
  Button,
  Input
} from '../../@ui';

import styles from './CreateLoanForm.module.css';

// Formulario para crear un prestamo
export default function CreateLoanForm() {
  const devices = useAppSelector(selectSelectedDevices);

  const onSubmit = (formData: any) => {
    const formDataProperties: string[] = [
      "aulas",
      "horaFin",
      "horaInicio",
      "maestros",
      "materias",
      "nrcs"
    ];

    console.log(formData);
    console.log(devices);

    let isEmpty = false;
    for (let property of formDataProperties) {
      isEmpty = !formData.hasOwnProperty(property);
    }

    console.log(isEmpty);
  }

  return (
    <div className={styles.createLoan}>
      <Form
        onSubmit={onSubmit}
        mutators={{
          // expect (field, value) args from the mutator
          setValue: ([field, value], state, { changeValue }) => {
            changeValue(state, field, () => value)
          }
        }}
        render={({ handleSubmit, form: { mutators: { setValue } } }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            {/* Top pane */}
            <div className={styles.f}>

              {/* Fecha */}
              <div className={styles.formGroup}>
                <Label className={styles.marginBottom} text="Fecha" size="16px" />
                <Label className={styles.marginLeft} text={getDate(new Date())} size="20px" />
              </div>

              {/* Nrc */}
              <NrcSelector setValue={setValue} />

              {/* Maestro */}
              <TeacherSelector setValue={setValue} />

              {/* Materia */}
              <CourseSelector setValue={setValue} />

              {/* Aula */}
              <ClassroomSelector setValue={setValue} />

              {/* Horario */}
              <HoursSelector setValue={setValue} />
            </div>

            {/* Bottom pane */}
            <div className={styles.bottomPane}>
              <DeviceSelector />
              <StudentSelector setValue={setValue} />
              
              <div style={{
                  display: "flex",
                  flexFlow: "column",
                  alignItems: "stretch",
                }}>
                <Input 
                  name="observaciones"
                  placeholder="Observaciones" 
                  autocomplete="off" />
              </div>

              <div className={styles.btnContainer}>
                <Button 
                  type="submit"
                  text="Prestar" />
              </div>
            </div>
          </form>
        )}
      />
    </div>
  );
}
