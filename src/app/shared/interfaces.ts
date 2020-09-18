export interface PeriodicElement {
  name: string;
  id: number;
  date: Date;
}

export interface Filter {
  id?: number;
  date?: FilterDate;
  name?: string;
}

export interface FilterDate {
  start: Date;
  end: Date;
}
