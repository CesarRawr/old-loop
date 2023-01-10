import React from 'react';
import Label, {LabelProps} from '../label/Label';
import Input, {InputProps} from '../input/Input';

import styles from './FormGroup.module.css';

export default function FormGroup(props: FormGroupProps) {
  return (
    <div className={styles.formGroup} style={props.styles}>
      {
        props.label && <Label {...props.label} />
      }

      <Input {...props.input} />
    </div>
  );
}

interface FormGroupProps {
  label?: LabelProps;
  input: InputProps;
  styles?: any;
}
