import { Component, OnInit, effect, signal } from '@angular/core';
import {
  SortingState,
  Table,
  getCoreRowModel,
  getSortedRowModel,
} from '@tanstack/table-core';
import {
  FlexRenderDirective,
  createAngularTable,
} from 'angular-tanstack-table';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { columns } from '../grouping/column';
import { mockData } from '../utils/mockdata';
import { Person } from '../utils/person';

@Component({
  selector: 'tanstack-sorting',
  templateUrl: 'sorting.html',
  standalone: true,
  imports: [FlexRenderDirective],
})
export class SortingComponent implements OnInit {
  readonly sorting = signal<SortingState>([]);
  // #sortingEffect = effect(() => {
  //   console.log(`The sorting state is: ${this.sorting()}`);
  // });
  data: Person[] = mockData(10);
  table!: Table<Person>;

  ngOnInit() {
    this.createTable();
  }

  createTable() {
    this.table = createAngularTable({
      data: this.data,
      columns: columns,
      state: {
        sorting: this.sorting(),
      },
      onSortingChange: (updaterOrValue) => {
        const sortingState =
          typeof updaterOrValue == 'function'
            ? updaterOrValue(this.sorting())
            : updaterOrValue;
        this.sorting.set(sortingState);
      },
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      debugTable: true,
    });
  }
}
