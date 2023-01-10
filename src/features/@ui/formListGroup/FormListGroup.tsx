import React from 'react';
import Label, {LabelProps} from '../label/Label';
import ListInput, {ListInputProps} from '../listInput/ListInput';

export default function FormListGroup(props: FormListGroupProps) {
  return (
    <div style={{
        display: "flex",
        flexFlow: "column",
        padding: ".5rem .2rem",
        ...props.styles,
      }}>
      {
        props.label && <Label {...props.label} />
      }
      
      <ListInput {...props.listInput} />
    </div>
  );
}

interface FormListGroupProps {
  label?: LabelProps;
  listInput: ListInputProps;
  styles?: any;
}
