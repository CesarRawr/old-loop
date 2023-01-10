import React from 'react';

export default function Input(props: InputProps) {
  const handleClick = (event: any) => event.target.select();

  return (
    <input 
      className="listInput" 
      name={props.name}
      style={props.styles} 
      disabled={props.disabled}
      placeholder={props.placeholder} 
      onClick={props.select ? handleClick: undefined}
      autoComplete={!props.autocomplete ? "on": props.autocomplete} 
      value={props.value}
      onChange={props.onChange}
      />
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
  onChange?: () => void;
}