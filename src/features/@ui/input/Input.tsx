import React, {useState, useEffect, useRef} from 'react';
import InputLoading from '../inputLoading/InputLoading';
import {MouseElementFunction} from '../../../types';
import {Field} from 'react-final-form';

import styles from './Input.module.css';

function InputAdapter({ input, ...rest }: any) {
  return (
    <input className={styles.input} {...input} {...rest} />
  );
}

export default function Input(props: InputProps) {
  const handleClick = (event: any) => event.target.select();
  const [height, setHeight] = useState<number>(0);
  const ref = useRef<any>(null);

  useEffect(() => {
    if (!!ref) {
      setHeight(ref.current.offsetHeight);
    }
  }, [ref]);

  return (
    <>
      {
        !!props.isLoading ? (
          <InputLoading height={`${height}px`} />
        ):(
          <div ref={ref} className={styles.inputContainer}>
            <Field 
              ref={props.ref}
              name={props.name}
              type={props.type}
              style={{...props.styles, maxHeight: height}} 
              disabled={props.disabled}
              maxLength={props.maxlength}
              placeholder={props.placeholder} 
              onClick={props.select ? handleClick: (props.onClick ? props.onClick: undefined)}
              autoComplete={!props.autocomplete ? "on": props.autocomplete} 
              value={props.value}
              component={InputAdapter}  />
          </div>
        )
      }
    </>
  );
}

export interface InputProps {
  name: string;
  styles?: any;
  disabled?: boolean;
  placeholder?: string;
  select?: boolean;
  autocomplete?: "on" | "off";
  isLoading?: boolean;
  value?: string;
  type?: string;
  onClick?: MouseElementFunction;
  ref?: any;
  maxlength?: number;
}