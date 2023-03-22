import {useState, useEffect} from 'react';
import {Field} from 'react-final-form';
import { FieldRenderProps } from 'react-final-form';
import DatePicker from 'react-datepicker';

import type { DatePickerProps } from '@models/interfaces';

import './DatePicker.css';
import 'react-datepicker/dist/react-datepicker.css';

function DatePickerAdapter({ 
  input: { onChange, value }, 
  meta: { error, touched }, 
  ...rest }: FieldRenderProps<Date, HTMLElement>
) {
  const filterWeekends = (date: any) => {
    const day = date.getDay();
    return day !== 0 && day !== 6;
  }

  return (
    <DatePicker
      selected={value}
      dateFormat="dd/MM/yyyy"
      onChange={onChange}
      className="custom"
      {...rest}
    />
  );
}

export default function LabelDatepicker(props: DatePickerProps) {
  const [date, setDate] = useState<Date>();
  useEffect(() => {
    setDate(new Date());
  }, []);

  return (
    <Field 
      name="fecha" 
      minDate={props.minDate} 
      maxDate={props.maxDate}
      disabled={props.disabled}
      component={DatePickerAdapter} 
      initialValue={date} />
  );
}
