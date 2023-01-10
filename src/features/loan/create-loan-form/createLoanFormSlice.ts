import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../../app/store';

///////////////////////////
// State
///////////////////////////
const initialState: LoanState = {
  observaciones: '',
  status: 'activo',
  maestro: {
    _id: '',
    nombre: '',
  },
  materia: {
    _id: '',
    nombre: '',
    nrc: '',
    horario: {
      aula: '',
      horaInicio: 0,
      horaFin: 0,
      dia: 'lunes',
    },
  },
  dispositivos: [],
  usuario: {
    _id: '',
    nickname: '',
  },
  timelog: {
    inicio: new Date(),
    fin: new Date(),
  },
  alumno: {
    _id: '',
    matricula: '',
    nombre: '',
  }
}

export {}

///////////////////////////
// Interfaces
///////////////////////////
export interface Alumno {
  _id?: string;
  matricula: string;
  nombre: string;
}

interface Horario {
  readonly aula: string;
  readonly horaInicio: number;
  readonly horaFin: number;
  readonly dia: "lunes" | "martes" | "miercoles" | "jueves" | "viernes";
}

export interface LoanState {
  _id?: string;
  observaciones?: string;
  status: "entrante" | "activo" | "deuda" | "terminado";
  maestro: {
    _id: string;
    nombre: string;
  };
  materia: {
    _id: string;
    nombre: string;
    nrc: string;
    horario: Horario;
  };
  dispositivos: {
    _id: string;
    nombre: string
    cantidadPrestada: number;
  }[];
  usuario: {
    _id: string;
    nickname: string;
  };
  timelog: {
    inicio: Date;
    fin: Date;
  };
  alumno?: Alumno;
}

