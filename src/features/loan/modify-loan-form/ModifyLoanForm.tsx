/*
* Tablero para modificar el préstamo. 
* Se activa al seleccionar un préstamo activo.
**/

import React, {useState, useEffect} from 'react';
import {getDate} from '../../utils';
import {Form} from 'react-final-form';
import {useNavigate} from 'react-router-dom';
import {Prestamo, Dispositivo, MetaDispositivo} from '../../../datatest/models';
import {firstValidations, secondValidations} from '../create-loan-form/createLoanValidations';
import {fetchActiveLoans} from '../active-loans-list/activeLoansListSlice';

import {
  modifyLoan, 
  selectStatus, 
  setStatus, 
  selectSelectedLoan
} from './modifyLoanFormSlice';

import {
  getDayName, 
  decodeToken
} from '../../utils';

import DeviceSelector from '../../devices/device-selector/DeviceSelector';
import {
  ClassroomSelector,
  CourseSelector,
  HoursSelector,
  NrcSelector,
  StudentSelector,
  TeacherSelector
} from '../../courses';

import {
  selectDevices, 
  selectSelectedDevices, 
  clearDevices,
  setDeviceAmount,
  updateDeviceAmount,
  updateSelected
} from '../../devices/deviceSlice';

import {useAppSelector, useAppDispatch} from '../../../app/hooks';
import {Label, Button, Input, AlertDialog} from '../../@ui';

import styles from '../create-loan-form/CreateLoanForm.module.css';
import { Item } from '../../devices/device-selector/deviceSelectorController';

// Formulario para crear un prestamo
export default function ModifyLoanForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const devices = useAppSelector(selectDevices);
  const selectedDevices = useAppSelector(selectSelectedDevices);
  const status = useAppSelector(selectStatus);

  // Préstamo seleccionado
  const selectedLoan: Prestamo | undefined = useAppSelector(selectSelectedLoan);
  useEffect(() => {
    if (!selectedLoan) return;
    dispatch(clearDevices());
    // Agregar los dispositivos selecionados al device selector
    const devicesToSelect: (Item | undefined)[] = devices.map((device: Item) => {
      const match: MetaDispositivo | undefined = selectedLoan.dispositivos.reduce((acc: any, activeDevice: MetaDispositivo) => {
        if (activeDevice._id === device._id) {
          acc = activeDevice;
        }
        return acc;
      }, undefined);
    
      return match ? {
        ...device,
        localPrestado: match.localPrestado
      } : undefined;
    }).filter((item: any) => !!item);

    for (let device of devicesToSelect) {
      dispatch(setDeviceAmount(device as Item));
    }

    for (let device of devicesToSelect) {
      const {localPrestado} = device as Item;
      for (let i = 0; i < localPrestado; i++) {
        dispatch(updateDeviceAmount(device as Item));
        dispatch(updateSelected(device as Item));
      }
    }
  }, [selectedLoan]);

  useEffect(() => {
    console.log(devices);
    console.log(selectedDevices);
  }, [devices, selectedDevices])

  // Dialog variables
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isOptionEnabled, setIsOptionEnabled] = useState<boolean>(false);

  // Submit form
  const [form, setForm] = useState<any>();
  const [formData, setFormData] = useState<any>();

  // Send Flag
  const [send, setSend] = useState<boolean>(false);
  useEffect(() => {
    // Para enviar el préstamo es necesario que formData y form tengan datos, 
    // Y que la bandera send sea activada
    if (!!formData && !!form && send) {
      sendLoan();
    }
  }, [formData, form, send]);

  const sendLoan = () => {
    const closeSend = () => {
      setForm(null);
      setFormData(null);
      setSend(false);
    }

    const userData: any = decodeToken();

    // Si el usuario es null, significa que no hay token
    // ésto solo es por si acaso, en teoria nadie puede acceder al sistema sin un token.
    if (!userData) {
      localStorage.clear();
      navigate('/', { replace: true });
      return;
    }

    const {_id, nickname} = userData;
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
          _id: dispositivo._id,
          nombre: dispositivo.nombre,
          localPrestado: dispositivo.localPrestado,
        }
      }),
      usuario: {
        _id,
        nickname,
      },
      timelog: {
        inicio: new Date().toString(),
      },
      alumno: formData.hasOwnProperty('alumnos') ? formData.alumnos: null,
    }

    // Enviar préstamo
    dispatch(modifyLoan(loan))
    .unwrap()
    .then((result) => {
      if (result.status === 200) {
        dispatch(fetchActiveLoans());

        clearAll();
        closeSend();
        return;
      }

      closeSend();
      openDialog('Mensaje', result.data.msg);
      return;
    })
    .catch((e) => {
      console.log(e);
      closeSend();
      openDialog('Error', 'Algo salió mal al intentar realizar un préstamo');
    });
  }

  const onSubmit = (data: any, form: any) => {
    return;
    // Validaciones de campos sencillas
    let validationsResult: any = firstValidations(data, selectedDevices);
    if (!validationsResult.isValid) {
      dispatch(setStatus(validationsResult.isValid));
      openDialog(validationsResult.dialog.title, validationsResult.dialog.description);
      return;
    }

    setFormData(data);
    setForm(form);

    // Validaciones complejas relacionadas con dispositivos
    validationsResult = secondValidations(data, selectedDevices, devices);
    if (!validationsResult.isValid) {
      dispatch(setStatus(validationsResult.isValid));

      // En caso de requerir la opcion de aceptar, se carga la opción con
      // sus variables y callback
      if (validationsResult.requireAcceptOption) {
        setIsOptionEnabled(true);
      }

      openDialog(validationsResult.dialog.title, validationsResult.dialog.description);
      return;
    }

    setSend(true);
  }

  const clearAll = () => {
    form.mutators.setValue('nrcs', '');
    form.mutators.setValue('maestros', '');
    form.mutators.setValue('materias', '');
    form.mutators.setValue('aulas', '');
    form.mutators.setValue('horaInicio', '');
    form.mutators.setValue('horaFin', '');
    form.mutators.setValue('alumnos', '');
    form.mutators.setValue('observaciones', '');
    dispatch(clearDevices());
  }

  // Abrir dialogo
  const openDialog = (title: string, descripcion: string) => {
    setTitle(title)
    setDescription(descripcion)
    setIsDialogOpen(true);
  }

  // Cerrar dialogo
  const handleClose = () => {
    setIsDialogOpen(false);
    if (isOptionEnabled) {
      setIsOptionEnabled(false);
    }
  }

  // Funcion del botón de aceptar para el dialogo
  const acceptHandler = () => {
    // Se cierra el dialogo actual
    handleClose();
    // Quitar la opcion del dialogo
    setIsOptionEnabled(false);
    // Abrir la bandera para enviar el préstamo
    setSend(true);
  }

  return (
    <>      
      <div className={styles.createLoan}>
        <Form
          onSubmit={onSubmit}
          initialValues={selectedLoan}
          mutators={{
            // expect (field, value) args from the mutator
            setValue: ([field, value], state, { changeValue }) => {
              changeValue(state, field, () => value)
            }
          }}
          render={({ handleSubmit, form: { mutators: { setValue } }, values }) => (
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Top pane */}
              <div className={styles.topPane}>

                {/* Fecha */}
                <div className={styles.formGroup}>
                  <Label className={styles.marginBottom} text="Fecha" size="16px" />
                  <Label className={styles.marginLeft} text={getDate(new Date())} size="20px" />
                </div>

                {/* Nrc */}
                <NrcSelector 
                  initialValue={values}
                  setValue={setValue} 
                  isLoading={status === 'loading'} 
                  disabled />

                {/* Maestro */}
                <TeacherSelector 
                  initialValue={values}
                  setValue={setValue} 
                  isLoading={status === 'loading'} 
                  disabled />

                {/* Materia */}
                <CourseSelector 
                  initialValue={values}
                  setValue={setValue} 
                  isLoading={status === 'loading'}
                  disabled />

                {/* Aula */}
                <ClassroomSelector 
                  initialValue={values}
                  setValue={setValue} 
                  isLoading={status === 'loading'}
                  disabled />

                {/* Horario */}
                <HoursSelector 
                  initialValue={values}
                  setValue={setValue} 
                  isLoading={status === 'loading'}
                  disabled />
              </div>

              {/* Bottom pane */}
              <div className={styles.bottomPane}>
                {/* Selector de devices */}
                <DeviceSelector isLoading={status === 'loading'} />
                
                <div 
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '38.3% 38.3% 1fr',
                    gridGap: '1.6%',
                  }} >
                  {/* Estudiantes */}
                  <StudentSelector 
                    initialValue={values}
                    setValue={setValue} 
                    isLoading={status === 'loading'}
                    disabled />

                  {/* Input de observaciones */}
                  <div 
                    style={{
                      display: "flex",
                      flexFlow: "column",
                      alignItems: "stretch",
                    }}>
                    <Input 
                      value={values.observaciones}
                      isLoading={status === 'loading'}
                      name="observaciones"
                      placeholder="Observaciones" 
                      autocomplete="off"
                      disabled />
                  </div>

                  {/* Botón de modificar */}
                  <div className={styles.btnContainer}>
                    <Button 
                      type="submit"
                      text="Modificar" 
                      style={{flexGrow: 1}}
                      disabled={status === 'loading'} />
                  </div>
                </div>
              </div>
            </form>
          )}
        />
      </div>
      <AlertDialog
        isOpen={isDialogOpen}
        title={title}
        description={description}
        handleClose={handleClose} 
        isOptionEnabled={isOptionEnabled}
        acceptHandler={acceptHandler} />
    </>
  );
}