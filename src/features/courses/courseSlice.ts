import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import {Alumno, Maestro, Materia, Asignacion} from '../../datatest/models';
import {aulas, maestros, alumnos, materias} from '../../datatest/data'
import {getDayName} from '../utils';

/*
  Nota: Agregar sockets para refrescar las listas en caso de cambios en el backend
*/

///////////////////////////
// State
///////////////////////////
const initialState: CourseState = {
  classrooms: [],
  courses: [],
  nrcs: [],
  students: [],
  teachers: [],
};

///////////////////////////
// Async functions
///////////////////////////

// Function to get all classrooms
export const fetchClassrooms = createAsyncThunk('courses/fetchClassrooms', async () => {
  return aulas.map((aula: string) => ({
    label: aula,
    value: aula,
  }));
});

// Function to get all courses
export const fetchCourses = createAsyncThunk('courses/fetchCourseNames', async (arg, { getState }) => {
  const state: any = getState();
  const nrcs: NrcTag[] = state.courses.nrcs;

  // Obtener la lista total de materias en el sistema
  const courses: CourseTag[] = materias.map((materia: Materia) => {
    return {
      ...materia,
      label: materia.nombre,
      value: materia._id,
    }
  });

  // Obtener materias que coinciden con los nrcs de las materias que tienen clase hoy pero con duplicados
  const coursesWithDup: CourseTag[] = nrcs.map((nrc: NrcTag) => {
    const data = courses.filter((materia: Materia) => nrc.materia !== undefined && materia._id === nrc.materia._id);
    return data;
  }).flat();

  // Eliminando duplicados en los maestros con materias
  const todayCourses: CourseTag[] = coursesWithDup.filter((value, index, self) =>
    index === self.findIndex((t: CourseTag) => (
      t._id === value._id && t.nombre === value.nombre
    ))
  );
 
  // Eliminar a los maestros que tienen clase hoy
  const notTodayCourses: (CourseTag | undefined)[] = courses.filter((course: CourseTag) => {
    let isCourse = false;
    for (let todayCourse of todayCourses) {
      if (todayCourse._id === course._id) {
        isCourse = true;
      }
    }
    
    return !isCourse;
  });

  // Poner los los cursos de hoy hasta el principio de la lista
  let orderedCourses: any = [...todayCourses, ...notTodayCourses];

  return orderedCourses;
});

// Function to get all nrc
export const fetchNrcs = createAsyncThunk('courses/fetchNrcs', async () => {
  const nrcs: any[] = materias.map((materia: Materia) => {
    return materia.asignaciones.map((asignacion: Asignacion) => {
      return {
        ...asignacion,
        materia: {
          _id: materia._id,
          nombre: materia.nombre,
        },
        label: asignacion.nrc,
        value: asignacion.nrc,
      }
    });
  });

  const data: NrcTag[] = [].concat(...nrcs);
  // Filtrando los nrcs que dan clase el dia de hoy
  const dailyData: any = data.map((nrc) => {
    const dayName = getDayName();
    for (let horario of nrc.horarios) {
      if (horario.dia === dayName) {
        return nrc;
      }
    }

    return;
  }).filter((nrc) => nrc !== undefined);

  return dailyData;
});

// Function to get all students
export const fetchStudents = createAsyncThunk('courses/fetchStudents', async () => {
  return alumnos.map((alumno: Alumno) => {
    return {
      ...alumno,
      label: alumno.nombre,
      value: alumno.matricula,
    }
  });
});

// Function to get all teachers
export const fetchTeachers = createAsyncThunk('courses/fetchTeachers', async (arg, { getState }) => {
  const state: any = getState();
  const nrcs: NrcTag[] = state.courses.nrcs;

  // Obtener la lista total de maestros en el sistema
  const teachers: TeacherTag[] = maestros.map((maestro: Maestro) => {
    return {
      ...maestro,
      label: maestro.nombre,
      value: maestro._id,
    }
  });

  // Obtener maestros que coinciden con los nrcs de las materias que tienen clase hoy pero con duplicados
  const teachersWithCoursesDup: TeacherTag[] = nrcs.map((nrc: NrcTag) => {
    const data = teachers.filter((teacher: Maestro) => nrc.maestro !== undefined && teacher._id === nrc.maestro._id);
    return data;
  }).flat();

  // Eliminando duplicados en los maestros con materias
  const teachersWithCourses: TeacherTag[] = teachersWithCoursesDup.filter((value, index, self) =>
    index === self.findIndex((t: TeacherTag) => (
      t._id === value._id && t.nombre === value.nombre
    ))
  );

  // Eliminar a los maestros que tienen clase hoy
  const teachersWithOutCourses: (TeacherTag | undefined)[] = teachers.map((teacher: TeacherTag) => {
    let isTeacherWithCourses = false;
    for (let teacherWithCourses of teachersWithCourses) {
      if (teacherWithCourses._id === teacher._id) {
        isTeacherWithCourses = true;
      }
    }
    
    return !isTeacherWithCourses ? teacher: undefined;
  }).filter((teacher: TeacherTag | undefined) => teacher !== undefined);

  // Poner los profesores con cursos hasta el principio de la lista
  let orderedTeachers: any = [...teachersWithCourses, ...teachersWithOutCourses];

  return orderedTeachers;
});

///////////////////////////
// Slice
///////////////////////////
export const courseSlice = createSlice({
  name: 'devices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchClassrooms.fulfilled, (state, action) => {
        state.classrooms = action.payload;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
      })
      .addCase(fetchNrcs.fulfilled, (state, action) => {
        state.nrcs = action.payload;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload;
      })
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.teachers = action.payload;
      });
  },
});

export default courseSlice.reducer;

///////////////////////////
// Selector
///////////////////////////
export const selectClassrooms = (state: RootState) => state.courses.classrooms;
export const selectCourses = (state: RootState) => state.courses.courses;
export const selectNrcs = (state: RootState) => state.courses.nrcs;
export const selectStudents = (state: RootState) => state.courses.students;
export const selectTeachers = (state: RootState) => state.courses.teachers;

///////////////////////////
// Interfaces
///////////////////////////
interface Tag {
  label: string;
  value: string;
}

interface NrcMeta {
  materia: {
    readonly _id: string;
    readonly nombre: string;
  };
}

type StudentTag = Tag & Alumno;
type TeacherTag = Tag & Maestro;
type CourseTag = Tag & Materia;
export type NrcTag = Tag & Asignacion & NrcMeta;

export interface CourseState {
  classrooms: Tag[];
  courses: CourseTag[];
  nrcs: NrcTag[];
  students: StudentTag[];
  teachers: TeacherTag[];
};
