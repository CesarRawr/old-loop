import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { dispositivos } from '../../datatest/data';

import type { Item } from './device-selector/deviceSelectorController';
import type { Dispositivo } from '../../datatest/models';

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
export const fetchDevices = createAsyncThunk('devices/fetchDevices', async () => {
  const devices: Item[] = dispositivos.map((device: Dispositivo) => {
    return {
      _id: device._id,
      nombre: device.nombre,
      stock: device.stock,
      prestado: device.prestado,
      value: device.nombre,
      isDisabled: false,
      get label() {
        return `${this.value} (${this.stock-this.prestado})`;
      },
      get labelPrestado() {
        return `${this.value} (${this.prestado})`;
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
      const [result] = selectedDevices.filter((device: Item) => device._id === lastItem._id);

      const tags = !!result ? (
        state.selectedDevices.map((device: Item) => {
          return (device.value !== lastItem.value) ? {...device}: {
            ...device,
            // Falta actualizar el atributo prestado
            value: device.value,
            label: lastItem.labelPrestado,
          };
        })
      ):([...selectedDevices, {
        ...lastItem,
        value: lastItem.value,
        label: lastItem.value,
      }]);

      state.selectedDevices = tags.map((device: Item) => ({...device}));
    },
    updateDeviceAmount: (state, action: PayloadAction<Item>) => {
      const devices = state.devices.map((device) => {
        if (device._id === action.payload._id) {
          device.prestado++;
          if ((device.stock-device.prestado) === 0) device.isDisabled = true;
        }

        return {
          ...device,
          label: `${device.value} (${device.stock-device.prestado})`,
          labelPrestado: `${device.value} (${device.prestado})`,
        };
      });

      state.devices = devices;
    },
    removeSelected: (state, action: PayloadAction<Item[]>) => {
      const values = state.selectedDevices.map((device: Item) => ({...device}));
      const selected = action.payload.map((device: Item) => ({...device}));

      // Encontrar item eliminado
      const [itemDeleted]: Item[] = values.filter((value: Item) => !selected.some((item: Item) => value.value === item.value));
      
      // Actualizar la opción eliminada
      const devicesUpdated = state.devices.map((option: Item) => {
        return option.value !== itemDeleted.value ? ({...option}): (
          option.prestado = 0,
          option.isDisabled = false,
          option.label = `${option.value} (${option.stock-option.prestado})`,
          option.labelPrestado = `${option.value} (${option.prestado})`,
          {...option}
        );
      });

      state.devices = devicesUpdated;
      state.selectedDevices = selected;
    },
    setSelectedDevices: (state, action: PayloadAction<Item[]>) => {
      state.selectedDevices = action.payload;
    },
    setDevices: (state, action: PayloadAction<Item[]>) => {
      state.devices = action.payload;
    }
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
  removeSelected
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
