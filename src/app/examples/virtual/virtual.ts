import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  FlexRenderDirective,
  SortingState,
  Table,
  createAngularTable,
  getCoreRowModel,
  getSortedRowModel,
} from 'angular-tanstack-table';
import { BehaviorSubject, Subject } from 'rxjs';
import { columns } from '../grouping/column';
import { mockData } from '../utils/mockdata';
import { Person } from '../utils/person';

@Component({
  selector: 'tanstack-virtual',
  templateUrl: 'virtual.html',
  styleUrls: ['./virtual.css'],
  standalone: true,
  imports: [ScrollingModule, FlexRenderDirective],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class VirtualComponent implements OnInit {
  private destroy$ = new Subject<void>();
  sortingState = new BehaviorSubject<SortingState>([]);
  data: Person[] = mockData(10000);
  table!: Table<Person>;

  @ViewChild(CdkVirtualScrollViewport, { static: false })
  public viewPort!: CdkVirtualScrollViewport;

  public get inverseOfTranslation(): string {
    if (!this.viewPort || !this.viewPort['_renderedContentOffset']) {
      return '-0';
    }
    let offset = this.viewPort['_renderedContentOffset'];
    return `-${offset}`;
  }

  ngOnInit(): void {
    this.createTable();
  }

  createTable() {
    this.table = createAngularTable({
      data: this.data,
      columns: columns,
      state: {},
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      debugTable: true,
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
