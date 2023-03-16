import React from 'react';
import {Field} from 'react-final-form';
import TextField from '@mui/material/TextField';

function InputAdapter({ input, meta: { error, touched }, ...rest }: any) {
  return (
    <TextField {...input} {...rest} variant="outlined" size="small" error={touched && !!error} helperText={touched && error} />
  );
}

export default function InputMui(props: InputProps) {
  const handleClick = (event: any) => event.target.select();

  return (
    <>
      <div>
        <Field 
          name={props.name}
          type={props.type}
          disabled={props.disabled}
          label={props.label} 
          margin={props.margin ? props.margin: "normal"}
          autoComplete={!props.autocomplete ? "on": props.autocomplete}
          component={InputAdapter}  />
      </div>
    </>
  );
}

export interface InputProps {
  name: string;
  styles?: any;
  disabled?: boolean;
  label: string;
  autocomplete?: "on" | "off";
  isLoading?: boolean;
  type?: string;
  margin?: "none" | "dense" | "normal"
}