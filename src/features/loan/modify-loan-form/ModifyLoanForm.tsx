/*
* Tablero para modificar el préstamo. 
* Se activa al seleccionar un préstamo activo.
**/

import React, {useState, useEffect} from 'react';
import {getDate} from '../../utils';
import {Form} from 'react-final-form';
import {useNavigate} from 'react-router-dom';
import {Prestamo} from '../../../datatest/models';
import {firstValidations, secondValidations} from '../create-loan-form/createLoanValidations';
import {fetchActiveLoans, setSelectedLoanIsDisabled} from '../active-loans-list/activeLoansListSlice';

import {
  modifyLoan,
  selectStatus,
  setStatus,
  selectSelectedLoan,
  setSelectedLoan,
  ModifyData,
} from './modifyLoanFormSlice';

import {decodeToken} from '../../utils';
import {
  getDevicesToSelect, 
  getDataToSend, 
  getDeletedDevices
} from './ModifyLoanFormHelpers';

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
  selectStatus as selectDevicesStatus,
  selectSelectedDevices, 
  clearDevices,
  setDeviceAmount,
  updateDeviceAmount,
  updateSelected,
} from '../../devices/deviceSlice';

import {useAppSelector, useAppDispatch} from '../../../app/hooks';
import {Label, Button, Input, AlertDialog} from '../../@ui';

import styles from '../create-loan-form/CreateLoanForm.module.css';
import { Item } from '../../devices/device-selector/deviceSelectorController';

// Formulario para crear un prestamo
export default function ModifyLoanForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const devices: Item[] = useAppSelector(selectDevices);
  const selectedDevices: Item[] = useAppSelector(selectSelectedDevices);
  const status = useAppSelector(selectStatus);

  // Préstamo seleccionado, agrega los dispositivos seleccionados 
  // al input de los dispositivos.
  const selectedLoan: Prestamo | undefined = useAppSelector(selectSelectedLoan);
  const devicesListStatus: 'idle' | 'loading' | 'failed' = useAppSelector(selectDevicesStatus);
  useEffect(() => {
    if (!selectedLoan && devicesListStatus !== 'idle') return;
    dispatch(clearDevices());
    const devicesToSelect: (Item | undefined)[] = getDevicesToSelect(devices, selectedLoan);

    // Resta la cantidad de prèstamo al dispositivo en la lista de dispositivos
    for (let device of devicesToSelect) {
      dispatch(setDeviceAmount(device as Item));
    }

    // Selecciona cada dispositivo y lo coloca en el input de dispositivos.
    for (let device of devicesToSelect) {
      const {localPrestado} = device as Item;
      for (let i = 0; i < localPrestado; i++) {
        dispatch(updateDeviceAmount(device as Item));
        dispatch(updateSelected(device as Item));
      }
    }
  }, [selectedLoan, devicesListStatus, dispatch]);

  // Dialog variables
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isOptionEnabled, setIsOptionEnabled] = useState<boolean>(false);

  // Submit form
  // Form contiene la informacion de los mutators del formulario.
  const [form, setForm] = useState<any>();
  // Form data contiene la información de los inputs en el formulario.
  const [formData, setFormData] = useState<any>();

  // Send Flag
  const [send, setSend] = useState<boolean>(false);
  useEffect(() => {
    // Para enviar el préstamo es necesario que formData y form tengan datos, 
    // Y que la bandera send sea activada
    if (!!formData && !!form && send) {
      setSend(false);
      updateLoan();
    }
  }, [formData, form, send]);

  const updateLoan = () => {
    const userData: any = decodeToken();

    // Si el usuario es null, significa que no hay token
    // ésto solo es por si acaso, en teoria nadie puede acceder al sistema sin un token.
    if (!userData) {
      localStorage.clear();
      navigate('/', { replace: true });
      return;
    }

    // Obtener la informacion que se va a enviár
    const dataToSend: ModifyData[] = getDataToSend(selectedDevices, selectedLoan);

    // La función dataToSend no recupera los dispositivos eliminados.
    // Recuperar los dispositivos eliminados.
    const deletedDevices: (ModifyData | undefined)[] | undefined = getDeletedDevices(selectedDevices, selectedLoan);

    // Obtener los dispositivos que tengan cambios
    const changedDevices: ModifyData[] = dataToSend.filter((device: any) => device.operation !== "idle");
    // Si no hay dispositivos modificados o eliminados
    if (!changedDevices.length && !deletedDevices?.length) {
      openDialog('Mensaje', 'No se han hecho cambios en los dispositivos seleccionados');
      return;
    }

    // Desactivar lista para que no interfiera con el envio de la informacion
    dispatch(setSelectedLoanIsDisabled(true));
    // Enviar datos
    dispatch(modifyLoan({
      loanID: selectedLoan?._id as string,
      changedDevices, 
      deletedDevices
    })).unwrap()
    .then((result: any) => {
      if (!result.error) {
        dispatch(fetchActiveLoans());
        dispatch(setSelectedLoan(undefined));
      }

      dispatch(setSelectedLoanIsDisabled(false));
      openDialog('Mensaje', result.msg);
    })
    .catch((e) => {
      dispatch(setSelectedLoanIsDisabled(false));
      openDialog('Mensaje', 'Error al conectar con el servidor');
    });
  }

  const onSubmit = (data: any, form: any) => {
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
