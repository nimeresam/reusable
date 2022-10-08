# @ngx-reusable

**@ngx-reusable** project is an **Angular** library that contains a collection of components, directives and pipes that we need in any project

# @ngx-reusable/material

We believe that **Angular Material** is providing one the best generic components you need while developing with **Angular**, but often you find yourself doing the same steps over and over.

**@ngx-reusable/material** library provides an easier way to deal with `@angular/material` components that you use often, following same conventions and using same components.

## versions

| Angular Version | @ngx-reusable/material |

| --------------- | ------------------------- |

| 14 | @ngx-reusable/material@14 |

## Table

Each time you want a simple table, you have to add the table with nested `ng-container`s to decalre the column data and header!

`ReusableTableModule` provides a simple `mat-table` component to use just by declaring the required columns and passing the data!

add `ReusableTableModule` to your module:

    import { ReusableTableModule } from "@ngx-reusable/material/table";

- **TableComponent:**

- selector: `reuse-table`
- `@Input() list!: { [key: string ]: any }[];`
- `@Input() columns!: TableColumn[];`
- `@Input() pageEvent?: PageEvent;`
- `@Input() sortEvent?: Sort;`
- `@Output() sort: EventEmitter<Sort>;`

**Example**: [StackBiltz](https://angular-ivy-6jx3tj.stackblitz.io/)

## Autocomplete

Adding **Autocomplete** component in **Material** is clear, but in most cases all you need is a searchable dropdown!!

add `ReusableAutocompleteModule` to your module:

    import { ReusableAutocompleteModule } from "@ngx-reusable/material/autocomplete";

- **autocomplete**

  - selector: `reuse-autocomplete`
  - usage: searchable dropdown
  - `@Input() options!: any[];`
  - `@Input() appearance?: 'standard' | 'fill' | 'outline';`
  - `@Input() required?: boolean;`
  - `@Input() placeholder?: string;`
  - `@Input('key') keyProperty?: string;`
  - `@Input('value') valueProperty?: boolean;`
  - `@Output() selectionChange: EventEmitter<any>;`
  - Notes:
    - Can be used with `ReactiveForms` using `formControlName` or `formControl`.
    - As any `MatFormField` components, you can pass:
      - `mat-label`
      - `mat-icon matPrefix`
      - `mat-icon matSuffix`
      - `mat-hint`
      - `mat-error`

  **Example:** [StackBiltz](https://stackblitz.com/edit/angular-ivy-dftsik?file=src/app/app.component.html)
