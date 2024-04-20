import { NgFor, NgIf } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  PaginationState,
  RowData,
  Table,
  getCoreRowModel,
  getPaginationRowModel,
} from '@tanstack/table-core';
import {
  FlexRenderDirective,
  createAngularTable,
} from 'angular-tanstack-table';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { mockData } from '../utils/mockdata';
import { Person } from '../utils/person';
import { columns } from './column';

declare module '@tanstack/table-core' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

@Component({
  selector: 'tanstack-rowediting',
  templateUrl: 'rowediting.html',
  standalone: true,
  imports: [NgIf, NgFor, FlexRenderDirective],
})
export class RowEditingComponent implements OnInit, OnDestroy {
  updateData(arg0: number, arg1: any, _t44: any) {
    console.log(arg0, arg1, _t44);
  }
  private destroy$ = new Subject<void>();
  table!: Table<Person>;
  data: Person[] = mockData(10000);
  paginationState = new BehaviorSubject<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  } as PaginationState);
  constructor() {}

  ngOnInit() {
    this.table = createAngularTable({
      data: this.data,
      columns: columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onPaginationChange: (val) => {
        const newvalue =
          typeof val === 'function'
            ? val(this.paginationState.getValue())
            : val;
        this.table.options.state.pagination = newvalue;
        this.paginationState.next(newvalue);
      },
      meta: {
        updateData: (rowIndex, columnId, value) => {
          // Skip page index reset until after next rerender
          console.log(rowIndex, columnId, value);
        },
      },
    });

    this.paginationState
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (paginationState) =>
          (this.table.options.state.pagination = paginationState)
      );
  }

  onPageInputChange(event: any): void {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    this.table.setPageIndex(page);
  }

  onPageSizeChange(event: any) {
    this.table.setPageSize(Number(event.target.value));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
