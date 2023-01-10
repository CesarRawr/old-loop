import React from 'react';
import {Field} from 'react-final-form';

function InputAdapter({ input, ...rest }: any) {
  return (
    <input {...input} {...rest} />
  );
}

export default function Input(props: InputProps) {
  const handleClick = (event: any) => event.target.select();

  return (
    <Field 
      name={props.name}
      className="listInput" 
      style={props.styles} 
      disabled={props.disabled}
      placeholder={props.placeholder} 
      onClick={props.select ? handleClick: undefined}
      autoComplete={!props.autocomplete ? "on": props.autocomplete} 
      value={props.value}
      component={InputAdapter}  />
  );
}

export interface InputProps {
  name: string;
  styles?: any;
  disabled?: boolean;
  placeholder: string;
  select?: boolean;
  autocomplete?: "on" | "off";
  value?: string;
}