import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  ExpandedState,
  FlexRenderDirective,
  GroupingState,
  PaginationState,
  Table,
  Updater,
  createAngularTable,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
} from 'angular-tanstack-table';
import { BehaviorSubject, Subject, combineLatest, takeUntil } from 'rxjs';
import { mockData } from '../utils/mockdata';
import { Person } from '../utils/person';
import { columns } from './column';

@Component({
  selector: 'tanstack-grouping',
  templateUrl: 'grouping.html',
  imports: [NgIf, NgFor, FlexRenderDirective],
  standalone: true,
})
export class GroupingComponent implements OnInit {
  private destroy$ = new Subject<void>();
  data: Person[] = mockData(10000);
  groupingState = new BehaviorSubject<GroupingState>([]);
  expandedState = new BehaviorSubject<ExpandedState>({});
  paginationState = new BehaviorSubject<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  } as PaginationState);
  table!: Table<Person>;
  expanded: ExpandedState = {};
  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.createTable();
    combineLatest([this.expandedState, this.groupingState])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([expandedState, groupingState]) => {
        this.table.options.state.grouping = groupingState;
        this.table.options.state.expanded = expandedState;
        this.cdr.detectChanges();
      });
  }

  createTable() {
    this.table = createAngularTable({
      data: this.data,
      columns: columns,
      state: {
        grouping: this.groupingState.getValue(),
        expanded: this.expandedState.getValue(),
        pagination: this.paginationState.getValue(),
      },
      onGroupingChange: (updaterOrValue: Updater<GroupingState>) => {
        this.groupingState.next(
          typeof updaterOrValue === 'function'
            ? updaterOrValue([...this.groupingState.getValue()])
            : updaterOrValue
        );
      },
      onExpandedChange: (updater) => {
        const newValue =
          typeof updater === 'function'
            ? updater(this.expandedState.getValue())
            : updater;
        this.table.options.state.expanded = newValue;
        this.expandedState.next(newValue);
      },
      debugTable: true,
      onPaginationChange: (val) => {
        const newvalue =
          typeof val === 'function'
            ? val(this.paginationState.getValue())
            : val;
        this.table.options.state.pagination = newvalue;
        this.paginationState.next(newvalue);
      },
      getExpandedRowModel: getExpandedRowModel(),
      getGroupedRowModel: getGroupedRowModel(),
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
    });
  }

  onPageInputChange(event: any): void {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    this.table.setPageIndex(page);
  }

  onPageSizeChange(event: any) {
    console.log(event);
    this.table.setPageSize(Number(event.target.value));
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
