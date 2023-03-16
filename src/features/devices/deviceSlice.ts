import { createAsyncThunk, createSlice, PayloadAction, current } from '@reduxjs/toolkit';
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
  dispatch(setSelectedDevices([]));

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

// Function to get all devices
export const setControl = createAsyncThunk('devices/setControl', async (aula: string, {dispatch, getState}) => {
  const unk: any = getState();
  const state: any = unk.devices;
  
  const buscarDispositivo = (salon: string, controlesSeleccionados: any) => {
    // Buscar dispositivo por el nombre del salón
    const isDeviceSelected = controlesSeleccionados.filter((control: any) => {
      const salonDelControl = control.nombre.split(" ")[1];
      return salonDelControl === salon;
    });

    return !!isDeviceSelected.length;
  }

  // saber si el salón seleccionado tiene un control
  const isThereAControl: any = state.devices.filter((device: any) => {
    const deviceName = device.nombre.split(" ")[1];
    return deviceName === aula;
  });

  if (!isThereAControl.length) return;

  // Obtener los controles seleccionados en el device selector
  const controlesSeleccionados = state.selectedDevices.filter((device: any) => {
    const deviceType = device.nombre.split(" ")[0];
    return deviceType.includes("control");
  });

  if (!!controlesSeleccionados.length) {
    // Interrumpir el seteo del control si es que ya existe en la lista de dispositivos
    const isDeviceSelected: boolean = buscarDispositivo(aula, controlesSeleccionados);
    if (isDeviceSelected) {
      return;
    }
  }

  dispatch(updateDeviceAmount(isThereAControl[0]));
  dispatch(updateSelected(isThereAControl[0]));
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
      const dispositivos: any = state.devices.map((item: any) => ({...item}));

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
