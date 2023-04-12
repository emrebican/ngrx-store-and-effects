import { I_Post } from './post.interface';

export interface I_PostsState {
  posts: I_Post[];
  isLoading: boolean;
  error: string | null;
}
