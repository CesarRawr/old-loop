import { useRef, useEffect, useState, useMemo } from "react";
import { Field } from "react-final-form";
import customStyles from "./ListInputStyles";
import { CreatableAdapter } from "./ListInputComponents";

import { InputLoading } from "@ui/index";
import type { ListInputProps } from "@models/interfaces";

export default function ListInput(props: ListInputProps) {
  const [height, setHeight] = useState<number>(0);
  const ref = useRef<any>(null);

  const { initialValue } = props;
  const defaultValue: any = useMemo(() => {
    return !initialValue
      ? undefined
      : {
          label: initialValue.label,
          value: initialValue.value,
        };
  }, [initialValue]);

  useEffect(() => {
    if (!ref) return;
    setHeight(ref.current.clientHeight);
  }, [ref]);

  const isValidNewOptionDefault = (
    inputValue: string,
    selectValue: any,
    selectOptions: any
  ) => {
    return (
      inputValue.trim().length > 0 &&
      selectOptions.findIndex((option: any) => option.label === inputValue) === -1
    );
  };

  return (
    <>
      {!!props.isLoading ? (
        <div style={{ ...props.styles, flexGrow: 1 }}>
          <InputLoading height={`${height}px`} />
        </div>
      ) : (
        <div ref={ref} style={{ ...props.styles, flexGrow: 1 }}>
          <Field
            defaultValue={!!defaultValue ? defaultValue : ""}
            name={props.name}
            styles={customStyles}
            isClearable={props.disableClearable ? false : true}
            component={CreatableAdapter}
            options={props.optionList}
            placeholder={props.placeholder ? props.placeholder : ""}
            maxLength={props.size}
            onChange={props.onChange}
            isDisabled={props.disabled}
            isValidNewOption={!!props.disableCreate ? () => false : isValidNewOptionDefault}
            components={{
              DropdownIndicator: () => null,
              IndicatorSeparator: () => null,
            }}
          />
        </div>
      )}
    </>
  );
}
