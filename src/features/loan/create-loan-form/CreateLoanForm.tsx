import React, {useState} from 'react';
import {getDate} from '../../utils';
import {Form} from 'react-final-form';
import {Prestamo, Dispositivo} from '../../../datatest/models';
import {serializeFunction, getDayName} from '../../utils';
import {firstValidations, secondValidations} from './createLoanValidations';

import DeviceSelector from '../../devices/device-selector/DeviceSelector';
import {
  ClassroomSelector,
  CourseSelector,
  HoursSelector,
  NrcSelector,
  StudentSelector,
  TeacherSelector
} from '../../courses';

import {useAppSelector, useAppDispatch} from '../../../app/hooks';
import {selectDevices, selectSelectedDevices} from '../../devices/deviceSlice';

// Dialog controllers
import {
  open, 
  setTitle, 
  setDescription, 
  setAcceptOptions
} from '../../dialog/dialogSlice';

import {
  Label,
  Button,
  Input
} from '../../@ui';

import styles from './CreateLoanForm.module.css';

// Formulario para crear un prestamo
export default function CreateLoanForm() {
  const dispatch = useAppDispatch();
  const devices = useAppSelector(selectDevices);
  const selectedDevices = useAppSelector(selectSelectedDevices);

  const [isLoading, setIsLoading] = useState(false);

  const sendLoan = ({selectedDevices, formData}: { selectedDevices: any; formData: any; }) => {
    const loan: Prestamo = {
      observaciones: formData.hasOwnProperty('observaciones') ? formData.observaciones: '',
      status: "activo",
      maestro: {
        _id: formData.maestros.value,
        nombre: formData.maestros.label,
      },
      materia: {
        _id: formData.materias.value,
        nombre: formData.materias.label,
        nrc: formData.nrcs.value,
        horario: {
          aula: formData.aulas.value,
          horaInicio: formData.horaInicio.value,
          horaFin: formData.horaFin.value,
          dia: getDayName(),
        }
      },
      dispositivos: selectedDevices.map((dispositivo: Dispositivo) => {
        return {
          id: dispositivo._id,
          nombre: dispositivo.nombre,
          prestado: dispositivo.prestado + dispositivo.localPrestado,
          stock: dispositivo.stock,
        }
      }),
      usuario: {
        _id: "",
        nickname: "",
      },
      timelog: {
        inicio: new Date(),
      },
      alumno: formData.hasOwnProperty('alumnos') ? formData.alumnos: undefined,
    }

    console.log(loan);
  }

  const onSubmit = (formData: any) => {
    // Validaciones de campos sencillas
    let validationsResult: any = firstValidations({formData, selectedDevices});
    if (!validationsResult.isValid) {
      setIsLoading(validationsResult.isValid);
      openDialog(validationsResult.dialog.title, validationsResult.dialog.description);
      return;
    }

    // Validaciones complejas relacionadas con dispositivos
    validationsResult = secondValidations({formData, selectedDevices, devices});
    if (!validationsResult.isValid) {
      setIsLoading(validationsResult.isValid);

      // En caso de requerir la opcion de aceptar, se carga la opción con
      // sus variables y callback
      if (validationsResult.requireAcceptOption) {
        dispatch(setAcceptOptions({
          isOptionEnabled: true,
          callbackData: {
            devices: devices,
          },
          callback: serializeFunction(sendLoan),
        }));
      }

      openDialog(validationsResult.dialog.title, validationsResult.dialog.description);
      return;
    }

    sendLoan({selectedDevices, formData});
  }

  const openDialog = (title: string, descripcion: string) => {
    dispatch(setTitle(title));
    dispatch(setDescription(descripcion));
    dispatch(open());
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
