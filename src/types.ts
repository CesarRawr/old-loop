import React from 'react';
import {Prestamo} from './datatest/models';

////////////////////////////////////
// @Interfaces
////////////////////////////////////
export interface SelectorProps {
  initialValue?: Prestamo;
  isLoading?: boolean;
  disabled?: boolean;
  setValue: any;
}

/*
  Some word extensive types
*/

////////////////////////////////////
// @Alias
////////////////////////////////////
export type MouseElementEvent = React.MouseEvent<HTMLElement>;

////////////////////////////////////
// @FunctionAlias
////////////////////////////////////
export type MouseElementFunction = (e: MouseElementEvent) => void;
