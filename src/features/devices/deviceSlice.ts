import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { urlBase } from '../../variables';
import axios from 'axios';

import type { Item } from './device-selector/deviceSelectorController';
import type { MetaDispositivo, Dispositivo } from '../../datatest/models';

///////////////////////////
// State
///////////////////////////
const initialState: DevicesState = {
  selectedDevices: [],
  devices: [],
  status: 'idle',
}

///////////////////////////
// Async functions
///////////////////////////

// Function to get all devices
export const fetchDevices = createAsyncThunk('devices/fetchDevices', async (arg, {dispatch}) => {
  // Limpiar selected devices para evitar bugs en la lista de dispositivos 
  // al momento de refrescarla
  try {
    dispatch(setSelectedDevices([]));
  } catch (e) {
    console.log(e);
  }

  const token = localStorage.getItem('token');
  const config = {
      headers: { Authorization: `Bearer ${token}` }
  };

  const response: any = await axios.get<any>(`${urlBase}/v1/devices`, config);
  const devices: Item[] = response.data.data.map((device: Dispositivo) => {
    return {
      _id: device._id,
      nombre: device.nombre,
      stock: device.stock,
      prestado: device.prestado,
      value: device.nombre,
      isDisabled: !(device.stock-device.prestado) ? true: false,
      localPrestado: 0,
      get label() {
        return `${this.value} (${this.stock-this.prestado-this.localPrestado})`;
      },
      get labelPrestado() {
        return `${this.value} (${this.localPrestado})`;
      },
    }
  });
  
  return devices;
});

///////////////////////////
// Slice
///////////////////////////
export const deviceSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {
    updateSelected: (state, action: PayloadAction<Item>) => {
      const [lastItem] = state.devices.filter((device: Item) => device._id === action.payload._id);
      const selectedDevices = state.selectedDevices.map((device: Item) => ({...device}));
      // Verificar si existe el ultimo item en el array value
      const [result] = selectedDevices.filter((device: Item) => device._id === lastItem._id);

      // Si existe el tag, modifica la cantidad, si no, agrega el nuevo item
      const tags = !!result ? (
        state.selectedDevices.map((device: Item) => {
          return (device.value !== lastItem.value) ? {...device}: {
            ...device,
            localPrestado: device.localPrestado+1,
            value: device.value,
            label: lastItem.labelPrestado,
          };
        })
      ):([...selectedDevices, {
        ...lastItem,
        value: lastItem.value,
        label: lastItem.value,
      }]);

      const newTags: any = tags.map((device: Item) => ({...device}));
      return {
        ...state,
        selectedDevices: newTags,
      };
    },
    updateDeviceAmount: (state, action: PayloadAction<Item>) => {
      const devices = state.devices.map((device) => {
        const { _id, value, stock, prestado, localPrestado, isDisabled } = device;
        const newLocalPrestado = _id === action.payload._id ? localPrestado + 1 : localPrestado;
        const newIsDisabled = (stock - prestado - newLocalPrestado === 0) ? true : isDisabled;
      
        return {
          ...device,
          localPrestado: newLocalPrestado,
          isDisabled: newIsDisabled,
          label: `${value} (${stock - prestado - newLocalPrestado})`,
          labelPrestado: `${value} (${newLocalPrestado})`,
        };
      });

      return {
        ...state,
        devices
      };
    },
    removeSelected: (state, action: PayloadAction<Item[]>) => {
      const values = state.selectedDevices.map((device: Item) => ({...device}));
      const selected = action.payload.map((device: Item) => ({...device}));

      // Encontrar item eliminado
      const [itemDeleted]: Item[] = values.filter((value: Item) => !selected.some((item: Item) => value.value === item.value));
      
      console.warn('item eliminado');
      console.log(itemDeleted);

      console.log('Dispositivos antes de actualizar el dispositivo a eliminar');
      const dispositivos: any = state.devices.map((item: any) => ({...item}));
      console.log(dispositivos);

      // Actualizar la opción eliminada
      const devicesUpdated = state.devices.map((option: Item) => {
        if (option.value === itemDeleted.value) {
          return {
            ...option,
            localPrestado: 0,
            isDisabled: false,
            label: `${option.value} (${option.stock-option.prestado})`,
            labelPrestado: `${option.value} (0)`,
          };
        }
        return option;
      });

      console.log('Dispositivos actuaizados despues de eliminar');
      console.log(devicesUpdated);
      console.log(selected);

      return {
        ...state,
        devices: devicesUpdated,
        selectedDevices: selected,
      }
    },
    clearDevices: (state) => {
      return {...state, selectedDevices: []};
    },
    setSelectedDevices: (state, action: PayloadAction<Item[]>) => {
      return {...state, selectedDevices: action.payload};
    },
    setDevices: (state, action: PayloadAction<Item[]>) => {
      return {...state, devices: action.payload};
    },
    setDeviceAmount: (state, {payload}: PayloadAction<Item>) => {
      const devices: Item[] = [...state.devices];
      const updatedDevices: Item[] = devices.map((device: Item) => 
        device._id === payload._id
        ? (({prestado, value, stock}) => {
          const newPrestado = prestado - payload.localPrestado;
          return {
            ...device,
            prestado: newPrestado,
            label: `${value} (${stock - prestado - payload.localPrestado})`,
            labelPrestado: `${value} (${payload.localPrestado})`,
          }
        })(device): device
      );

      return {
        ...state,
        devices: updatedDevices
      };
    },
    watchSelectedDevices: (state) => {
      const watch = state.selectedDevices.map((item: any) => ({...item}));
      console.log(watch);
    },
    watchDevices: (state) => {
      const watch = state.devices.map((item: any) => ({...item}));
      console.log(watch);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDevices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDevices.fulfilled, (state, action) => {
        state.status = 'idle';
        state.devices = action.payload;
      })
      .addCase(fetchDevices.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default deviceSlice.reducer;
export const {
  updateDeviceAmount, 
  setSelectedDevices, 
  setDevices,
  updateSelected,
  removeSelected,
  clearDevices,
  setDeviceAmount,
  watchDevices,
  watchSelectedDevices
} = deviceSlice.actions;

///////////////////////////
// Selector
///////////////////////////
export const selectSelectedDevices = (state: RootState) => state.devices.selectedDevices;
export const selectDevices = (state: RootState) => state.devices.devices;
export const selectStatus = (state: RootState) => state.devices.status;

///////////////////////////
// Interfaces
///////////////////////////
interface DevicesState {
  selectedDevices: Item[];
  devices: Item[];
  status: 'idle' | 'loading' | 'failed';
}
