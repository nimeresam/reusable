# @ngx-reusable

**@ngx-reusable** project is an **Angular** library that contains a collection of components, directives and pipes that we need in any project

# @ngx-reusable/common

**@ngx-reusable/common** library contains multiple resuable directives and pipes.

## versions

| Angular Version | @ngx-reusable/common    |
| --------------- | ----------------------- |
| 14              | @ngx-reusable/common@14 |

## Directives

add `ReusableDirectivesModule` to your module:

    import { ReusableDirectivesModule } from "@ngx-reusable/common/directives";

- **Confirm:**

  - selector: `[confirm]`
  - usage: launch confirm prompt on element click:
  - `@Input() message?: string;`
  - `@Output() confirmed: EventEmitter<void>;`
  - `@Output() cancelled: EventEmitter<void>;`

  **Example:**
  `<button confirm message="Are you sure?" (confirmed)="doSomething()">`

- **MiddleClick:**

  - selector: `[mdlclick]`
  - usage: emit an event on mouse middle button click:
  - `@Output('mdlclick') event: EventEmitter<MouseEvent>;`

  **Example:**
  `<button (mdlclick)="doSomething()">`

- **RightClick:**

  - selector: `[rtclick]`
  - usage: emit an event on mouse right button click:
  - `@Output('rtclick') event: EventEmitter<MouseEvent>;`

  **Example:**
  `<button (rtclick)="doSomething()">`

- **CopyToClipboard:**

  - selector: `[copyToClipboard]`
  - usage: copy text to clipboard on element click:
  - `@Input('copyToClipboard') text!: string;`

  **Example:**
  `<button [copyToClipboard]="someTextToCopy">`

- **PasteFromClipboard:**

  - selector: `[pasteFromClipboard]`
  - usage: paste text from clipboard to `formControl` and emit event with text on element click:
  - `@Output('pasteFromClipboard') paste: EventEmitter<string>;`

  **Example:**
  `<button (pasteFromClipboard)="getSomeText($event)">`

## Pipes

### Array Pipes

Add ability to use native JavaScript array methods in HTML.

add `ReusableArrayPipesModule` to your module:

    import { ReusableArrayPipesModule } from "@ngx-reusable/common/pipes";

- **FilterPipe:**

  - `{{ array | filter: property: operator: expected }}`
  - **property**: for objects array to select property
    - pass `""` if array isn't array of objects
    - pass property name if proeprty is one level
    - if nested property pass it like: `level1.level1`
  - **operator**: `==`, `!=`, `<>`, `<`, `<=`, `>`, `>=`, `===`
  - **expected**: required value

  **Example:**
  `{{ arr | filter: 'count': '>=': 10 }}`
  will be translated to:
  `arr.filter(item => item['count'] >= 10)`

- **JoinPipe:**

  - `{{ array | join [: seperator] }}`
  - **seperator**: join method seperator

  **Example:**
  `{{ arr | join: ',' }}`
  will be translated to:
  `arr.join(',')`

### Object Pipes

Add ability to use native JavaScript object methods in HTML.
add `ReusableObjectPipesModule` to your module:

    import { ReusableObjectPipesModule } from "@ngx-reusable/common/pipes";

- **EntriesPipe:**

  - `{{ object | entries }}`

  **Example:**
  `*ngFor="let [key, value] for (object | entries)"`

- **KeysPipe:**

  - `{{ object | keys }}`

  **Example:**
  `*ngFor="let key for (object | keys)"`

- **ValuesPipe:**

  - `{{ object | values }}`

  **Example:**
  `*ngFor="let value for (object | values)"`

### String Pipes

Add ability to use native JavaScript string methods in HTML.
add `ReusableStringPipesModule` to your module:

    import { ReusableStringPipesModule } from "@ngx-reusable/common/pipes";

- **SplitPipe:**

  - `{{ str | split [: splitter [:limit]] }}`
  - **splitter:** split string by (default = "").
  - **limit:** limit number of generated items.

  **Example:**
  `*ngFor="let item for (strLikeArray | split: ',')"`
