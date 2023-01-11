import {
  Dispositivo,
  Usuario,
  Materia,
  Maestro,
  Alumno,
  Prestamo
} from "./models";

export const dispositivos: Dispositivo[] = [
  {
    _id: "F102",
    nombre: "control F102",
    stock: 1,
    prestado: 0,
  },
  {
    _id: "F103",
    nombre: "control F103",
    stock: 1,
    prestado: 0,
  },
  {
    _id: "F104",
    nombre: "control F104",
    stock: 1,
    prestado: 0,
  },
  {
    _id: "6367f74c77d7840b6ca36737",
    nombre: "adapt. HDMI",
    stock: 5,
    prestado: 0,
  },
  {
    _id: "6367f79413a5dd9fb9fffe4a",
    nombre: "adapt. Mac",
    stock: 3,
    prestado: 0,
  },
  {
    _id: "6367f7fe1b666864aaf18f00",
    nombre: "cable RGB",
    stock: 3,
    prestado: 0,
  },
];

export const usuarios: Usuario[] = [
  {
    _id: "6367f896530cdf5942a970c1",
    nickname: "cesarwr",
    pass: "1234",
    rol: "admin",
  },
  {
    _id: "6367f8f821e048212b9b2ca5",
    nickname: "pato",
    pass: "1234",
    rol: "common",
  },
];

export const maestros: Maestro[] = [
  {
    _id: "6367fabc90852f9a99769243",
    nombre: "ANABELL YENELLY RAMÍREZ JIMÉNEZ",
  },
  {
    _id: "63680b250db472af2566baf5",
    nombre: "RAÚL DE LA FUENTE IZAGUIRRE",
  },
  {
    _id: "63680b7402b21981d56bd614",
    nombre: "NIELS MARTÍNEZ GUEVARA",
  },
  {
    _id: "636826f3a8705e2416aed312",
    nombre: "MA. YESENIA ZAVALETA SÁNCHEZ",
  }
];

export const aulas: string[] = [
  "F101",
  "F102",
  "F103",
  "F104",
  "F105",
  "F106",
  "CC2",
];

export const materias: Materia[] = [
  {
    _id: "6367f95e8f793d1e92a92f4a",
    nombre: "LITERACIDAD DIGITAL",
    asignaciones: [
      {
        nrc: "85511",
        maestro: {
          _id: "6367fabc90852f9a99769243",
          nombre: "ANABELL YENELLY RAMÍREZ JIMÉNEZ",
        },
        horarios: [
          {
            aula: "F102",
            horaInicio: 9,
            horaFin: 11,
            dia: "lunes",
          }, 
          {
            aula: "F103",
            horaInicio: 7,
            horaFin: 9,
            dia: "martes",
          }
        ],
      }, 
      {
        nrc: "85540",
        maestro: {
          _id: "6367fabc90852f9a99769243",
          nombre: "ANABELL YENELLY RAMÍREZ JIMÉNEZ",
        },
        horarios: [
          {
            aula: "F102",
            horaInicio: 13,
            horaFin: 15,
            dia: "lunes",
          },
          {
            aula: "F105",
            horaInicio: 13,
            horaFin: 15,
            dia: "jueves",
          },
          {
            aula: "F106",
            horaInicio: 13,
            horaFin: 15,
            dia: "viernes",
          }
        ],
      },
      {
        nrc: "85559",
        maestro: {
          _id: "63680b250db472af2566baf5",
          nombre: "RAÚL DE LA FUENTE IZAGUIRRE",
        },
        horarios: [
          {
            aula: "F102",
            horaInicio: 9,
            horaFin: 11,
            dia: "martes",
          },
          {
            aula: "F104",
            horaInicio: 9,
            horaFin: 11,
            dia: "miercoles",
          }
        ],
      },
      {
        nrc: "85560",
        maestro: {
          _id: "63680b250db472af2566baf5",
          nombre: "RAÚL DE LA FUENTE IZAGUIRRE",
        },
        horarios: [
          {
            aula: "F102",
            horaInicio: 11,
            horaFin: 13,
            dia: "martes",
          },
          {
            aula: "F104",
            horaInicio: 11,
            horaFin: 13,
            dia: "miercoles",
          }
        ],
      }
    ],
  }, 
  {
    _id: "636825bdf19dfc499675e6b4",
    nombre: "PROGRAMACIÓN ESTADÍSTICA",
    asignaciones: [
      {
        nrc: "87228",
        maestro: undefined,
        horarios: [
          {
            aula: "CC2",
            horaInicio: 11,
            horaFin: 13,
            dia: "viernes",
          },          
        ],
      },
      {
        nrc: "87250",
        maestro:   {
          _id: "636826f3a8705e2416aed312",
          nombre: "MA. YESENIA ZAVALETA SÁNCHEZ",
        },
        horarios: [
          {
            aula: "CC2",
            horaInicio: 11,
            horaFin: 13,
            dia: "lunes",
          }
        ]
      },
      {
        nrc: "85556",
        maestro: {
          _id: "63680b250db472af2566baf5",
          nombre: "RAÚL DE LA FUENTE IZAGUIRRE",
        },
        horarios: [
          {
            aula: "F102",
            horaInicio: 19,
            horaFin: 21,
            dia: "martes",
          },
          {
            aula: "F104",
            horaInicio: 19,
            horaFin: 21,
            dia: "miercoles",
          }
        ],
      },
      {
        nrc: "85557",
        maestro: {
          _id: "63680b250db472af2566baf5",
          nombre: "RAÚL DE LA FUENTE IZAGUIRRE",
        },
        horarios: [
          {
            aula: "F102",
            horaInicio: 17,
            horaFin: 19,
            dia: "martes",
          },
          {
            aula: "F104",
            horaInicio: 17,
            horaFin: 19,
            dia: "miercoles",
          }
        ],
      }
    ],
  }
];

// Solo si se consiguen los nombres de todos los alumnos
export const alumnos: Alumno[] = [
  {
    _id: "636828dd3819cc2a5c229770",
    matricula: "S18014489",
    nombre: "CESAR ALEJANDRO VALLEJO GALVAN",
  },
  {
    _id: "63682903943f5f91bc48bd36",
    matricula: "S18014590",
    nombre: "RICARDO MARTINEZ OLIVO",
  },
  {
    _id: "6368292cfb909fca35389218",
    matricula: "S18014591",
    nombre: "FERNANDO ALEJANDRO LOPEZ PEREZ",
  },
];

export const prestamos: Prestamo[] = [];
