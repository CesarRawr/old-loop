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
export interface MetaDispositivo {
  _id: string;
  nombre: string;
  localPrestado: number;
}

export interface Dispositivo extends MetaDispositivo {
  stock: number;
  prestado: number;
}

export interface Prestamo {
  _id?: string;
  observaciones?: string;
  status: "entrante" | "activo" | "deuda" | "inactivo";
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
  dispositivos: MetaDispositivo[];
  usuario: {
    _id: string;
    nickname: string;
  };
  timelog: {
    inicioOriginal: string;
    inicio: string;
    fin?: string;
  };
}
