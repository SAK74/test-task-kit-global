import { addPost, deletePost, getPosts } from "@/firebase";
import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import type { TypedStore } from ".";
import type { Post, PostFormType } from "@/schema";

const postAdapter = createEntityAdapter<Post>({
  sortComparer: (a, b) => a.timestamp ?? 0 - (b.timestamp ?? 0),
});

export const initiate = createAsyncThunk("getPosts", () => getPosts());
export const removePost = createAsyncThunk("delete/post", (id: Post["id"]) =>
  deletePost(id)
);
export const addPostAction = createAsyncThunk(
  "add/post",
  (post: PostFormType) => addPost(post)
);

const postsSlice = createSlice({
  name: "posts",
  initialState: postAdapter.getInitialState<{
    status: "iddle" | "pending" | "complete" | "failed";
    error?: string;
  }>({
    status: "iddle",
  }),
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(initiate.pending, (state) => {
        state.status = "pending";
      })
      .addCase(initiate.fulfilled, (state, action) => {
        state.status = "complete";
        state.error = undefined;
        postAdapter.setAll(state, action.payload);
      })
      .addCase(initiate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(removePost.fulfilled, (state, action) => {
        state.status = "complete";
        state.error = undefined;
        postAdapter.removeOne(state, action.payload);
      })
      .addCase(removePost.pending, (state) => {
        state.status = "pending";
      })
      .addCase(removePost.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addPostAction.fulfilled, (state, action) => {
        state.status = "complete";
        state.error = undefined;
        postAdapter.addOne(state, action.payload);
      })
      .addCase(addPostAction.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addPostAction.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default postsSlice;
export const { selectAll: selectAllPosts, selectById: selectPostById } =
  postAdapter.getSelectors<TypedStore>((state) => state.posts);
