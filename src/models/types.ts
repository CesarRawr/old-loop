import type {MultiValue, ActionMeta} from 'react-select';
import type {
  Maestro, 
  Materia, 
  Tag, 
  Asignacion, 
  NrcMeta
} from '@models/interfaces';

////////////////////////////////////
// @Alias
////////////////////////////////////
export type MouseElementEvent = React.MouseEvent<HTMLElement>;

// @Courses alias
export type TeacherTag = Tag & Maestro;
export type CourseTag = Tag & Materia;
export type NrcTag = Tag & Asignacion & NrcMeta;
export type StatusType = 'loading' | 'idle' | 'failed';

// @Utils alias
export type Semana = "lunes" | "martes" | "miercoles" | "jueves" | "viernes" | "sabado" | "domingo";
export type LoanInputName = "nrcs" | "maestros" | "materias" | "aulas" | "horaInicio" | "horaFin" | "observaciones";


////////////////////////////////////
// @FunctionAlias
////////////////////////////////////
export type MouseElementFunction = (e: MouseElementEvent) => void;
export type onChangeFunction = (selected: MultiValue<any>, action: ActionMeta<any>) => void;
