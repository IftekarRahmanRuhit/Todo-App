import { configureStore } from "@reduxjs/toolkit";

import taskReducer from "./features/task/taskSlice";

// Create a Redux store with the counter reducer
// This store will hold the state of the application
// and allow components to access and modify the state
export const store = configureStore({
  reducer: {
    tasks: taskReducer
  },
});//

// Type for the root state of the Redux store. This type is used to infer the shape of the state in the Redux store
export type RootState = ReturnType<typeof store.getState>

// Type for the dispatch function of the Redux store. This type is used to infer the type of actions that can be dispatched
export type AppDispatch = typeof store.dispatch;