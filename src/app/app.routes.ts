import { Routes } from '@angular/router';
import { AppLayoutComponent } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./examples/basic/basic').then((mod) => mod.BasicComponent),
      },
      {
        path: 'sorting',
        loadComponent: () =>
          import('./examples/sorting/sorting').then(
            (mod) => mod.SortingComponent
          ),
      },
      {
        path: 'grouping',
        loadComponent: () =>
          import('./examples/grouping/grouping').then(
            (mod) => mod.GroupingComponent
          ),
      },
      {
        path: 'selecting',
        loadComponent: () =>
          import('./examples/selecting/selecting').then(
            (mod) => mod.SelectingComponent
          ),
      },
      {
        path: 'row-editing',
        loadComponent: () =>
          import('./examples/rowediting/editing').then(
            (mod) => mod.RowEditingComponent
          ),
      },
      {
        path: 'virtual',
        loadComponent: () =>
          import('./examples/virtual/virtual').then(
            (mod) => mod.VirtualComponent
          ),
      },
    ],
  },
];
