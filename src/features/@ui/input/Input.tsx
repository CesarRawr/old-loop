import React, {useState, useEffect, useRef} from 'react';
import InputLoading from '../inputLoading/InputLoading';
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
  const [width, setWidth] = useState<number>(0);
  const ref = useRef<any>(null);

  useEffect(() => {
    if (!!ref) {
      setWidth(ref.current.clientWidth);
      setHeight(ref.current.offsetHeight);
    }
  }, [ref]);

  return (
    <>
      {
        !!props.isLoading ? (
          <InputLoading height={height} />
        ):(
          <div ref={ref} className={styles.inputContainer}>
            <Field 
              name={props.name}
              type={props.type}
              style={{...props.styles, maxHeight: height}} 
              disabled={props.disabled}
              placeholder={props.placeholder} 
              onClick={props.select ? handleClick: undefined}
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
  placeholder: string;
  select?: boolean;
  autocomplete?: "on" | "off";
  isLoading?: boolean;
  value?: string;
  type?: string;
}