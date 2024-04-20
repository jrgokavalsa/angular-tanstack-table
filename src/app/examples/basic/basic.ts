import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ColumnDef,
  FlexRenderDirective,
  Table,
  createAngularTable,
  getCoreRowModel,
} from 'angular-tanstack-table';
import { ResizableDirective } from '../../shared/directives/resizeColumn';
import { Person } from '../utils/person';

const defaultColumns: ColumnDef<Person>[] = [
  {
    accessorKey: 'firstName',
    cell: (info) => info.getValue(),
    header: () => 'First Name',
    footer: (info) => info.column.id,
  },
  {
    accessorFn: (row) => row.lastName,
    id: 'lastName',
    cell: (info) => info.getValue(),
    header: () => 'Last Name',
    footer: (info) => info.column.id,
  },
  {
    accessorKey: 'age',
    header: () => 'Age',
    footer: (info) => info.column.id,
  },
  {
    accessorKey: 'visits',
    header: () => 'Visits',
    footer: (info) => info.column.id,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    footer: (info) => info.column.id,
  },
  {
    accessorKey: 'progress',
    header: 'Profile Progress',
    footer: (info) => info.column.id,
  },
];

const defaultData: Person[] = [
  {
    firstName: 'tanner',
    lastName: 'linsley',
    age: 24,
    visits: 100,
    status: 'relationship',
    progress: 50,
  },
  {
    firstName: 'tandy',
    lastName: 'miller',
    age: 40,
    visits: 40,
    status: 'single',
    progress: 80,
  },
  {
    firstName: 'joe',
    lastName: 'dirte',
    age: 45,
    visits: 20,
    status: 'complicated',
    progress: 10,
  },
];

@Component({
  selector: 'tanstack-basic',
  templateUrl: 'basic.html',
  standalone: true,
  imports: [NgIf, NgFor, FlexRenderDirective, ResizableDirective],
  styles: `
   th{&:not(:last-child) {
        .resize-holder {
          cursor: col-resize;
          width: 20px;
          height: 100%;
          position: absolute;
          right: -10px;
          top: 0;
          z-index: 1;
        }
      }}`,
})
export class BasicComponent implements OnInit {
  data: Person[] = [];
  table!: Table<Person>;
  ngOnInit() {
    this.data = [...defaultData];
    this.table = createAngularTable({
      data: this.data,
      columns: defaultColumns,
      getCoreRowModel: getCoreRowModel(),
    });
  }
}
