

export const options: any = [
  { 
    value: 'chocolate', 
    stock: 6,
    prestado: 0,
    isDisabled: false,
    get label() {
      return `${this.value} (${this.stock-this.prestado})`;
    },
    get labelPrestado() {
      return `${this.value} (${this.prestado})`;
    },
  },
  {  
    value: 'strawberry', 
    stock: 10,
    prestado: 0,
    isDisabled: false,
    get label() {
      return `${this.value} (${this.stock-this.prestado})`;
    },
    get labelPrestado() {
      return `${this.value} (${this.prestado})`;
    },
  },
  {  
    value: 'vanilla',
    stock: 2,
    prestado: 0,
    isDisabled: false,
    get label() {
      return `${this.value} (${this.stock-this.prestado})`;
    },
    get labelPrestado() {
      return `${this.value} (${this.prestado})`;
    },
  },
];
