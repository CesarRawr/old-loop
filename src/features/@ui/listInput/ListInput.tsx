import React, {useRef, useEffect, useState} from 'react';
import { Field } from 'react-final-form';
import CreatableSelect from 'react-select/creatable';

import InputLoading from '../inputLoading/InputLoading';

const CreatableAdapter = ({ input, innerRef, ...rest}: any) => {
  return (
    <CreatableSelect
      {...input} 
      {...rest} 
      onInputChange={inputValue =>
        (inputValue.length <= rest.maxLength ? inputValue : inputValue.substr(0, rest.maxLength))
      } 
      searchable />
  );
};

export default function ListInput(props: ListInputProps) {
  const [height, setHeight] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const ref = useRef<any>(null);
  const customStyles = {
    container: (provided: any, state: any) => ({
      ...provided,
    }),
    control: (provided: any, state: any) => ({
      ...provided,
      background: '#fafafa',
      borderColor: '#d1d1d1',
      minHeight: '4.5vh',
      border: "1px solid #d1d1d1",
      borderRadius: "4px",
      boxShadow: state.isFocused ? null : null,
    }),
    valueContainer: (provided: any, state: any) => ({
      ...provided,
      padding: '0 6px'
    }),
    input: (provided: any, state: any) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorsContainer: (provided: any, state: any) => ({
      ...provided,
      height: '4.5vh',
    }),
  };

  useEffect(() => {
    if (!!ref) {
      setWidth(ref.current.clientWidth);
      setHeight(ref.current.clientHeight);
    }
  }, [ref]);

  return (
    <>
      {
        !!props.isLoading ? (
          <div style={{...props.styles, flexGrow: 1}}>
            <InputLoading height={height} />
          </div>
        ):(
          <div ref={ref} style={{...props.styles, flexGrow: 1}}>
            <Field 
              name={props.name}
              styles={customStyles} 
              isClearable={props.clearable}
              component={CreatableAdapter} 
              options={props.optionList} 
              placeholder={props.placeholder ? props.placeholder: ""} 
              maxLength={props.size} 
              onChange={props.onChange}
              components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }} />
          </div>
        )
      }
    </>
  );
}

export interface ListInputProps {
  name: string;
  size?: number;
  styles?: any;
  disabled?: boolean;
  placeholder?: string;
  optionList?: any[];
  select?: boolean;
  autocomplete?: "on" | "off";
  clearable?: boolean;
  isLoading?: boolean;
  onChange?: (selectedItem: any) => void;
}
