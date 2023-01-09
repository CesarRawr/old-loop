import React, {useState} from 'react';
import {Form} from 'react-final-form';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../../app/hooks';
import {FormGroup, Button, Label} from '../../@ui';
import {open, setTitle, setDescription} from '../../dialog/dialogSlice';
import axios from 'axios';

import {urlBase} from '../../../variables';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const openDialog = (title: string, descripcion: string) => {
    dispatch(setTitle(title));
    dispatch(setDescription(descripcion));
    dispatch(open());
  }

  // Function to get values when submit form
  const onSubmit = (values: any) => {
    if (!values.nickname || !values.password) {
      openDialog('Mensaje', 'No deje campos vacios');
      return;
    };

    setIsLoading(true);
    axios.post(`${urlBase}/v1/login`, {
      nickname: values.nickname,
      pass: values.password,
    })
    .then((response: any) => {
      setIsLoading(false);
      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        navigate('/home');
      }
    })
    .catch((error: any) => {
      setIsLoading(false);
      console.log(error);
      if (error.code === 'ERR_NETWORK') {
        openDialog('Mensaje', 'Error al conectar con servidor');
        return;
      }

      if (error.response.status === 401) {
        openDialog('Mensaje', 'Usuario y/o contraseña incorrectos');
        return;
      }

      if (error.response.status === 500) {
        openDialog('Mensaje', 'Error al conectar con servidor');
        return;
      }

      openDialog('Mensaje', 'Error al conectar con servidor');
    });
  }

  return (
    <div className={styles.loginForm}>
      <Form 
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => (
          <form
            onSubmit={handleSubmit}
            className={styles.form}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: ".9rem",
              }}>
              <Label text="Login" size="28px" />
            </div>

            <FormGroup 
              label={{
                text:"Nickname",
              }}
              input={{
                name: 'nickname',
                disabled: isLoading, 
                placeholder: 'Nickname',
              }} 
              styles={{
                marginBottom: "1.1rem",
              }} />

            <FormGroup 
              label={{
                text:"Contraseña"
              }}
              input={{
                name: 'password',
                type: 'password',
                disabled: isLoading, 
                placeholder: 'Contraseña',
              }} 
              styles={{
                marginBottom: "1.1rem",
              }} />

            <div>
              <Button 
              type="submit"
              text="Login"
              disabled={isLoading} />
            </div>
          </form>
        )} />
    </div>
  );
}
