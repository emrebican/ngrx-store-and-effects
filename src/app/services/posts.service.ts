import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay } from 'rxjs';

import { I_Post } from '../interfaces/post/post.interface';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<I_Post[]> {
    return this.http.get<I_Post[]>(`${this.baseUrl}/posts`).pipe(delay(1200));
  }

  savePosts(post: I_Post): Observable<I_Post[]> {
    return this.http.post<I_Post[]>(`${this.baseUrl}/posts`, post);
  }

  deletePost(id: string): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/posts/${id}`);
  }

  updatePost(post: I_Post): Observable<I_Post> {
    return this.http.put<I_Post>(`${this.baseUrl}/posts/${post.id}`, post);
  }
}
