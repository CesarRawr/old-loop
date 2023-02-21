import React, {useEffect} from 'react';
import {MultiSelector} from '../../@ui';
import {MultiValue, ActionMeta} from 'react-select';
import type {Item} from './deviceSelectorController';
import {useAppSelector, useAppDispatch} from '../../../app/hooks';

import {
  fetchDevices, 
  selectDevices,
  updateSelected,
  updateDeviceAmount,
  selectSelectedDevices, 
  removeSelected
} from '../deviceSlice';
import { selectSelectedLoanIndex } from '../../loan/active-loans-list/activeLoansListSlice';

export default function DeviceSelector({isLoading}: {isLoading?: any}) {
  const dispatch = useAppDispatch();
  const values = useAppSelector(selectSelectedDevices);
  const devices = useAppSelector(selectDevices);

  const selectedLoanIndex = useAppSelector(selectSelectedLoanIndex);
  useEffect(() => {
    if (!isLoading) {
      dispatch(fetchDevices());
    }
  }, [dispatch, isLoading, selectedLoanIndex]);

  const selectOption = (itemSelected: Item) => {
    dispatch(updateDeviceAmount(itemSelected));
    dispatch(updateSelected(itemSelected));
  }

  const removeValue = (itemSelected: MultiValue<Item>) => {
    dispatch(removeSelected(itemSelected as Item[]));
  }

  const onChange = (itemsSelected: MultiValue<Item>, {action}: ActionMeta<any>) => {
    const actions: any = {
      'select-option': () => selectOption(itemsSelected[itemsSelected.length-1]),
      'remove-value': () => removeValue(itemsSelected),
    }

    actions[action]();
  }

  return (
    <MultiSelector 
      options={devices}
      name="dispositivos" 
      placeholder="Dispositivos"
      onChange={onChange} 
      values={values}
      isLoading={isLoading} />
  );
}
