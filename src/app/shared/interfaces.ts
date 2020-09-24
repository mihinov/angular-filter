export interface Filter {
  id?: string;
  date?: FilterDate;
  name?: string;
}

export interface FilterDate {
  start: Date;
  end: Date;
}

export interface Record {
  id?: string;
  name: string;
  date: Date;
}
