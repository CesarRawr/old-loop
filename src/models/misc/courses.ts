import {Prestamo} from './loan';
import {CourseTag, NrcTag, TeacherTag} from '@models/types';

export interface SelectorProps {
  initialValue?: Prestamo;
  isLoading?: boolean;
  disabled?: boolean;
  setValue: any;
}

export interface Tag {
  label: string;
  value: string;
}

export interface NrcMeta {
  materia: {
    readonly _id: string;
    readonly nombre: string;
  };
}

export interface CourseState {
  classrooms: Tag[];
  courses: CourseTag[];
  nrcs: NrcTag[];
  teachers: TeacherTag[];
};
