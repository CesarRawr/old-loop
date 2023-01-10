export interface Dispositivo {
  readonly _id: string; 
  readonly nombre: string; 
  readonly stock: number;
  prestado: number;
  localPrestado: number;
}

export interface Usuario {
  readonly _id: string;
  readonly nickname: string;
  readonly pass: string; 
  readonly rol: "common" | "admin";
}

export interface Horario {
  aula: string;
  horaInicio: number;
  horaFin: number;
  dia: "lunes" | "martes" | "miercoles" | "jueves" | "viernes" | "sabado" | "domingo";
}

///////////////////////////////////////////////////////
// ¿Será correcta la relación entre las asignaciones y los maestros?
///////////////////////////////////////////////////////
export interface Maestro {
  readonly _id: string;
  readonly nombre: string;
}

export interface Asignacion {
  nrc?: string;
  maestro?: Maestro;
  horarios: Horario[];
}

export interface Materia {
  readonly _id: string;
  readonly nombre: string;
  readonly asignaciones: Asignacion[];
}
///////////////////////////////////////////////////////

export interface Alumno {
  _id?: string;
  matricula: string;
  nombre: string;
}

export interface Prestamo {
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
    nombre: string;
    cantidadPrestada: number;
  }[];
  usuario: {
    _id: string;
    nickname: string;
  };
  timelog: {
    inicio: Date;
    fin?: Date;
  };
  alumno?: Alumno;
}
