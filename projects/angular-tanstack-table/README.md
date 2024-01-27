# angular-tanstack-table

Angular-tanstack-table is a GitHub repository that provides an adapter for using tanstack table library in Angular applications. It allows you to create and customize data tables with features such as sorting, filtering, pagination, and more.

## Demo Application

https://jrgokavalsa.github.io/angular-tanstack-adapter/

## Prerequisites

Before using this table component, ensure that you have the following prerequisites installed:

- Angular 17
- Tanstack 8.11.7

## Installation

You can install the Angular Tanstack adapter using npm. Open your terminal and run the following command:

```bash
npm install angular-tanstack-table
```

## Usage Standlone Components

- Import FlexRenderDirective from the library as follows.

```typescript
@Component({
  ....
  standalone: true,
  imports: [CommonModule, FlexRenderDirective],
})
```

- use createAngularTable from the library to get the table Instance.

```typescript
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
```

```html
<ng-container
  *flexRender="
                  header.column.columnDef.header;
                  props: header.getContext();
                  let header
                "
>
  {{ header }}
</ng-container>
```

## Examples

- Basic
- Sorting
- Grouping
- Selecting
- \* More examples to coming soon.

You can find some examples of how to use this library in different scenarios in the [examples](https://github.com/jrgokavalsa/angular-tanstack-adapter/tree/main/src/app/examples)
