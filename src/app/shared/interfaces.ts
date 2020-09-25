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
  lastId?: string;
  name: string;
  lastName?: string;
  date: Date;
  lastDate?: Date;
  deleteBool?: boolean;
}
