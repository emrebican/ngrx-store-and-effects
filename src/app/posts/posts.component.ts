import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FormGroup, FormControl } from '@angular/forms';

import * as PostsActions from '../store/posts/actions';
import {
  errorSelector,
  isLoadingSelector,
  postsSelector
} from '../store/posts/selectors';

import { I_AppState } from '../interfaces/appState.interface';
import { I_Post } from '../interfaces/post/post.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  isLoading$!: Observable<boolean>;
  posts$!: Observable<I_Post[]>;
  error$!: Observable<string | null>;

  form!: FormGroup;

  constructor(private store: Store<I_AppState>) {}

  ngOnInit(): void {
    this.isLoading$ = this.store.select(isLoadingSelector);
    this.posts$ = this.store.select(postsSelector);
    this.error$ = this.store.select(errorSelector);

    this.store.dispatch(PostsActions.getPosts());

    //form
    this.form = new FormGroup({
      title: new FormControl(null)
    });
  }

  onAddPost() {
    this.store.dispatch(
      PostsActions.addPost({
        title: this.form.value.title
      })
    );

    this.form.reset();
  }

  onDeletePost(postId: string) {
    this.store.dispatch(PostsActions.deletePost({ id: postId }));
  }

  onUpdatePost(postId: string) {
    this.store.dispatch(PostsActions.updatePost({ id: postId, title: 'Emre' }));
  }
}
