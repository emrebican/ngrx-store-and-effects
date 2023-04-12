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
