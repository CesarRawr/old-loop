import React, {useState, useEffect, useRef} from 'react';
import Select, {MultiValue, ActionMeta} from 'react-select';
import InputLoading from '../inputLoading/InputLoading';

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    background: '#fafafa',
    borderColor: '#d1d1d1',
    minHeight: '4.5vh',
    border: "1px solid #d1d1d1",
    borderRadius: "4px",
    boxShadow: state.isFocused ? null : null,
    fontSize: "16px"
  }),
  valueContainer: (provided: any, state: any) => ({
    ...provided,
    minHeight: '30px',
    padding: '0 6px'
  }),
  input: (provided: any, state: any) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: (state: any) => ({
    display: 'none',
  }),
  indicatorsContainer: (provided: any, state: any) => ({
    ...provided,
    display: 'none',
  }),
};

export default function MultiSelector(props: MultiSelectorProps) {
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
          <InputLoading height={`${height}px`} />
        ):(
          <div ref={ref}>
            <Select 
              styles={customStyles}
              options={props.options} 
              name={props.name} 
              placeholder={props.placeholder}
              onChange={props.onChange}
              value={props.values}
              hideSelectedOptions={false}
              isOptionSelected={() => false}
              theme={(theme: any) => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary25: '#f1f1f1',
                  primary50: '#f1f1f1',
                },
              })} 
              isMulti />
          </div>
        )
      }
    </>
  );
}

type onChangeFunction = (selected: MultiValue<any>, action: ActionMeta<any>) => void;

export interface MultiSelectorProps {
  isLoading?: boolean;
  options: any[];
  name: string;
  placeholder: string;
  onChange: onChangeFunction;
  values: any[];
}
