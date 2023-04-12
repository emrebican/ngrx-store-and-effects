# NGRX - Store and Effects

Ngrx is a **state management** tool.

```
npm install @ngrx/store
npm install @ngrx/effects
npm install @ngrx/store-devtools
```

### Working with ngRx

- Global State
  - Apply changes
  - All data is in a single place by using Store
- Asynchronous operations
  - Http calls to API by using Effects

go to link [ngRx Store](https://ngrx.io/guide/store)

### `NOT`

> If you have a big application, lots of components and modules, you may need a state management tool for centralize your states. NgRx is a nice option for that in Angular.

## 1- Interfaces

We need to define our state structure. Book is representing one object of our array, BookState represents the whole state and AppState is holding our global states.

#### Book

```
interface I_Book{
    id:number;
    title:string:
    completed:boolean
}
```

#### BookState

```
export interface I_BooksState {
  isLoading: boolean;
  books: I_Book[];
  error: string | null;
}
```

#### AppState

```
export interface I_AppState {
  books: I_BooksState;
}
```

## 2- Actions

Actions are user events which can change properties inside our state. We can use **createAction** method to create an action from **@ngrx/store**. We can provide a data with an action by using **props** method.

go to link [actions](https://ngrx.io/guide/store/actions)

```
import { createAction, props } from '@ngrx/store';
import { I_Book } from 'src/app/interfaces/book/book.interface';

// trigger isLoading (Start)
export const getBooks = createAction('[Books] Get Books');

// if it is successed provide books array (End)
export const getBooksSuccess = createAction(
  '[Books] Get Books Success',
  props<{ books: I_Book[] }>()
);

// if it is failure provide error message (End)
export const getBooksFailure = createAction(
  '[Books] Get Books Failure',
  props<{ error: string }>()
);
```

## 3- Reducer

Reducer will change the state with our actions. In reducer we have **InitialState** which holds our state and we define it in **createReducer** function then change it with **on()**. These methods from **@ngrx/store**

**on():** this method is our changes. we're writing every single changes in this function.
**first parameter of on** with this parameter we can define which action we want to react.
**second parameter of on** it's a function where we can access to our state and use data that provided by that action.

go to link [reducer](https://ngrx.io/guide/store/reducers)

```
import { createReducer, on } from '@ngrx/store';

import * as BooksActions from './actions';
import { I_BooksState } from 'src/app/interfaces/book/booksState.interface';

const initialState: I_BooksState = {
  isLoading: false,
  books: [],
  error: null
};

export const booksReducer = createReducer(
  initialState,

  // isLoading
  on(BooksActions.getBooks, (state) => ({
    ...state,
    isLoading: true
  })),

  // getBooks success
  on(BooksActions.getBooksSuccess, (state, action) => ({
    ...state,
    isLoading: false,
    books: action.books
  })),

  // getBooks failure
  on(BooksActions.getBooksFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error
  }))
);
```

## 4- Define Store in app.module

**_StoreModule_** from **_@ngrx/store_**

```
imports: [
    ...
    // Store
    StoreModule.forRoot({ posts: postsReducer, books:
]
```

### `NOT`

> We could have more than one state (slice) in global state. And we need to define it in app.module with same

## 5- Effects

They **_make possible to work with asynchronous_** operations in ngRx.

> 1* We're dispatching an action at the beginning of the fecth (isLoading)
> 2* and then we dispatch another action at the end of the fetch which represent success and get the data or fail and get the error message (getBooksSuccess or getBooksFailure).

- We use **_createEffect_** method from **_@ngrx/effects_** for creating effects.
- **_Actions_** from **_@ngrx/effects_** return an Observable which contains our state.

go to link [ngRx Effects](https://ngrx.io/guide/effects)

```
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { BooksService } from 'src/app/services/books.service';

import * as BooksActions from './actions';
import { I_AppState } from 'src/app/interfaces/appState.interface';
import { I_Book } from 'src/app/interfaces/book/book.interface';

@Injectable()
export class BooksEffects {
  constructor(
    private actions$: Actions,
    private booksService: BooksService
  ) {}

  getBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BooksActions.getBooks),
      switchMap(() => {
        return this.booksService.getBooks().pipe(
          map((books: I_Book[]) => BooksActions.getBooksSuccess({ books })),
          catchError((error) =>
            of(BooksActions.getBooksFailure({ error: error.message }))
          )
        );
      })
    )
  );
 }
```

## 6- Define Effects in app.module

**_EffectsModule_** from **_@ngrx/effects_**

```
imports: [
    ...
    // Store
    StoreModule.forRoot({ posts: postsReducer, books: booksReducer }),
    // Effect
    EffectsModule.forRoot([PostsEffects, BooksEffects]),
]
```

### `NOT`

> We could define more effects in the array of EffectsModule.

## 7- Using Service for Http Call

We have asynchronous operations in our app which is running in our service. Actually we can do this work in effects directly, but I think it's cleaner like this way.

```
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';
import { I_Book } from '../interfaces/book/book.interface';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<I_Book[]> {
    return this.http.get<I_Book[]>(`${this.baseUrl}/books`).pipe(delay(1200));
  }

  saveBooks(book: I_Book): Observable<I_Book[]> {
    return this.http.post<I_Book[]>(`${this.baseUrl}/books`, book);
  }

  removeBook(id: number): Observable<number> {
    return this.http.delete<number>(`${this.baseUrl}/books/${id}`);
  }

  completeBook(book: I_Book): Observable<I_Book> {
    return this.http.put<I_Book>(`${this.baseUrl}/books/${book.id}`, book);
  }
}
```

## 8- Selectors

This is the way how we can select some properties from our state inside a component.
We need to create single selector for every propery in the state.

We are using **\*createSelector\*\*** method to create a selector. And use **_createFeatureSelector_** method to select related state. This methods are provided from **_@ngrx/store_**

go to link [selectors](https://ngrx.io/guide/store/selectors)

```
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { I_BooksState } from 'src/app/interfaces/book/booksState.interface';

// isLoading
export const isLoadingSelector = createSelector(
  createFeatureSelector('books'),
  (state: I_BooksState) => state.isLoading
);

// books
export const booksSelector = createSelector(
  createFeatureSelector('books'),
  (state: I_BooksState) => state.books
);

// error
export const errorSelector = createSelector(
  createFeatureSelector('books'),
  (state: I_BooksState) => state.error
);
```

## 9- Using Selectors

To use our state in the component, we need to **_select_** them. Same way to use our actions which provided from reducer, we need to **_dispatch_** them.

```
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as BooksActions from '../store/books/actions';
import {
  booksSelector,
  errorSelector,
  isLoadingSelector
} from '../store/books/selectors';

import { I_BooksState } from '../interfaces/book/booksState.interface';
import { I_Book } from '../interfaces/book/book.interface';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  books$!: Observable<I_Book[]>;
  error$!: Observable<string | null>;

  constructor(private store: Store<I_BooksState>) {}

  ngOnInit(): void {
  // select
    this.isLoading$ = this.store.select(isLoadingSelector);
    this.books$ = this.store.select(booksSelector);
    this.error$ = this.store.select(errorSelector);

    // dispatch
    this.store.dispatch(BooksActions.getBooks());
  }
}
```

## 10- Bonus ngrx Store Devtools

With this tool we can see our state and state changes visually in the browser.

go to link [ngrx store devtools](https://ngrx.io/guide/store-devtools/install)
