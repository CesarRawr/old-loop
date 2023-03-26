import { Dayjs } from "dayjs";
import type { CSSProperties } from "react";
import type { ActionMeta } from "react-select";
import type { MouseElementFunction, onChangeFunction } from "../types";

/**
 * @ui
 * Estas son interfaces que pertenecen a
 * el folder @ui
 * */
export interface ButtonProps {
  text: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  style?: any;
  onClick?: MouseElementFunction;
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

export interface LabelProps {
  text: string;
  size?: string;
  className?: string;
  styles?: CSSProperties;
  other?: any;
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
  isLoading?: boolean;
  initialValue?: any;
  disableClearable?: boolean;
  onChange?: (selectedItem: any, actionMeta: ActionMeta<any>) => void;
}

export interface FormListGroupProps {
  label?: LabelProps;
  listInput: ListInputProps;
  styles?: any;
}

export interface LabelTooltipProps {
  visibleWords: number;
  text?: string;
}

export interface LabelDatePickerProps {
  date: Date;
  disabled?: boolean;
  maxDate?: Date;
  minDate?: Date;
  excludeWeekends?: boolean;
  onChangeCustom?: (date: Date) => void;
}

export interface DropdownButtonProps {
  text: string;
  listItems: string[];
}

export interface InputLoadingProps {
  width?: string;
  height: string;
}

export interface InputMuiProps {
  name: string;
  styles?: any;
  disabled?: boolean;
  label: string;
  autocomplete?: "on" | "off";
  isLoading?: boolean;
  type?: string;
  margin?: "none" | "dense" | "normal";
}

export interface LoadingTableBodyProps {
  columnsNumber: number;
  rowsNumber: number;
}

export interface MultiSelectorProps {
  isLoading?: boolean;
  options: any[];
  name: string;
  placeholder: string;
  onChange: onChangeFunction;
  values: any[];
}

export interface TableMessageProps {
  msg: string;
}

export interface TimePickerModalProps {
  open: boolean;
  ampm: boolean;
  handleClose: () => void;
  minTime?: Dayjs;
  maxTime?: Dayjs;
  shouldDisableTime?: (value: Dayjs, unit: string) => boolean;
  onAccept: (value: Dayjs | null) => void;
}

export interface DateSelectorProps {
  disabled: boolean;
  setValue: any;
}
