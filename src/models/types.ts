import type { MultiValue, ActionMeta } from "react-select";
import { FieldRenderProps } from "react-final-form";
import type {
  Maestro,
  Materia,
  Tag,
  Asignacion,
  NrcMeta,
} from "@models/interfaces";

////////////////////////////////////
// @Alias
////////////////////////////////////
export type MouseElementEvent = React.MouseEvent<HTMLElement>;

// @Courses alias
export type TeacherTag = Tag & Maestro;
export type CourseTag = Tag & Materia;
export type NrcTag = Tag & Asignacion & NrcMeta;
export type StatusType = "loading" | "idle" | "failed";

// @Utils alias
export type Semana =
  | "lunes"
  | "martes"
  | "miércoles"
  | "jueves"
  | "viernes"
  | "sábado"
  | "domingo";
export type LoanInputName =
  | "nrcs"
  | "maestros"
  | "materias"
  | "aulas"
  | "horaInicio"
  | "horaFin"
  | "observaciones";

// @ui alias
export type DatePickerAdapterProps = FieldRenderProps<Date, HTMLElement> & {
  onChangeCustom?: (value: Date) => void;
};

////////////////////////////////////
// @FunctionAlias
////////////////////////////////////
export type MouseElementFunction = (e: MouseElementEvent) => void;
export type onChangeFunction = (
  selected: MultiValue<any>,
  action: ActionMeta<any>
) => void;
