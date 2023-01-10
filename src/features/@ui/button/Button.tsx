import React from 'react';
import styles from './Button.module.css';
import {MouseElementFunction} from '../../../types';

export default function Button(props: ButtonProps) {
  return (
    <button 
      type={props.type ? props.type: "button"}
      className={styles.btn} 
      onClick={props.onClick} 
      disabled={props.disabled}
      style={props.style}
      >
      {
        props.text
      }
    </button>
  );
}

interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  style?: any;
  onClick?: MouseElementFunction;
}
