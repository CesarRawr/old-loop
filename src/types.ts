import React from 'react';

////////////////////////////////////
// @Interfaces
////////////////////////////////////
export interface SelectorProps {
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
