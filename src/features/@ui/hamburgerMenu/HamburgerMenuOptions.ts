/*
  These are options to load on Hamburguer menu, it depends if user is admin or not
*/

export const adminOptions: Option[] = [
  {name: '', link: ''},
];

export const userOptions: Option[] = [
  {name: 'Mis prestamos', link: '#'},
  {name: 'Apartar', link: '#'},
  {name: 'Salones ocupados', link: '#'},
];

interface Option {
  name: string;
  link: string;
}
